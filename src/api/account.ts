import express from "express";

import {
  GenerateRegisterToken,
  TokenRefresh,
  Login,
  Register,
  VerifyRegisterToken,
  ModifyUsername,
  ModifyPassword,
} from "../services/account";
import { AuthJWT } from "../services/middlewares/auth";
import { wrap } from "../services/utils/wrapper";

const accountRouter = express.Router();

accountRouter.post(
  "/register-token",
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await GenerateRegisterToken(req);
    res.status(status);
    res.send(result);
  }),
);

accountRouter.post(
  "/verify-token",
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await VerifyRegisterToken(req);
    res.status(status);
    res.send(result);
  }),
);

accountRouter.post(
  "/register",
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await Register(req);
    res.status(status);
    res.send(result);
  }),
);

accountRouter.post(
  "/login",
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await Login(req);
    res.status(status);
    res.send(result);
  }),
);

accountRouter.get(
  "/refresh",
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await TokenRefresh(req);
    res.status(status);
    res.send(result);
  }),
);

accountRouter.put(
  "/user/name",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await ModifyUsername(req);
    res.status(status);
    res.send(result);
  }),
);

accountRouter.put(
  "/user/password",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await ModifyPassword(req);
    res.status(status);
    res.send(result);
  }),
);

export default accountRouter;
