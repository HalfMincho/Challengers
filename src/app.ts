import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { corsOptions } from "./config/cors";

import challengeRouter from "./api/challenge";
import accountRouter from "./api/account";

const app: express.Application = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/challenge", challengeRouter);
app.use("/account", accountRouter);

export default app;
