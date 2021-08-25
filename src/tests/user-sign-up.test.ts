import { req } from "@test-utils";
import { db } from "@utils";

describe("User sign up - POST </api/v1/users>", () => {
  beforeEach(() => {
    db.$reset();
  });

  it("should create a new user when all required fields are provided and correct", async () => {
    const res = await req.post("/api/v1/users", {
      email: "roseline@example.com",
      password: "superpassword",
      name: "Roseline",
    });

    // For matching date strings such as "2018-01-01T00:00:00.000Z"
    const dateStrRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

    expect(res.status).toBe(201);
    expect(res.data).toMatchObject({
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
    const res = await req.post("/api/v1/users", {
      email: "roseline@example.com",
      password: "superpassword",
    });

    expect(res.status).toBe(422);
    expect(res.data).toMatchObject({
      status: "fail",
      data: { name: "name is required" },
    });
  });

  it("should not create a new user if the name field is empty", async () => {
    const res = await req.post("/api/v1/users", {
      email: "roseline@example.com",
      password: "superpassword",
      name: "",
    });

    expect(res.status).toBe(422);
    expect(res.data).toMatchObject({
      status: "fail",
      data: { name: "name is not allowed to be empty" },
    });
  });

  it("should not create a new user if the email field is not present", async () => {
    const res = await req.post("/api/v1/users", {
      password: "superpassword",
      name: "Roseline",
    });

    expect(res.status).toBe(422);
    expect(res.data).toMatchObject({
      status: "fail",
      data: { email: "email is required" },
    });
  });

  it("should not create a new user if the email field is empty", async () => {
    const res = await req.post("/api/v1/users", {
      email: "",
      password: "superpassword",
      name: "Roseline",
    });

    expect(res.status).toBe(422);
    expect(res.data).toMatchObject({
      status: "fail",
      data: { email: "email is not allowed to be empty" },
    });
  });

  it("should not create a new user if the email is invalid", async () => {
    const res = await req.post("/api/v1/users", {
      email: "roseline@example",
      password: "superpassword",
      name: "Roseline",
    });

    expect(res.status).toBe(422);
    expect(res.data).toMatchObject({
      status: "fail",
      data: { email: "email must be a valid email" },
    });
  });

  it("should not create a new user if the password field is not present", async () => {
    const res = await req.post("/api/v1/users", {
      email: "roseline@example.com",
      name: "Roseline",
    });

    expect(res.status).toBe(422);
    expect(res.data).toMatchObject({
      status: "fail",
      data: { password: "password is required" },
    });
  });

  it("should not create a new user if the password is less than 8 characters", async () => {
    const res = await req.post("/api/v1/users", {
      email: "roseline@example.com",
      password: "super",
      name: "Roseline",
    });

    expect(res.status).toBe(422);
    expect(res.data).toMatchObject({
      status: "fail",
      data: { password: "password length must be at least 8 characters long" },
    });
  });
});
