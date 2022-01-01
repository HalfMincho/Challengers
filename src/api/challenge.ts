import express from "express";

import { GetPopularChallenge, PostChallenge } from "../services/challenge";

const challengeRouter = express.Router();

challengeRouter.get(
  "/popular",
  async (req: express.Request, res: express.Response) => {
    const result = await GetPopularChallenge();
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

export default challengeRouter;
