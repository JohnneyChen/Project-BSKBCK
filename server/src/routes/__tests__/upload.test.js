const request = require("supertest");

const app = require("../../app");

it("400s with no doc type", async () => {
  const response = await request(app).get("/api/upload").expect(400);
});

it("200s and returns new file name and url", async () => {
  const response = await request(app)
    .get("/api/upload")
    .query({ fileType: "image/jpeg" })
    .expect(200);

  expect(response.body.key).toBeDefined();
  expect(response.body.url).toBeDefined();
});
