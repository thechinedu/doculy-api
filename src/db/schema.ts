import { generateSchema } from "prisma-prime";

import * as models from "./models/index";

const { DATABASE_URL } = process.env;

export const schema = generateSchema({
  datasource: {
    provider: "postgresql",
    url: DATABASE_URL as string,
  },
  models,
});
