import { PrismaClient } from "@prisma/client";
import { spawn } from "cross-spawn";
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
      console.log(`Resetting database for the test environment`);
      spawn("yarn", ["db:test:prepare"]);
    }
  };

  return client;
};

export default enhanceSingletonClient(prismaClient as EnhancedPrismaClient);
