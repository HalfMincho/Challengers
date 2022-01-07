import express from "express";

import {
  GetChallenge,
  GetPopularChallenge,
  GetRecentChallenge,
  PostChallenge,
  PutChallenge,
  DeleteChallenge,
} from "../services/challenge";

const challengeRouter = express.Router();

challengeRouter.get(
  "/popular",
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetPopularChallenge();
    res.status(status);
    res.send(result);
  },
);

challengeRouter.get(
  "/recent",
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await GetRecentChallenge();
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
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await PostChallenge(req);
    res.status(status);
    res.send(result);
  },
);

challengeRouter.put(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await PutChallenge(Number(req.params.id), req);
    res.status(status);
    res.send(result);
  },
);

challengeRouter.delete(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    const { status, result } = await DeleteChallenge(Number(req.params.id));
    res.status(status);
    res.send(result);
  },
);

export default challengeRouter;
