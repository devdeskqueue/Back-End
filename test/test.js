var request = require("supertest");

var app = require("../server.js");

test("gets hello world from / ", async done => {
  const response = await request(app).get("/");
  expect(response.status).toBe(200);
  done();
});
