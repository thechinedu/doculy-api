import req from "supertest";

import { app as MainApp } from "@root";
import { db } from "@utils";

describe("User sign up </api/v1/users>", () => {
  let app: req.SuperTest<req.Test>;

  beforeEach(() => {
    db.$reset();
    app = req(MainApp);
  });

  it("should create a new user when all required fields are provided and correct", async () => {
    const res = await app.post("/api/v1/users").send({
      email: "roseline@example.com",
      password: "superpassword",
      name: "Roseline",
    });
    // For matching date strings such as "2018-01-01T00:00:00.000Z"
    const dateStrRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

    expect("2018-01-01T00:00:00.000Z").toMatch(dateStrRegex);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      status: "success",
      data: {
        user: {
          id: expect.any(Number),
          email: "roseline@example.com",
          name: "Roseline",
          createdAt: expect.stringMatching(dateStrRegex),
          updatedAt: expect.stringMatching(dateStrRegex),
        },
      },
    });
  });
});
