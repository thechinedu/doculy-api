import { generateSchema } from "prisma-prime";

import * as models from "./models/index";

export const schema = generateSchema({
  datasource: {
    provider: "postgresql",
    url: process.env["DATABASE_URL"] as string,
  },
  models,
});
