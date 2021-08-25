import { req } from "@test-utils";

describe("root path", () => {
  it("should respond with a 200 status code", async () => {
    const res = await req.get("/");

    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello from the doculy api!");
  });

  it("should respond with json", async () => {
    const res = await req.get("/");

    expect(res.headers["content-type"]).toContain("application/json");
  });
});
