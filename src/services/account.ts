import express from "express";
import nodemailer from "nodemailer";
import pool from "./../config/mysql";
import { stringify as uuidStringify, v4 as uuidv4 } from "uuid";
import crypto from "crypto";

import { Validate } from "./middlewares/validation";
import {
  RegisterEmail,
  RegisterInfo,
  RegisterTokenVerificationRequest,
  LoginInfo,
} from "../types/account";
import {
  RegisterEmailSchema,
  RegisterTokenVerificationSchema,
  RegisterInfoSchema,
  LoginInfoSchema,
} from "../schema";
import { mailContent } from "../types/const";
import { mailConfig } from "../config/mail";

import { JWTSign, JWTVerify, JWTRefresh, JWTRefreshVerify } from "./utils/jwt";

const GetUUID = async (email: string) => {
  const [[{ uuid }]] = (await pool.execute(
    `SELECT uuid FROM account WHERE email LIKE "${email}"`,
  )) as [uuid: any[], field: unknown];

  return uuid;
};

const CheckDuplicateMail = async (address: string) => {
  const [[{ "COUNT(*)": rows }]] = (await pool.execute(
    `SELECT COUNT(*) FROM account WHERE email LIKE "${address}"`,
  )) as [rows: any[], field: unknown];

  if (rows === 0) {
    return false;
  } else {
    return true;
  }
};

export const GenerateRegisterToken = async (req: express.Request) => {
  const { body }: { body: RegisterEmail } = req;

  const reqBodyValidation = await Validate(body, RegisterEmailSchema);

  if (!reqBodyValidation) {
    return { status: 400, result: { error: "no_required_args" } };
  }

  const validateEmail = (content: string) => {
    const emailRegex =
      // eslint-disable-next-line no-useless-escape
      /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
    return emailRegex.test(content);
  };

  if (!validateEmail(body.email)) {
    return { status: 400, result: { error: "invalid_email" } };
  }

  if (await CheckDuplicateMail(body.email)) {
    return { status: 409, result: { error: "email_already_exists" } };
  }

  const generateToken = (length: number) => {
    const a =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_~()'!*:@,;".split(
        "",
      );
    const b = [];
    for (let i = 0; i < length; i++) {
      const j = parseInt((Math.random() * (a.length - 1)).toFixed(0));
      b[i] = a[j];
    }
    return b.join("");
  };

  try {
    let token: string;
    while (true) {
      token = generateToken(8);

      const [[{ "COUNT(*)": rows }]] = (await pool.execute(
        `SELECT COUNT(*) FROM mail_verification WHERE token="${token}"`,
      )) as [rows: any[], field: unknown];

      if (rows === 0) {
        break;
      }
    }
    await pool.execute(
      `INSERT INTO mail_verification (token, email) VALUE (?, ?)`,
      [token, body.email],
    );
    return token;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const SendRegisterMail = async (req: express.Request, token: string) => {
  const { body }: { body: RegisterEmail } = req;

  try {
    let transporter = nodemailer.createTransport({
      service: mailConfig.service,
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.auth.user,
        pass: mailConfig.auth.pass,
      },
    });

    await transporter.sendMail({
      from: `Challengers <${mailConfig.auth.user}>`,
      to: body.email,
      subject: `${mailContent.mailVerification.mailVerificationMailTitle}`,
      html: `<b>${mailContent.mailVerification.mailVerificationMailBody(
        token,
      )}</b>`,
    });

    return { status: 200, result: { success: "send_registration_mail" } };
  } catch (e) {
    console.error(e);

    return { status: 500, result: { error: "exception_occurred" } };
  }
};

export const VerifyRegisterToken = async (req: express.Request) => {
  const { body }: { body: RegisterTokenVerificationRequest } = req;

  const reqBodyValidation = await Validate(
    body,
    RegisterTokenVerificationSchema,
  );

  if (!reqBodyValidation) {
    return { status: 400, result: { error: "no_required_args" } };
  }

  try {
    const [[{ "COUNT(*)": rows }]] = (await pool.execute(
      `SELECT COUNT(*) FROM mail_verification WHERE token="${body.token}" AND email="${body.email}" AND used=0`,
    )) as [rows: any[], field: unknown];

    if (rows !== 1) {
      return { status: 404, result: { error: "verify_token_failed" } };
    }

    await pool.execute(
      `UPDATE mail_verification SET used=1 WHERE token="${body.token}"`,
    );

    return { status: 200, result: { message: "token_verified" } };
  } catch (e) {
    console.error(e);

    return { status: 500, result: { error: "exception_occurred" } };
  }
};

