import req from "supertest";

import { app as MainApp } from "./";

describe("root path", () => {
  let app: req.SuperTest<req.Test>;

  beforeEach(() => {
    app = req(MainApp);
  });

  it("should respond with a 200 status code", async () => {
    const res = await app.get("/");

    expect(res.statusCode).toBe(200);
  });

  it("should respond with json", async () => {
    const res = await app.get("/");

    expect(res.type).toBe("application/json");
  });
});
