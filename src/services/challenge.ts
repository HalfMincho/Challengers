import express from "express";
import pool from "./../config/mysql";
import { stringify as uuidStringify, v4 as uuidv4 } from "uuid";

import { Validate } from "./middlewares/validation";

import {
  Category,
  ChallengeFromDB,
  ChallengeFromRequest,
} from "./../types/challenge";
import { category } from "../types/const";
import { ChallengeSchema, CertificationPostSchema } from "../schema";
import { GetNameFromUUID } from "./account";

const GetCategoryFromUUID = async (uuid: Buffer) => {
  const [[{ name }]] = (await pool.execute(
    `SELECT name FROM category WHERE uuid=UNHEX("${uuidStringify(uuid).replace(
      /-/gi,
      "",
    )}")`,
  )) as unknown as [[{ name: string }]];

  return name;
};

const GetUserUUIDFromEmail = async (email: string) => {
  const [[{ uuid: userUUID }]] = (await pool.execute(
    `SELECT uuid FROM account WHERE email="${email}"`,
  )) as unknown as [[{ uuid: Buffer }]];

  return userUUID;
};

export const GetChallenge = async (req: express.Request) => {
  const { body }: { body: { email?: string } } = req;

  const id = Number(req.params.id);

  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const checkChallengeExist = (await pool.execute(
    `SELECT id FROM challenge WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (checkChallengeExist[0].length < 1) {
    return { status: 404, result: { error: "challenge_not_exists" } };
  }

  type ChallengeFromDBWithUUID = ChallengeFromDB & {
    uuid: Buffer;
  };

  const [[row]] = (await pool.execute(
    `SELECT id, challenge.uuid, account.name as submitter, category.name as category,
      challenge.name as name, auth_way, auth_day, auth_count_in_day,
      auth_start_time, auth_end_time, can_auth_all_time,
      start_at, end_at, cost, description, reg_date, views 
      FROM challenge LEFT JOIN category ON challenge.category = category.uuid
      LEFT JOIN account ON challenge.submitter = account.uuid WHERE id=${id}`,
  )) as unknown as [[row: ChallengeFromDBWithUUID]];

  let result;

  const { uuid, ...challengeWithoutUUID } = row;

  challengeWithoutUUID.can_auth_all_time = Boolean(
    challengeWithoutUUID.can_auth_all_time,
  );

  if (body.email === undefined) {
    result = challengeWithoutUUID;
  } else {
    const userUUID = await GetUserUUIDFromEmail(body.email);

    const [certificationArticleRow] = (await pool.execute(
      `SELECT id FROM challenge_auth WHERE submitter=UNHEX("${uuidStringify(
        userUUID,
      ).replace(/-/gi, "")}") AND challenge=UNHEX("${uuidStringify(
        uuid,
      ).replace(/-/gi, "")}")`,
    )) as [certificationArticleRow: { id: number }[], field: unknown];

    const [[challengeStateInfo]] =
      (await pool.execute(`SELECT is_open, is_participate, is_complete,
          is_saved, is_in_basket FROM account_challenge WHERE account=UNHEX("${uuidStringify(
            userUUID,
          ).replace(/-/gi, "")}") AND challenge=UNHEX("${uuidStringify(
        uuid,
      ).replace(/-/gi, "")}")`)) as unknown as [
        [
          challengeStateInfo: {
            is_open: number;
            is_participate: number;
            is_complete: number;
            is_saved: number;
            is_in_basket: number;
          },
        ],
      ];

    let refinedObject: { [k: string]: boolean } = {};

    for (const [key, value] of Object.entries(challengeStateInfo)) {
      refinedObject[key] = Boolean(value);
    }

    result = {
      ...challengeWithoutUUID,
      cert_article: certificationArticleRow,
      state: refinedObject,
    };
  }

  try {
    await (await pool.getConnection()).beginTransaction();
    await pool.execute(`UPDATE challenge SET views = views + 1 WHERE id=${id}`);
    await (await pool.getConnection()).commit();

    result["views"] += 1;
  } catch (e) {
    await (await pool.getConnection()).rollback();

    console.error(e);

    return { status: 500, result: { error: "exception_occurred" } };
  }

  return { status: 200, result: result };
};

