const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const User = require("../models/user");

describe("on attempt to create invalid user", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("user is not created in the db", async () => {
    const usersInitiallyInDb = await helper.usersInDb();

    const invalidUser = {
      username: "Ja",
      password: "1234",
    };

    await api.post("/api/users").send(invalidUser).expect(400);

    const usersAfterRequest = await helper.usersInDb();

    expect(usersAfterRequest).toHaveLength(usersInitiallyInDb.length);
  });

  test("return correct status code and error message", async () => {
    const invalidUser = {
      username: "jack",
      password: "1",
      name: "Jack Daniels",
    };

    const response = await api.post("/api/users").send(invalidUser).expect(400);

    expect(response.body).toHaveProperty("error");
    expect(typeof response.body.error).toBe("string");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
