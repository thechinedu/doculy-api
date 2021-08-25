import { generateSchema, env } from "prisma-prime";

import * as models from "./models/index";

export const schema = generateSchema({
  datasource: {
    provider: "postgresql",
    url: env("DATABASE_URL"),
  },
  models,
});
