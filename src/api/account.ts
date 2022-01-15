import express from "express";

import {
  GenerateRegisterToken,
  Register,
  SendRegisterMail,
  VerifyRegisterToken,
} from "../services/account";

const accountRouter = express.Router();

accountRouter.post(
  "/register-token",
  async (req: express.Request, res: express.Response) => {
    const registerToken = (await GenerateRegisterToken(req)) as string;

    if (!registerToken) {
      res.status(500);
      res.send({ error: "exception_occurred" });
    }

    if (typeof registerToken === "string") {
      const { status, result } = await SendRegisterMail(req, registerToken);
      res.status(status);
      res.send(result);
    }
  },
);

accountRouter.post(
  "/verify-token",
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await VerifyRegisterToken(req);
    res.status(status);
    res.send(result);
  },
);

accountRouter.post(
  "/register",
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await Register(req);
    res.status(status);
    res.send(result);
  },
);

export default accountRouter;
