import express from "express";
import bodyParser from "body-parser";

import challengeRouter from "./api/challenge";

const app: express.Application = express();
app.use(bodyParser.json());

app.use("/challenge", challengeRouter);

export default app;
