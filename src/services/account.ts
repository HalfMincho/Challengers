import express from "express";
import nodemailer from "nodemailer";
import pool from "./../config/mysql";
import { stringify as uuidStringify, v4 as uuidv4 } from "uuid";

import { Validate } from "./middlewares/validation";
import { RegisterEmail } from "../types/account";
import { RegisterEmailSchema } from "../schema";
import { mailContent } from "../types/const";
import { mailConfig } from "../config/mail";

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
