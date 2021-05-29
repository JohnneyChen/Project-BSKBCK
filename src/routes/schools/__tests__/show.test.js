const request = require("supertest");
const mongoose = require("mongoose");

const School = require("../../../models/School");
const app = require("../../../app");

it("404s on GET to not found record", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const response = await request(app).get(`/api/schools/${id}`).expect(404);
});

it("200s and returns fetched record", async () => {
  const id = await createSchool("school1");
  await createSchool("school2");
  await createSchool("school3");
  await createSchool("school4");

  const response = await request(app).get(`/api/schools/${id}`);

  expect(response.body.name).toEqual("school1");
});

const createSchool = async (name) => {
  const school = new School({ name, image: "placeholder" });

  await school.save();

  return school._id.toString();
};
