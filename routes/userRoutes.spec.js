const request = require("supertest");

const db = require("../data/dbConfig");
const server = require("../server");

describe("Users endpoint testing", () => {
  // Clean up database after each test
  afterEach(async () => {
    await db("Users").truncate();
  });

  describe("GET /api/users", () => {
    // Seed with test data
    const testData = [
      {
        first_name: "Louis",
        last_name: `Magdaleno`,
        email: `louis@test.com`,
        password: "password"
      },
      {
        first_name: "Gannon",
        last_name: `Darcy`,
        email: `gannon@test.com`,
        password: "password"
      },
      {
        first_name: "Made",
        last_name: `Up`,
        email: `made@test.com`,
        password: "password"
      },
      {
        first_name: "Test",
        last_name: `Me`,
        email: `me@test.com`,
        password: "password"
      }
    ];

    beforeEach(async () => {
      await db("Users").insert(testData);
    });

    it("should returns status code 200", async () => {
      const res = await request(server).get("/api/users");
      expect(res.status).toBe(200);
    });

    it("should return all users in test database", async () => {
      const res = await request(server).get("/api/users");
      expect(res.body.length).toEqual(testData.length);
    });
  });

  describe("GET /users/:id", () => {
    // Seed with test data
    const testData = [
      {
        first_name: "Louis",
        last_name: `Magdaleno`,
        email: `louis@test.com`,
        password: "password"
      },
      {
        first_name: "Gannon",
        last_name: `Darcy`,
        email: `gannon@test.com`,
        password: "password"
      },
      {
        first_name: "Made",
        last_name: `Up`,
        email: `made@test.com`,
        password: "password"
      },
      {
        first_name: "Test",
        last_name: `Me`,
        email: `me@test.com`,
        password: "password"
      }
    ];

    beforeEach(async () => {
      await db("Users").insert(testData);
    });

    it("/api/users/:id return user by id", async () => {
      const id = 2;
      const res = await request(server).get(`/api/users/${id}`);
      expect(res.status).toBe(200);
      expect(res.body.email).toBe(testData[id - 1].email);
    });

    it("return 404 status code for missing record", async () => {
      const id = 9999;
      const res = await request(server).get(`/api/users/${id}`);
      expect(res.status).toBe(404);
    });
  });

  describe("POST /api/register", () => {
    const testData = {
      first_name: "Louis",
      last_name: "Magdaleno",
      email: "testme@test.com",
      password: "test1234"
    };

    it("will receive status code that record was created", async () => {
      const res = await request(server)
        .post("/api/register")
        .send(testData);
      expect(res.status).toBe(201);
    });

    it("should receive the new user", async () => {
      const res = await request(server)
        .post("/api/users")
        .send(testData);
      expect(res.body.id).toBe(1);
      expect(res.body.email).toBe(testData.email);
      expect(res.body.last_name).toBe(testData.last_name);
    });
  });
});
