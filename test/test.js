var request = require("supertest");

var server = require("../server.js");

const models = require("../database/models/index");

describe("Testing auth", () => {
  describe("POST /register", function() {
    it("responds with json", function(done) {
      request(server)
        .post("/api/register")
        .send({ username: "test", password: "test" })
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
  describe("POST /login", () => {
    it("responds with json", function(done) {
      request(server)
        .post("/api/login")
        .send({ username: "test", password: "test" })
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
    describe("Delete TEST user", () => {
      it("successfully deletes test user", async function(done) {
        try {
          const userID = await models.findByUser("test", "users").id;

          const deleted = await models.remove(userID, "users");

          expect(deleted).toBe("success");
        } catch (err) {
          console.log(err);
        }
      });
    });
  });
});
