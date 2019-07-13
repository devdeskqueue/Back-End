var request = require("supertest");

var server = require("../server.js");

const models = require("../data/models/index");

xdescribe("Testing auth", () => {
  describe("POST /register", function() {
    it("responds with json", function(done) {
      request(server)
        .post("/api/register")
        .send({ username: "asdf", password: "asdf" })
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
        .send({ username: "asdf", password: "asdf" })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});
