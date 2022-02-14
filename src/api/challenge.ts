import express from "express";

import {
  GetChallenge,
  GetPopularChallenge,
  GetRecentChallenge,
  PostChallenge,
  PutChallenge,
  DeleteChallenge,
  GetChallengeWithTitle,
  GetChallengeWithCategory,
  GetOpenChallenge,
  GetParticipateChallenge,
  JoinChallenge,
  GetCompleteChallenge,
  MakeChallengeComplete,
  WriteCertificationArticle,
} from "../services/challenge";
import { Category } from "../types/challenge";

import { AuthJWT } from "../services/middlewares/auth";

const challengeRouter = express.Router();

challengeRouter.get(
  "/search",
  async (req: express.Request, res: express.Response) => {
    if ("keyword" in req.query && !("category" in req.query)) {
      const { status, result } = await GetChallengeWithTitle(
        String(req.query.keyword),
        Number(req.query.count),
      );
      res.status(status);
      res.send(result);
    } else if ("category" in req.query && !("keyword" in req.query)) {
      const { status, result } = await GetChallengeWithCategory(
        req.query.category as Category,
        Number(req.query.count),
      );
      res.status(status);
      res.send(result);
    }
  },
);

challengeRouter.get(
  "/popular",
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetPopularChallenge(
      Number(req.query.count),
    );
    res.status(status);
    res.send(result);
  },
);

challengeRouter.get(
  "/recent",
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetRecentChallenge(
      Number(req.query.count),
    );
    res.status(status);
    res.send(result);
  },
);

challengeRouter.get(
  "/open",
  AuthJWT,
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetOpenChallenge(req);
    res.status(status);
    res.send(result);
  },
);

challengeRouter.get(
  "/participate",
  AuthJWT,
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetParticipateChallenge(req);
    res.status(status);
    res.send(result);
  },
);

challengeRouter.get(
  "/complete",
  AuthJWT,
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetCompleteChallenge(req);
    res.status(status);
    res.send(result);
  },
);

challengeRouter.get(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetChallenge(Number(req.params.id));
    res.status(status);
    res.send(result);
  },
);

challengeRouter.post(
  "/",
  AuthJWT,
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await PostChallenge(req);
    res.status(status);
    res.send(result);
  },
);

challengeRouter.put(
  "/:id",
  AuthJWT,
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await PutChallenge(Number(req.params.id), req);
    res.status(status);
    res.send(result);
  },
);

challengeRouter.delete(
  "/:id",
  AuthJWT,
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await DeleteChallenge(Number(req.params.id));
    res.status(status);
    res.send(result);
  },
);

challengeRouter.post(
  "/participate/:id",
  AuthJWT,
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await JoinChallenge(req);
    res.status(status);
    res.send(result);
  },
);

challengeRouter.post(
  "/complete/:id",
  AuthJWT,
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await MakeChallengeComplete(req);
    res.status(status);
    res.send(result);
  },
);

challengeRouter.post(
  "/certification/:id",
  AuthJWT,
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await WriteCertificationArticle(req);
    res.status(status);
    res.send(result);
  },
);

export default challengeRouter;
