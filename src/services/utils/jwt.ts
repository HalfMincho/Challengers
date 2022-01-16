import jwt from "jsonwebtoken";
import pool from "../../config/mysql";
import { secret } from "../../config/jwt";

export const JWTSign = (email: string) => {
  const payload = {
    email: email,
  };

  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

export const JWTVerify = (token: string) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, secret);
    return {
      ok: true,
      email: decoded.email,
    };
  } catch (e: unknown) {
    return {
      ok: false,
      message: (e as Error).message,
    };
  }
};

export const JWTRefresh = () => {
  return jwt.sign({}, secret, {
    algorithm: "HS256",
    expiresIn: "14d",
  });
};

export const JWTRefreshVerify = async (token: string, email: string) => {
  try {
    const [rows] = (await pool.execute(
      `SELECT refresh_token FROM refresh_token WHERE email="${email}"`,
    )) as [rows: any[], field: unknown];

    if (token === rows[0].refresh_token) {
      try {
        jwt.verify(token, secret);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
