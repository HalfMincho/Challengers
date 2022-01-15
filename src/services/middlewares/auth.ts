import express from "express";
import { JWTVerify } from "../utils/jwt";

export const AuthJWT = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Challengers ")[1];
    const result = JWTVerify(token);
    if (result.ok) {
      req.body.email = result.email;
      next();
    } else {
      res.status(401).send({
        ok: false,
        message: result.message,
      });
    }
  } else {
    res.status(403).send({ error: "permission_denied" });
  }
};
