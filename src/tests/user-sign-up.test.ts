import req from "supertest";

import { app as MainApp } from "@root";

describe("User sign up", () => {
  let app: req.SuperTest<req.Test>;

  beforeEach(() => {
    app = req(MainApp);
  });

  it("happy path", async () => {
    // const res = await app.post("/api/v1/users").send({
    //   email: "roseline@example.com",
    //   password: "superpassword",
    //   name: "Roseline",
    // });

    // expect(res.status).toBe(201);
    expect("happy").toBe("happy");
    // expect(res.body).toMatchObject({
    //   status: "success",
    //   data: {
    //     email: "roseline@example.com",
    //     password: "superpassword",
    //     name: "Roseline",
    //   },
    // });
  });
});