export const GetPopularChallenge = async (count: number) => {
  if (isNaN(count)) {
    count = 10;
  }

  const [rows] = (await pool.execute(
    `SELECT id, account.name as submmiter, category.name as category, challenge.name as name,
    auth_way, auth_day, auth_count_in_day,
    auth_start_time, auth_end_time, can_auth_all_time,
    start_at, end_at, cost, description, reg_date, views FROM challenge
    LEFT JOIN category ON challenge.category = category.uuid
    LEFT JOIN account ON challenge.submitter = account.uuid
    ORDER BY views DESC LIMIT 0, ${count}`,
  )) as [rows: ChallengeFromDB[], field: unknown];

  const refinedRows = rows.map((row) => {
    row.can_auth_all_time = Boolean(row.can_auth_all_time);

    return row;
  });

  return { status: 200, result: refinedRows };
};

export const GetRecentChallenge = async (count: number) => {
  if (isNaN(count)) {
    count = 10;
  }

  const [rows] = (await pool.execute(
    `SELECT id, account.name as submmiter, category.name as category, challenge.name as name,
    auth_way, auth_day, auth_count_in_day,
    auth_start_time, auth_end_time, can_auth_all_time,
    start_at, end_at, cost, description, reg_date, views FROM challenge
    LEFT JOIN category ON challenge.category = category.uuid
    LEFT JOIN account ON challenge.submitter = account.uuid
    ORDER BY reg_date DESC LIMIT 0, ${count}`,
  )) as [rows: ChallengeFromDB[], field: unknown];

  const refinedRows = rows.map((row) => {
    row.can_auth_all_time = Boolean(row.can_auth_all_time);

    return row;
  });

  return { status: 200, result: refinedRows };
};

