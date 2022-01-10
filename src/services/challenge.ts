import express from "express";
import Connection from "./../config/mysql";
import { stringify as uuidStringify, v4 as uuidv4 } from "uuid";

import { Validate } from "./middlewares/validation";

import {
  Category,
  CategoryFromDB,
  Challenge,
  ChallengeFromDB,
  ChallengeFromRequest,
} from "./../types/challenge";
import { ChallengeSchema } from "../schema/challenge";

export const GetChallenge = async (id: number) => {
  const connection = await Connection();

  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const result = (await connection.execute(
    `SELECT id FROM challenge WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (result[0].length < 1) {
    return { status: 400, result: { error: "challenge_no_exists" } };
  }

  const [row] =
    (await connection.execute(`SELECT id, submitter, category, name, auth_way, auth_day, auth_count_in_day,
  start_at, end_at, cost, description, reg_date, views FROM challenge WHERE id=${id}`)) as [
      row: ChallengeFromDB[],
      field: unknown,
    ];

  const refinedRow = await Promise.all(
    row.map(async (challenge: ChallengeFromDB) => {
      const [category] = (await connection.execute(
        `SELECT name FROM category WHERE uuid=UNHEX("${uuidStringify(
          challenge.category,
        ).replace(/-/gi, "")}")`,
      )) as Array<Array<CategoryFromDB>>;

      return {
        ...challenge,
        category: category[0].name,
        submitter: uuidStringify(challenge["submitter"]),
      };
    }),
  );

  try {
    await connection.beginTransaction();
    await connection.execute(
      `UPDATE challenge SET views = views + 1 WHERE id=${id}`,
    );
    await connection.commit();

    row[0]["views"] += 1;
  } catch (e) {
    await connection.rollback();

    console.error(e);

    return { status: 500, result: { error: "exception_occurred" } };
  } finally {
    await connection.end();
  }

  return { status: 200, result: refinedRow[0] };
};

export const GetPopularChallenge = async (count: number) => {
  const connection = await Connection();

  if (isNaN(count)) {
    count = 10;
  }

  const [rows] = (await connection.execute(
    `SELECT id, submitter, category, name, auth_way, auth_day, auth_count_in_day, start_at, end_at, cost, description, reg_date, views 
    FROM challenge ORDER BY views desc LIMIT 0, ${count}`,
  )) as [rows: ChallengeFromDB[], field: unknown];

  const refinedRows = await Promise.all(
    rows.map(async (challenge: ChallengeFromDB) => {
      const [category] = (await connection.execute(
        `SELECT name FROM category WHERE uuid=UNHEX("${uuidStringify(
          challenge.category,
        ).replace(/-/gi, "")}")`,
      )) as Array<Array<CategoryFromDB>>;

      return {
        ...challenge,
        category: category[0].name,
        submitter: uuidStringify(challenge["submitter"]),
      };
    }),
  );

  await connection.end();

  return { status: 200, result: refinedRows };
};

export const GetRecentChallenge = async (count: number) => {
  const connection = await Connection();

  if (isNaN(count)) {
    count = 10;
  }

  const [rows] = (await connection.execute(
    `SELECT id, submitter, category, name, auth_way, auth_day, auth_count_in_day, start_at, end_at, cost, description, reg_date, views 
    FROM challenge ORDER BY reg_date desc LIMIT 0, ${count}`,
  )) as [rows: ChallengeFromDB[], field: unknown];

  const refinedRows = await Promise.all(
    rows.map(async (challenge: ChallengeFromDB) => {
      const [category] = (await connection.execute(
        `SELECT name FROM category WHERE uuid=UNHEX("${uuidStringify(
          challenge.category,
        ).replace(/-/gi, "")}")`,
      )) as Array<Array<CategoryFromDB>>;

      return {
        ...challenge,
        category: category[0].name,
        submitter: uuidStringify(challenge["submitter"]),
      };
    }),
  );

  await connection.end();

  return { status: 200, result: refinedRows };
};

