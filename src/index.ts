import "./module-aliases";
import express from "express";
import morgan from "morgan";

import { UserRouter } from "@routes/users";

export const app = express();
const { PORT = 80 } = process.env;
const { NODE_ENV } = process.env;

const startApplication = () => {
  app.listen(Number(PORT), () => {
    /* eslint-disable */
    console.log(`Server listening on port ${PORT}`);
  });
};

if (NODE_ENV !== "test") app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/v1/users", UserRouter);

app.get("/", (_req, res) => {
  res.status(200).json("hello from Doculy!");
});

if (NODE_ENV !== "test") startApplication();