export const PostChallenge = async (req: express.Request) => {
  const { body }: { body: ChallengeFromRequest } = req;

  const buffer = Buffer.alloc(16);
  uuidv4({}, buffer);
  const challengeUUID = buffer;

  if (body.start_at !== undefined && body.end_at !== undefined) {
    const dateRegex =
      /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/;

    if (!dateRegex.test(body.start_at) || !dateRegex.test(body.end_at)) {
      return { status: 400, result: { error: "no_required_args" } };
    }
  }

  let reqBodyValidation = await Validate(body, ChallengeSchema);

  if (!reqBodyValidation) {
    return { status: 400, result: { error: "no_required_args" } };
  }

  const isCategory = (x: Category) => category.includes(x);

  if (!isCategory(body.category)) {
    return { status: 400, result: { error: "no_required_args" } };
  }

  const [[{ uuid: categoryUUID }]] = (await pool.execute(
    `SELECT uuid FROM category WHERE name="${body.category}"`,
  )) as unknown as [[{ uuid: Buffer }]];

  const userUUID = await GetUserUUIDFromEmail(body.email);

  const params = [
    challengeUUID,
    userUUID,
    categoryUUID,
    body.name,
    body.auth_way,
    body.auth_day,
    body.auth_count_in_day,
    body.auth_start_time,
    body.auth_end_time,
    body.can_auth_all_time,
    body.start_at,
    body.end_at,
    body.cost,
    body.description,
  ];

  try {
    await (await pool.getConnection()).beginTransaction();

    await pool.execute(
      `INSERT INTO challenge (uuid, submitter, category, name,
      auth_way, auth_day, auth_count_in_day, auth_start_time,
      auth_end_time, can_auth_all_time, start_at, end_at, cost, description)
    VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      params,
    );

    const [rows] = (await pool.execute("SELECT LAST_INSERT_ID()")) as [
      rows: Array<Object>,
      field: unknown,
    ];

    const created_challenge_id = Object.values(
      JSON.parse(JSON.stringify(rows[0])),
    )[0];

    await pool.execute(
      `INSERT INTO account_challenge (account, challenge, is_open)
    VALUE (?,?,?)`,
      [userUUID, challengeUUID, true],
    );

    await (await pool.getConnection()).commit();

    return { status: 200, result: { created: created_challenge_id } };
  } catch (e) {
    await (await pool.getConnection()).rollback();

    console.error(e);

    return { status: 500, result: { error: "exception_occurred" } };
  }
};

export const PutChallenge = async (id: number, req: express.Request) => {
  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const result = (await pool.execute(
    `SELECT id FROM challenge WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (result[0].length < 1) {
    return { status: 404, result: { error: "challenge_not_exists" } };
  }

  const { body }: { body: ChallengeFromRequest } = req;

  if (body.start_at !== undefined && body.end_at !== undefined) {
    const dateRegex =
      /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/;

    if (!dateRegex.test(body.start_at) || !dateRegex.test(body.end_at))
      return { status: 400, result: { error: "no_required_args" } };
  }

  let reqBodyValidation = await Validate(body, ChallengeSchema);

  if (!reqBodyValidation) {
    return { status: 400, result: { error: "no_required_args" } };
  }

  const isCategory = (x: Category) => category.includes(x);

  if (!isCategory(body.category)) {
    return { status: 400, result: { error: "no_required_args" } };
  }

  const [[{ uuid: categoryUUID }]] = (await pool.execute(
    `SELECT uuid FROM category WHERE name="${body.category}"`,
  )) as unknown as [[{ uuid: Buffer }]];

  const params = [
    categoryUUID,
    body.name,
    body.auth_way,
    body.auth_day,
    body.auth_count_in_day,
    body.auth_start_time,
    body.auth_end_time,
    body.can_auth_all_time,
    body.start_at,
    body.end_at,
    body.cost,
    body.description,
  ];

  try {
    await (await pool.getConnection()).beginTransaction();

    await pool.execute(
      `UPDATE challenge SET category=?, name=?, auth_way=?, auth_day=?,
      auth_count_in_day=?, auth_start_time=?, auth_end_time=?, can_auth_all_time=?,
      start_at=?, end_at=?, cost=?, description=? WHERE id=${id}`,
      [
        params[0],
        params[1],
        params[2],
        params[3],
        params[4],
        params[5],
        params[6],
        params[7],
        params[8],
        params[9],
        params[10],
        params[11],
      ],
    );

    await (await pool.getConnection()).commit();

    return { status: 200, result: { modified: id } };
  } catch (e) {
    await (await pool.getConnection()).rollback();

    console.error(e);

    return { status: 500, result: { error: "exception_occurred" } };
  }
};

export const DeleteChallenge = async (id: number) => {
  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const result = (await pool.execute(
    `SELECT id FROM challenge WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (result[0].length < 1) {
    return { status: 404, result: { error: "challenge_not_exists" } };
  }

  try {
    await (await pool.getConnection()).beginTransaction();

    await pool.execute(`DELETE FROM challenge WHERE id=${id}`);

    await (await pool.getConnection()).commit();

    return { status: 200, result: { deleted: id } };
  } catch (e) {
    await (await pool.getConnection()).rollback();

    console.error(e);

    return { status: 500, result: { error: "exception_occurred" } };
  }
};

export const GetChallengeWithTitle = async (keyword: string, count: number) => {
  if (keyword.length <= 0) {
    return { status: 400, result: { error: "invalid_query_params" } };
  }

  if (isNaN(count)) {
    count = 10;
  }

  const [rows] = (await pool.execute(
    `SELECT id, account.name as submitter, category.name as category, challenge.name as name,
    auth_way, auth_day, auth_count_in_day,
    auth_start_time, auth_end_time, can_auth_all_time,
    start_at, end_at, cost, description, reg_date, views FROM challenge
    LEFT JOIN category ON challenge.category = category.uuid
    LEFT JOIN account ON challenge.submitter = account.uuid
    WHERE challenge.name LIKE '%${keyword}%' ORDER BY views DESC LIMIT 0, ${count}`,
  )) as [rows: ChallengeFromDB[], field: unknown];

  const refinedRows = rows.map((row) => {
    row.can_auth_all_time = Boolean(row.can_auth_all_time);

    return row;
  });

  return { status: 200, result: refinedRows };
};

export const GetChallengeWithCategory = async (
  categoryFromReq: Category,
  count: number,
) => {
  if (categoryFromReq.length <= 0) {
    return { status: 400, result: { error: "invalid_query_params" } };
  }

  if (isNaN(count)) {
    count = 10;
  }

  const isCategory = (x: Category) => category.includes(x);

  if (!isCategory(categoryFromReq)) {
    return { status: 400, result: { error: "invalid_query_params" } };
  }

  const [[{ uuid: categoryUUID }]] = (await pool.execute(
    `SELECT uuid FROM category WHERE name="${categoryFromReq}"`,
  )) as unknown as [[{ uuid: Buffer }]];

  const [rows] = (await pool.execute(
    `SELECT id, submitter, category, name, auth_way, auth_day, auth_count_in_day,
    auth_start_time, auth_end_time, IF(can_auth_all_time, 'true', 'false') as can_auth_all_time,
    start_at, end_at, cost, description, reg_date, views FROM challenge
    WHERE category=UNHEX("${uuidStringify(categoryUUID).replace(
      /-/gi,
      "",
    )}") ORDER BY views desc LIMIT 0, ${count}`,
  )) as [rows: ChallengeFromDB[], field: unknown];

  const refinedRows = await Promise.all(
    rows.map(async (challenge: ChallengeFromDB) => {
      const categoryName = await GetCategoryFromUUID(challenge.category);

      const username = await GetNameFromUUID(challenge.submitter);

      return {
        ...challenge,
        category: categoryName,
        submitter: username,
      };
    }),
  );

  return { status: 200, result: refinedRows };
};

export const GetOpenChallenge = async (req: express.Request) => {
  const { body }: { body: { email: string } } = req;

  const userUUID = await GetUserUUIDFromEmail(body.email);

  const [challengeUUIDRow] = (await pool.execute(
    `SELECT challenge FROM account_challenge WHERE account=UNHEX("${uuidStringify(
      userUUID,
    ).replace(/-/gi, "")}") AND is_open=true`,
  )) as [challengeUUID: { challenge: Buffer }[], field: unknown];

  const refinedRows = await Promise.all(
    challengeUUIDRow.map(async (singleChallenge: { challenge: Buffer }) => {
      const [[challenge]] = (await pool.execute(
        `SELECT id, submitter, category, name, auth_way, auth_day, auth_count_in_day,
    auth_start_time, auth_end_time, IF(can_auth_all_time, 'true', 'false') as can_auth_all_time,
    start_at, end_at, cost, description, reg_date, views FROM challenge WHERE uuid=UNHEX("${uuidStringify(
      singleChallenge.challenge,
    ).replace(/-/gi, "")}")`,
      )) as unknown as [[challenge: ChallengeFromDB]];

      const username = await GetNameFromUUID(challenge.submitter);
      const categoryName = await GetCategoryFromUUID(challenge.category);

      return {
        ...challenge,
        category: categoryName,
        submitter: username,
      };
    }),
  );

  return { status: 200, result: refinedRows };
};

export const GetParticipateChallenge = async (req: express.Request) => {
  const { body }: { body: { email: string } } = req;

  const userUUID = await GetUserUUIDFromEmail(body.email);

  const [challengeUUIDRow] = (await pool.execute(
    `SELECT challenge FROM account_challenge WHERE account=UNHEX("${uuidStringify(
      userUUID,
    ).replace(/-/gi, "")}") AND is_participate=true`,
  )) as [challengeUUID: { challenge: Buffer }[], field: unknown];

  const refinedRows = await Promise.all(
    challengeUUIDRow.map(async (singleChallenge: { challenge: Buffer }) => {
      const [[challenge]] = (await pool.execute(
        `SELECT id, submitter, category, name, auth_way, auth_day, auth_count_in_day,
    auth_start_time, auth_end_time, IF(can_auth_all_time, 'true', 'false') as can_auth_all_time,
    start_at, end_at, cost, description, reg_date, views FROM challenge WHERE uuid=UNHEX("${uuidStringify(
      singleChallenge.challenge,
    ).replace(/-/gi, "")}")`,
      )) as unknown as [[challenge: ChallengeFromDB]];

      const username = await GetNameFromUUID(challenge.submitter);
      const categoryName = await GetCategoryFromUUID(challenge.category);

      return {
        ...challenge,
        category: categoryName,
        submitter: username,
      };
    }),
  );

  return { status: 200, result: refinedRows };
};

export const JoinChallenge = async (req: express.Request) => {
  const { body }: { body: { email: string } } = req;
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const checkChallengeExist = (await pool.execute(
    `SELECT uuid FROM challenge WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (checkChallengeExist[0].length < 1) {
    return { status: 404, result: { error: "challenge_not_exists" } };
  }

  const [[{ uuid: challengeUUID }]] = checkChallengeExist as unknown as [
    [{ uuid: Buffer }],
  ];

  const userUUID = await GetUserUUIDFromEmail(body.email);

  const [[{ "COUNT(*)": checkAccountChallengeRowExist }]] = (await pool.execute(
    `SELECT COUNT(*) FROM account_challenge WHERE challenge=UNHEX("${uuidStringify(
      challengeUUID,
    ).replace(/-/gi, "")}") AND account=UNHEX("${uuidStringify(
      userUUID,
    ).replace(/-/gi, "")}")`,
  )) as unknown as [[{ "COUNT(*)": number }]];

  if (checkAccountChallengeRowExist === 0) {
    try {
      await pool.execute(
        `INSERT INTO account_challenge (account, challenge, is_participate)
    VALUE (?,?,?)`,
        [userUUID, challengeUUID, true],
      );

      return { status: 200, result: { participate: id } };
    } catch (e) {
      console.error(e);

      return { status: 500, result: { error: "exception_occurred" } };
    }
  } else {
    try {
      await (await pool.getConnection()).beginTransaction();

      await pool.execute(
        `UPDATE account_challenge SET is_participate=true WHERE challenge=UNHEX("${uuidStringify(
          challengeUUID,
        ).replace(/-/gi, "")}") AND account=UNHEX("${uuidStringify(
          userUUID,
        ).replace(/-/gi, "")}")`,
      );

      await (await pool.getConnection()).commit();

      return { status: 200, result: { participate: id } };
    } catch (e) {
      await (await pool.getConnection()).rollback();

      console.error(e);

      return { status: 500, result: { error: "exception_occurred" } };
    }
  }
};