export const Register = async (req: express.Request) => {
  const { body }: { body: RegisterInfo } = req;

  const reqBodyValidation = await Validate(body, RegisterInfoSchema);

  if (!reqBodyValidation) {
    return { status: 400, result: { error: "no_required_args" } };
  }

  const buffer = Buffer.alloc(16);
  uuidv4({}, buffer);
  const userUUID = buffer;

  const [[{ "COUNT(*)": rows }]] = (await pool.execute(
    `SELECT COUNT(*) FROM mail_verification WHERE token="${body.token}" AND email="${body.email}" AND used=1`,
  )) as [rows: any[], field: unknown];

  if (rows !== 1) {
    return { status: 404, result: { error: "token_verification_is_needed" } };
  }

  while (true) {
    const [[{ "COUNT(*)": accounts }]] = (await pool.execute(`
    SELECT COUNT(*) FROM account WHERE uuid=UNHEX("${uuidStringify(
      userUUID,
    ).replace(/-/gi, "")}")
    `)) as [accounts: any[], field: unknown];

    if (accounts === 0) {
      break;
    }
  }

  const validatePassword = (content: string) => {
    const passwordRegex =
      // eslint-disable-next-line no-useless-escape
      /^([\x21-\x7e]{8,})$/;
    return passwordRegex.test(content);
  };

  if (!validatePassword(body.password)) {
    return { status: 400, result: { error: "password_policy_mismatch" } };
  }

  const [[{ "COUNT(*)": emails }]] = (await pool.execute(`
    SELECT COUNT(*) FROM account WHERE email LIKE "${body.email}"
    `)) as [emails: any[], field: unknown];

  if (emails !== 0) {
    return { status: 400, result: { error: "email_already_exists" } };
  } else if (body.email.length > 255) {
    return { status: 400, result: { error: "email_too_long" } };
  }

  if (body.name.length > 255) {
    return { status: 400, result: { error: "name_too_long" } };
  }

  const hashedPassword = crypto
    .createHash("sha512")
    .update(body.password)
    .digest("hex");

  try {
    await (await pool.getConnection()).beginTransaction();

    await pool.execute(
      `INSERT INTO account (uuid, email, password, name) VALUE (?,?,?,?)`,
      [userUUID, body.email, hashedPassword, body.name],
    );

    await pool.execute(
      `DELETE FROM mail_verification WHERE token="${body.token}"`,
    );

    await (await pool.getConnection()).commit();

    return { status: 200, result: { success: "register_success" } };
  } catch (e) {
    await (await pool.getConnection()).rollback();

    console.error(e);

    return { status: 500, result: { error: "exception_occurred" } };
  }
};

export const Login = async (req: express.Request) => {
  const { body }: { body: LoginInfo } = req;

  const reqBodyValidation = await Validate(body, LoginInfoSchema);

  if (!reqBodyValidation) {
    return { status: 400, result: { error: "no_required_args" } };
  }

  const [[{ password }]] = (await pool.execute(
    `SELECT password FROM account WHERE email LIKE "${body.email}"`,
  )) as [row: any[], field: unknown];

  if (password === undefined || password.length === 0) {
    return { status: 403, result: { error: "authentication_failed" } };
  }

  const hashedPassword = crypto
    .createHash("sha512")
    .update(body.password)
    .digest("hex");

  if (hashedPassword !== password) {
    return { status: 403, result: { error: "authentication_failed" } };
  } else {
    const accessToken = JWTSign(body.email);
    const refreshToken = JWTRefresh();

    await pool.execute(
      `INSERT INTO refresh_token (email, refresh_token) VALUE (?,?)`,
      [body.email, refreshToken],
    );

    return {
      status: 200,
      result: { accessToken: accessToken, refreshToken: refreshToken },
    };
  }
};
