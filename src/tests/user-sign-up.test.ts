import req from "supertest";
import http from "http";

import { app as MainApp } from "@root";
import { db } from "@utils";

describe("User sign up </api/v1/users>", () => {
  let app: req.SuperTest<req.Test>;
  let foo: http.Server;

  beforeEach(() => {
    db.$reset();
    foo = MainApp.listen();
    app = req(foo);
  });

  afterEach(() => {
    foo.close();
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

  it("should not create a new user if the name field is not present", async () => {
    const res = await app.post("/api/v1/users").send({
      email: "roseline@example.com",
      password: "superpassword",
    });

    expect(res.status).toBe(422);
    expect(res.body).toMatchObject({
      status: "fail",
      data: { name: "name is required" },
    });
  });

  it("should not create a new user if the name field is empty", async () => {
    const res = await app.post("/api/v1/users").send({
      email: "roseline@example.com",
      password: "superpassword",
      name: "",
    });

    expect(res.status).toBe(422);
    expect(res.body).toMatchObject({
      status: "fail",
      data: { name: "name is not allowed to be empty" },
    });
  });

  it("should not create a new user if the email field is not present", async () => {
    const res = await app.post("/api/v1/users").send({
      password: "superpassword",
      name: "Roseline",
    });

    expect(res.status).toBe(422);
    expect(res.body).toMatchObject({
      status: "fail",
      data: { email: "email is required" },
    });
  });

  it("should not create a new user if the email field is empty", async () => {
    const res = await app.post("/api/v1/users").send({
      email: "",
      password: "superpassword",
      name: "Roseline",
    });

    expect(res.status).toBe(422);
    expect(res.body).toMatchObject({
      status: "fail",
      data: { email: "email is not allowed to be empty" },
    });
  });

  it("should not create a new user if the email is invalid", async () => {
    const res = await app.post("/api/v1/users").send({
      email: "roseline@example",
      password: "superpassword",
      name: "Roseline",
    });

    expect(res.status).toBe(422);
    expect(res.body).toMatchObject({
      status: "fail",
      data: { email: "email must be a valid email" },
    });
  });
});
