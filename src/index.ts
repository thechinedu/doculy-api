import "./module-aliases";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import Rollbar from "rollbar";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";

import { HTTPStatus } from "@interfaces/shared";
import { UserRouter } from "@routes/users";
import { ErrorSerializer } from "@serializers/error";

export const app = express();
const {
  PORT = 80,
  NODE_ENV,
  APP_ENV,
  ROLLBAR_ACCESS_TOKEN,
  AUTH_CONNECTION_URI,
  AUTH_KEY,
  API_DOMAIN,
  APP_DOMAIN,
  CLIENT_DOMAIN,
} = process.env;
export const rollbar = new Rollbar({
  accessToken: ROLLBAR_ACCESS_TOKEN,
  environment: APP_ENV,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

supertokens.init({
  supertokens: {
    connectionURI: AUTH_CONNECTION_URI as string,
    apiKey: AUTH_KEY as string,
  },
  appInfo: {
    appName: "Doculy",
    apiDomain: API_DOMAIN as string,
    websiteDomain: APP_DOMAIN as string,
    apiBasePath: "/v1/auth",
  },
  recipeList: [Session.init()],
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
app.use(
  cors({
    origin: CLIENT_DOMAIN,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);
app.use(supertokens.middleware());

app.use("/api/v1/users", UserRouter);

app.get("/", (_req, res) => {
  res.status(200).json("Hello from the doculy api!");
});

app.use(supertokens.errorHandler());

app.use((_req, res) => {
  res
    .status(HTTPStatus.NOT_FOUND)
    .json(ErrorSerializer.serialize(new Error("Route not found")));
});

if (NODE_ENV !== "test") startApplication();
