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
  GetCertificationArticle,
  MakeChallengeSaved,
  MakeChallengeUnSaved,
  AddChallengeToBasket,
  RemoveChallengeFromBasket,
} from "../services/challenge";
import { Category } from "../types/challenge";

import { AuthJWT, AuthOptionalJWT } from "../services/middlewares/auth";
import { wrap } from "../services/utils/wrapper";

const challengeRouter = express.Router();

challengeRouter.get(
  "/search",
  wrap(async (req: express.Request, res: express.Response) => {
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
  }),
);

challengeRouter.get(
  "/popular",
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetPopularChallenge(
      Number(req.query.count),
    );
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.get(
  "/recent",
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetRecentChallenge(
      Number(req.query.count),
    );
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.get(
  "/open",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetOpenChallenge(req);
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.get(
  "/participate",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetParticipateChallenge(req);
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.get(
  "/complete",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetCompleteChallenge(req);
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.get(
  "/:id",
  AuthOptionalJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetChallenge(req);
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.post(
  "/",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await PostChallenge(req);
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.put(
  "/:id",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await PutChallenge(Number(req.params.id), req);
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.delete(
  "/:id",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await DeleteChallenge(Number(req.params.id));
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.post(
  "/:id/participate",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await JoinChallenge(req);
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.post(
  "/:id/complete",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await MakeChallengeComplete(req);
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.post(
  "/:id/certification",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await WriteCertificationArticle(req);
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.get(
  "/certification/:id",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetCertificationArticle(req);
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.post(
  "/:id/save",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await MakeChallengeSaved(req);
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.delete(
  "/:id/save",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await MakeChallengeUnSaved(req);
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.post(
  "/:id/basket",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await AddChallengeToBasket(req);
    res.status(status);
    res.send(result);
  }),
);

challengeRouter.delete(
  "/:id/basket",
  AuthJWT,
  wrap(async (req: express.Request, res: express.Response) => {
    const { status, result } = await RemoveChallengeFromBasket(req);
    res.status(status);
    res.send(result);
  }),
);

export default challengeRouter;