export const GetCompleteChallenge = async (req: express.Request) => {
  const { body }: { body: { email: string } } = req;

  const userUUID = await GetUserUUIDFromEmail(body.email);

  const [challengeUUIDRow] = (await pool.execute(
    `SELECT challenge FROM account_challenge WHERE account=UNHEX("${uuidStringify(
      userUUID,
    ).replace(/-/gi, "")}") AND is_complete=true`,
  )) as [challengeUUID: { challenge: Buffer }[], field: unknown];

  const refinedRows = await Promise.all(
    challengeUUIDRow.map(async (singleChallenge: { challenge: Buffer }) => {
      const [[challenge]] = (await pool.execute(
        `SELECT id, submitter, category, name, auth_way, auth_day, auth_count_in_day,
    auth_start_time, auth_end_time, IF(can_auth_all_time, 'true', 'false') as can_auth_all_time,
    start_at, end_at, cost, description, reg_date, views FROM challenge WHERE uuid=UNHEX("${uuidStringify(
      singleChallenge.challenge,
    ).replace(/-/gi, "")}")`,
      )) as unknown as [[challenge: ChallengeFromDB]];

      const username = await GetNameFromUUID(challenge.submitter);
      const categoryName = await GetCategoryFromUUID(challenge.category);

      return {
        ...challenge,
        category: categoryName,
        submitter: username,
      };
    }),
  );

  return { status: 200, result: refinedRows };
};

