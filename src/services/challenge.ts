import express from "express";
import Connection from "./../config/mysql";
import { stringify as uuidStringify, v4 as uuidv4 } from "uuid";

import { Validate } from "./middlewares/validation";

import { Challenge, ChallengeFromRequest } from "./../types/challenge";
import { ChallengeSchema } from "../schema/challenge";

export const GetPopularChallenge = async () => {
  const connection = await Connection();

  const [rows] = (await connection.execute(
    `SELECT id, submitter, category, name, auth_way, auth_day, auth_count_in_day, start_at, end_at, cost, description, reg_date, views 
    FROM challenge ORDER BY views desc LIMIT 0, 10`,
  )) as [rows: Challenge[], field: unknown];

  rows.forEach((challenge: Challenge) => {
    challenge["submitter"] = uuidStringify(
      challenge["submitter"] as unknown as Buffer,
    );
    challenge["category"] = uuidStringify(
      challenge["category"] as unknown as Buffer,
    );
  });

  return rows;
};

export const GetRecentChallenge = async () => {
  const connection = await Connection();

  const [rows] = (await connection.execute(
    `SELECT id, submitter, category, name, auth_way, auth_day, auth_count_in_day, start_at, end_at, cost, description, reg_date, views 
    FROM challenge ORDER BY reg_date desc LIMIT 0, 10`,
  )) as [rows: Challenge[], field: unknown];

  rows.forEach((challenge: Challenge) => {
    challenge["submitter"] = uuidStringify(
      challenge["submitter"] as unknown as Buffer,
    );
    challenge["category"] = uuidStringify(
      challenge["category"] as unknown as Buffer,
    );
  });

  return rows;
};

export const PostChallenge = async (req: express.Request) => {
  const connection = await Connection();
  const { body }: { body: ChallengeFromRequest } = req;

  const buffer = Buffer.alloc(16);
  uuidv4({}, buffer);
  const test_uuid = buffer;

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

  const params = [
    test_uuid,
    test_uuid,
    test_uuid,
    body.name,
    body.auth_way,
    body.auth_day,
    body.auth_count_in_day,
    body.cost,
    body.description,
  ];

  try {
    await connection.beginTransaction();

    await connection.execute(
      `INSERT INTO challenge (uuid, submitter, category, name, auth_way, auth_day, auth_count_in_day, cost, description)
    VALUE (?,?,?,?,?,?,?,?,?)`,
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
  }
};
