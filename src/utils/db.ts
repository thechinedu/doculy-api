import { PrismaClient } from "@prisma/client";
import { sync } from "cross-spawn";
interface EnhancedPrismaClient extends PrismaClient {
  $reset: () => void;
}

const prismaClient = new PrismaClient();

const enhanceSingletonClient = (
  client: EnhancedPrismaClient
): EnhancedPrismaClient => {
  const { NODE_ENV } = process.env;

  client.$reset = () => {
    if (NODE_ENV === "test") {
      sync("yarn", ["db:test:reset"]);
    }
  };

  return client;
};

export default enhanceSingletonClient(prismaClient as EnhancedPrismaClient);
