const request = require("supertest");

const School = require("../../../models/School");
const app = require("../../../app");

it("200s on GET to /api/schools", async () => {
  const response = await request(app).get("/api/schools").expect(200);
});

it("returns list of schools matching database records", async () => {
  await createSchool("school1");
  await createSchool("school2");
  await createSchool("school3");
  await createSchool("school4");

  const response = await request(app).get("/api/schools");

  expect(response.body.length).toEqual(4);
  expect(response.body[0].name).toEqual("school1");
});

const createSchool = async (name) => {
  const school = new School({ name, image: "placeholder" });

  await school.save();
};
