import "./module-aliases";
import express from "express";
import morgan from "morgan";
import Rollbar from "rollbar";

import { UserRouter } from "@routes/users";

export const app = express();
const { PORT = 80, NODE_ENV, APP_ENV, ROLLBAR_ACCESS_TOKEN } = process.env;
export const rollbar = new Rollbar({
  accessToken: ROLLBAR_ACCESS_TOKEN,
  environment: APP_ENV,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const startApplication = () => {
  app.listen(Number(PORT), () => {
    /* eslint-disable */
    console.log(`Server listening on port ${PORT}`);
  });
};

if (NODE_ENV !== "test") app.use(morgan("tiny"));
if (APP_ENV !== "development") app.use(rollbar.errorHandler());

app.use(express.json());

app.use("/api/v1/users", UserRouter);

app.get("/", (_req, res) => {
  res.status(200).json("Hello from the doculy api!");
});

if (NODE_ENV !== "test") startApplication();