export const MakeChallengeComplete = async (req: express.Request) => {
  const { body }: { body: { email: string } } = req;
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const checkChallengeExist = (await pool.execute(
    `SELECT uuid FROM challenge WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (checkChallengeExist[0].length < 1) {
    return { status: 404, result: { error: "challenge_not_exists" } };
  }

  const [[{ uuid: challengeUUID }]] = checkChallengeExist as unknown as [
    [{ uuid: Buffer }],
  ];

  const userUUID = await GetUserUUIDFromEmail(body.email);

  const [[{ "COUNT(*)": checkAccountChallengeRowExist }]] = (await pool.execute(
    `SELECT COUNT(*) FROM account_challenge WHERE challenge=UNHEX("${uuidStringify(
      challengeUUID,
    ).replace(/-/gi, "")}") AND account=UNHEX("${uuidStringify(
      userUUID,
    ).replace(/-/gi, "")}")`,
  )) as unknown as [[{ "COUNT(*)": number }]];

  if (checkAccountChallengeRowExist === 0) {
    try {
      await pool.execute(
        `INSERT INTO account_challenge (account, challenge, is_complete)
    VALUE (?,?,?)`,
        [userUUID, challengeUUID, true],
      );

      return { status: 200, result: { complete: id } };
    } catch (e) {
      console.error(e);

      return { status: 500, result: { error: "exception_occurred" } };
    }
  } else {
    try {
      await (await pool.getConnection()).beginTransaction();

      await pool.execute(
        `UPDATE account_challenge SET is_complete=true WHERE challenge=UNHEX("${uuidStringify(
          challengeUUID,
        ).replace(/-/gi, "")}") AND account=UNHEX("${uuidStringify(
          userUUID,
        ).replace(/-/gi, "")}")`,
      );

      await (await pool.getConnection()).commit();

      return { status: 200, result: { complete: id } };
    } catch (e) {
      await (await pool.getConnection()).rollback();

      console.error(e);

      return { status: 500, result: { error: "exception_occurred" } };
    }
  }
};