export const PostChallenge = async (req: express.Request) => {
  const connection = await Connection();
  const { body }: { body: ChallengeFromRequest } = req;

  const buffer = Buffer.alloc(16);
  uuidv4({}, buffer);
  const challengeUUID = buffer;

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

  const category = ["건강", "정서", "생활", "역량", "자산", "취미", "그 외"];

  const isCategory = (x: string): x is Category => category.includes(x);

  if (!isCategory(body.category)) {
    return { status: 400, result: { error: "no_required_args" } };
  }

  const categoryUUID = (await connection.execute(
    `SELECT uuid FROM category WHERE name="${body.category}"`,
  )) as [categoryUUID: any[], field: unknown];

  const params = [
    challengeUUID,
    challengeUUID,
    categoryUUID[0][0].uuid,
    body.name,
    body.auth_way,
    body.auth_day,
    body.auth_count_in_day,
    body.start_at,
    body.end_at,
    body.cost,
    body.description,
  ];

  try {
    await connection.beginTransaction();

    await connection.execute(
      `INSERT INTO challenge (uuid, submitter, category, name,
      auth_way, auth_day, auth_count_in_day, start_at, end_at, cost, description)
    VALUE (?,?,?,?,?,?,?,?,?,?,?)`,
      params,
    );

    const [rows] = (await connection.execute("SELECT LAST_INSERT_ID()")) as [
      rows: Array<Object>,
      field: unknown,
    ];

    const created_challenge_id = Object.values(
      JSON.parse(JSON.stringify(rows[0])),
    )[0];

    await connection.commit();

    return { status: 200, result: { created: created_challenge_id } };
  } catch (e) {
    await connection.rollback();

    console.error(e);

    return { status: 500, result: { error: "exception_occurred" } };
  } finally {
    await connection.end();
  }
};

export const PutChallenge = async (id: number, req: express.Request) => {
  const connection = await Connection();

  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const result = (await connection.execute(
    `SELECT id FROM challenge WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (result[0].length < 1) {
    return { status: 400, result: { error: "challenge_no_exists" } };
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

  const categoryUUID = (await connection.execute(
    `SELECT uuid FROM category WHERE name="${body.category}"`,
  )) as [categoryUUID: any[], field: unknown];

  const params = [
    categoryUUID[0][0].uuid,
    body.name,
    body.auth_way,
    body.auth_day,
    body.auth_count_in_day,
    body.start_at,
    body.end_at,
    body.cost,
    body.description,
  ];

  try {
    await connection.beginTransaction();

    await connection.execute(
      `UPDATE challenge SET category=?, name=?, auth_way=?, auth_day=?,
      auth_count_in_day=?, start_at=?, end_at=?, cost=?, description=? WHERE id=${id}`,
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
      ],
    );

    await connection.commit();

    return { status: 200, result: { modified: id } };
  } catch (e) {
    await connection.rollback();

    console.error(e);

    return { status: 500, result: { error: "exception_occurred" } };
  } finally {
    await connection.end();
  }
};

export const DeleteChallenge = async (id: number) => {
  const connection = await Connection();

  if (isNaN(id)) {
    return { status: 400, result: { error: "invalid_id" } };
  }

  const result = (await connection.execute(
    `SELECT id FROM challenge WHERE id=${id}`,
  )) as [result: Array<Object>, field: unknown];

  if (result[0].length < 1) {
    return { status: 400, result: { error: "challenge_no_exists" } };
  }

  try {
    await connection.beginTransaction();

    await connection.execute(`DELETE FROM challenge WHERE id=${id}`);

    await connection.commit();

    return { status: 200, result: { deleted: id } };
  } catch (e) {
    await connection.rollback();

    console.error(e);

    return { status: 500, result: { error: "exception_occurred" } };
  } finally {
    await connection.end();
  }
};
