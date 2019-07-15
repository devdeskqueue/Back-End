const request = require("supertest");
const server = require("../server");
const db = require("../data/dbConfig");

beforeEach(() => db.migrate.latest());
afterEach(() => {
  db("Users").truncate();
});

describe("Registration and login endpoints", () => {
  describe("/register endpoint", () => {
    it("should return status 400 when password length is less than 8", async () => {
      const creds = {
        first_name: "Louis",
        last_name: "Magdaleno",
        email: "buildthatapp@gmail.com",
        password: "aS!dfgt"
      };
      const response = await request(server)
        .post("/register")
        .send(creds);
      expect(response.status).toBe(400);
    });
    it("should return status 400 when password does not contain an Uppercase letter", async () => {
      const creds = {
        first_name: "Louis",
        last_name: "Magdaleno",
        email: "buildthatapp@gmail.com",
        password: "as346!dfgt"
      };
      const response = await request(server)
        .post("/register")
        .send(creds);
      expect(response.status).toBe(400);
    });
    it("should return status 400 when password does not contain an Lowercase letter", async () => {
      const creds = {
        first_name: "Louis",
        last_name: "Magdaleno",
        email: "buildthatapp@gmail.com",
        password: "AS346!TRE"
      };
      const response = await request(server)
        .post("/register")
        .send(creds);
      expect(response.status).toBe(400);
    });
    it("should return status 400 when password does not contain a number", async () => {
      const creds = {
        first_name: "Louis",
        last_name: "Magdaleno",
        email: "buildthatapp@gmail.com",
        password: "ASsada!TRE"
      };
      const response = await request(server)
        .post("/register")
        .send(creds);
      expect(response.status).toBe(400);
    });
    it("should return status 400 when password does not contain a special character", async () => {
      const creds = {
        first_name: "Louis",
        last_name: "Magdaleno",
        email: "buildthatapp@gmail.com",
        password: "ASsada#TRE"
      };
      const response = await request(server)
        .post("/register")
        .send(creds);
      expect(response.status).toBe(400);
    });
    it("should return status 400 when invalid email is submitted", async () => {
      const creds = {
        first_name: "Louis",
        last_name: "Magdaleno",
        email: "buildthatapp@gmail.com",
        password: "ASs24ada#TRE"
      };
      const response = await request(server)
        .post("/register")
        .send(creds);
      expect(response.status).toBe(400);
    });
    it("should return status 400 when invalid email is submitted", async () => {
      const creds = {
        first_name: "Louis",
        last_name: "Magdaleno",
        email: "buildthatapp@@gmail.com",
        password: "ASs24ada#TRE"
      };
      const response = await request(server)
        .post("/register")
        .send(creds);
      expect(response.status).toBe(400);
    });
    it("should return status 500 missing password field", async () => {
      const creds = {
        first_name: "Louis",
        last_name: "Magdaleno",
        email: "buildthatapp@gmail.com"
      };
      const response = await request(server)
        .post("/register")
        .send(creds);
      expect(response.status).toBe(500);
    });
    it("should return status 500 missing email field", async () => {
      const creds = {
        first_name: "Louis",
        last_name: "Magdaleno",
        password: "jorgR2%com"
      };
      const response = await request(server)
        .post("/register")
        .send(creds);
      expect(response.status).toBe(500);
    });
    it("should return status 400 missing Firstname field", async () => {
      const creds = {
        last_name: "Magdaleno",
        email: "buildthatapp@gmail.com",
        password: "jorgR2%com"
      };
      const response = await request(server)
        .post("/register")
        .send(creds);
      expect(response.status).toBe(400);
    });
    it("should return status 400 missing Lastname field", async () => {
      const creds = {
        first_name: "Louis",
        email: "buildthatapp@gmail.com",
        password: "jorgR2%com"
      };
      const response = await request(server)
        .post("/register")
        .send(creds);
      expect(response.status).toBe(400);
    });
    it("should return status 201 when valid fields are submitted", async () => {
      const creds = {
        first_name: "Louis",
        last_name: "Magdaleno",
        email: "buildthatapp@gmail.com",
        password: "jorgR2%com"
      };
      const response = await request(server)
        .post("/register")
        .send(creds);
      expect(response.status).toBe(201);
    });
  });
});