export const WriteCertificationArticle = async (req: express.Request) => {
  const { body }: { body: { email: string; description: string } } = req;

  const reqBodyValidation = await Validate(body, CertificationPostSchema);

  if (!reqBodyValidation) {
    return { status: 400, result: { error: "no_required_args" } };
  }

  const id = Number(req.params.id);
  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const checkChallengeExist = (await pool.execute(
    `SELECT uuid FROM challenge WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (checkChallengeExist[0].length < 1) {
    return { status: 404, result: { error: "challenge_not_exists" } };
  }

  const [[{ uuid: challengeUUID }]] = checkChallengeExist as unknown as [
    [{ uuid: Buffer }],
  ];

  const userUUID = await GetUserUUIDFromEmail(body.email);

  try {
    const buffer = Buffer.alloc(16);
    uuidv4({}, buffer);
    const rowUUID = buffer;

    await pool.execute(
      `INSERT INTO challenge_auth (uuid, submitter, challenge, description)
    VALUE (?,?,?,?)`,
      [rowUUID, userUUID, challengeUUID, body.description],
    );

    return { status: 200, result: { success: "post_successful" } };
  } catch (e) {
    console.error(e);

    return { status: 500, result: { error: "exception_occurred" } };
  }
};

export const GetCertificationArticle = async (req: express.Request) => {
  const { body }: { body: { email: string } } = req;

  const id = Number(req.params.id);

  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const result = (await pool.execute(
    `SELECT id FROM challenge_auth WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (result[0].length < 1) {
    return { status: 404, result: { error: "cert_article_not_exists" } };
  }

  const userUUID = await GetUserUUIDFromEmail(body.email);

  const [challengeAuthRow] = (await pool.execute(
    `SELECT description, created_at FROM challenge_auth WHERE submitter=UNHEX("${uuidStringify(
      userUUID,
    ).replace(/-/gi, "")}") AND id=${id}`,
  )) as [
    challengeAuthRow: { description: string; created_at: string }[],
    field: unknown,
  ];

  return { status: 200, result: challengeAuthRow[0] };
};

export const MakeChallengeSaved = async (req: express.Request) => {
  const { body }: { body: { email: string } } = req;
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const checkChallengeExist = (await pool.execute(
    `SELECT uuid FROM challenge WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (checkChallengeExist[0].length < 1) {
    return { status: 404, result: { error: "challenge_not_exists" } };
  }

  const [[{ uuid: challengeUUID }]] = checkChallengeExist as unknown as [
    [{ uuid: Buffer }],
  ];

  const userUUID = await GetUserUUIDFromEmail(body.email);

  const [[{ "COUNT(*)": checkAccountChallengeRowExist }]] = (await pool.execute(
    `SELECT COUNT(*) FROM account_challenge WHERE challenge=UNHEX("${uuidStringify(
      challengeUUID,
    ).replace(/-/gi, "")}") AND account=UNHEX("${uuidStringify(
      userUUID,
    ).replace(/-/gi, "")}")`,
  )) as unknown as [[{ "COUNT(*)": number }]];

  if (checkAccountChallengeRowExist === 0) {
    try {
      await pool.execute(
        `INSERT INTO account_challenge (account, challenge, is_saved)
    VALUE (?,?,?)`,
        [userUUID, challengeUUID, true],
      );

      return { status: 200, result: { saved: id } };
    } catch (e) {
      console.error(e);

      return { status: 500, result: { error: "exception_occurred" } };
    }
  } else {
    try {
      await (await pool.getConnection()).beginTransaction();

      await pool.execute(
        `UPDATE account_challenge SET is_saved=true WHERE challenge=UNHEX("${uuidStringify(
          challengeUUID,
        ).replace(/-/gi, "")}") AND account=UNHEX("${uuidStringify(
          userUUID,
        ).replace(/-/gi, "")}")`,
      );

      await (await pool.getConnection()).commit();

      return { status: 200, result: { saved: id } };
    } catch (e) {
      await (await pool.getConnection()).rollback();

      console.error(e);

      return { status: 500, result: { error: "exception_occurred" } };
    }
  }
};

export const MakeChallengeUnSaved = async (req: express.Request) => {
  const { body }: { body: { email: string } } = req;
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const checkChallengeExist = (await pool.execute(
    `SELECT uuid FROM challenge WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (checkChallengeExist[0].length < 1) {
    return { status: 404, result: { error: "challenge_not_exists" } };
  }

  const [[{ uuid: challengeUUID }]] = checkChallengeExist as unknown as [
    [{ uuid: Buffer }],
  ];

  const userUUID = await GetUserUUIDFromEmail(body.email);

  const [[{ "COUNT(*)": checkAccountChallengeRowExist }]] = (await pool.execute(
    `SELECT COUNT(*) FROM account_challenge WHERE challenge=UNHEX("${uuidStringify(
      challengeUUID,
    ).replace(/-/gi, "")}") AND account=UNHEX("${uuidStringify(
      userUUID,
    ).replace(/-/gi, "")}") AND is_saved=true`,
  )) as unknown as [[{ "COUNT(*)": number }]];

  if (checkAccountChallengeRowExist === 1) {
    try {
      await (await pool.getConnection()).beginTransaction();

      await pool.execute(
        `UPDATE account_challenge SET is_saved=false WHERE challenge=UNHEX("${uuidStringify(
          challengeUUID,
        ).replace(/-/gi, "")}") AND account=UNHEX("${uuidStringify(
          userUUID,
        ).replace(/-/gi, "")}")`,
      );

      await (await pool.getConnection()).commit();

      return { status: 200, result: { unSaved: id } };
    } catch (e) {
      await (await pool.getConnection()).rollback();

      console.error(e);

      return { status: 500, result: { error: "exception_occurred" } };
    }
  } else if (checkAccountChallengeRowExist === 0) {
    return {
      status: 404,
      result: { failed: "challenge_has_not_already_been_saved" },
    };
  } else {
    return { status: 500, result: { error: "exception_occurred" } };
  }
};

