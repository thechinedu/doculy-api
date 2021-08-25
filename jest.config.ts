import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "@interfaces/(.*)": "<rootDir>/src/interfaces/$1",
    "@models/(.*)": "<rootDir>/src/models/$1",
    "@routes/(.*)": "<rootDir>/src/routes/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@utils": "<rootDir>/src/utils",
    "@validators/(.*)": "<rootDir>/src/validators/$1",
    "@root": "<rootDir>/src/index",
    "@serializers/(.*)": "<rootDir>/src/serializers/$1",
    "@serializers": "<rootDir>/src/serializers",
    "@test-utils": "<rootDir>/jest.setup",
  },
  globalSetup: "./jest.setup.ts",
  globalTeardown: "./jest.teardown.ts",
};

export default config;