export const AddChallengeToBasket = async (req: express.Request) => {
  const { body }: { body: { email: string } } = req;
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const checkChallengeExist = (await pool.execute(
    `SELECT uuid FROM challenge WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (checkChallengeExist[0].length < 1) {
    return { status: 404, result: { error: "challenge_not_exists" } };
  }

  const [[{ uuid: challengeUUID }]] = checkChallengeExist as unknown as [
    [{ uuid: Buffer }],
  ];

  const userUUID = await GetUserUUIDFromEmail(body.email);

  const [[{ "COUNT(*)": checkAccountChallengeRowExist }]] = (await pool.execute(
    `SELECT COUNT(*) FROM account_challenge WHERE challenge=UNHEX("${uuidStringify(
      challengeUUID,
    ).replace(/-/gi, "")}") AND account=UNHEX("${uuidStringify(
      userUUID,
    ).replace(/-/gi, "")}")`,
  )) as unknown as [[{ "COUNT(*)": number }]];

  if (checkAccountChallengeRowExist === 0) {
    try {
      await pool.execute(
        `INSERT INTO account_challenge (account, challenge, is_in_basket)
    VALUE (?,?,?)`,
        [userUUID, challengeUUID, true],
      );

      return { status: 200, result: { added: id } };
    } catch (e) {
      console.error(e);

      return { status: 500, result: { error: "exception_occurred" } };
    }
  } else {
    try {
      await (await pool.getConnection()).beginTransaction();

      await pool.execute(
        `UPDATE account_challenge SET is_in_basket=true WHERE challenge=UNHEX("${uuidStringify(
          challengeUUID,
        ).replace(/-/gi, "")}") AND account=UNHEX("${uuidStringify(
          userUUID,
        ).replace(/-/gi, "")}")`,
      );

      await (await pool.getConnection()).commit();

      return { status: 200, result: { added: id } };
    } catch (e) {
      await (await pool.getConnection()).rollback();

      console.error(e);

      return { status: 500, result: { error: "exception_occurred" } };
    }
  }
};

export const RemoveChallengeFromBasket = async (req: express.Request) => {
  const { body }: { body: { email: string } } = req;
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const checkChallengeExist = (await pool.execute(
    `SELECT uuid FROM challenge WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (checkChallengeExist[0].length < 1) {
    return { status: 404, result: { error: "challenge_not_exists" } };
  }

  const [[{ uuid: challengeUUID }]] = checkChallengeExist as unknown as [
    [{ uuid: Buffer }],
  ];

  const userUUID = await GetUserUUIDFromEmail(body.email);

  const [[{ "COUNT(*)": checkAccountChallengeRowExist }]] = (await pool.execute(
    `SELECT COUNT(*) FROM account_challenge WHERE challenge=UNHEX("${uuidStringify(
      challengeUUID,
    ).replace(/-/gi, "")}") AND account=UNHEX("${uuidStringify(
      userUUID,
    ).replace(/-/gi, "")}") AND is_in_basket=true`,
  )) as unknown as [[{ "COUNT(*)": number }]];

  if (checkAccountChallengeRowExist === 1) {
    try {
      await (await pool.getConnection()).beginTransaction();

      await pool.execute(
        `UPDATE account_challenge SET is_in_basket=false WHERE challenge=UNHEX("${uuidStringify(
          challengeUUID,
        ).replace(/-/gi, "")}") AND account=UNHEX("${uuidStringify(
          userUUID,
        ).replace(/-/gi, "")}")`,
      );

      await (await pool.getConnection()).commit();

      return { status: 200, result: { removed: id } };
    } catch (e) {
      await (await pool.getConnection()).rollback();

      console.error(e);

      return { status: 500, result: { error: "exception_occurred" } };
    }
  } else if (checkAccountChallengeRowExist === 0) {
    return {
      status: 404,
      result: { failed: "challenge_is_not_already_in_basket" },
    };
  } else {
    return { status: 500, result: { error: "exception_occurred" } };
  }
};
