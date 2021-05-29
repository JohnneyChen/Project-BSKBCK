const request = require("supertest");
const mongoose = require("mongoose");

const School = require("../../../models/School");
const app = require("../../../app");

it("400s when input is invalid", async () => {
  const res = await request(app).patch("/schools/asdio").send({}).expect(400);

  expect(res.body.length).toEqual(1);
  expect(res.body[0].message).toEqual("name required");
});

it("404s on PATCH to not found record", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .patch(`/schools/${id}`)
    .send({
      name: "test",
      image: "placeholder",
      location: "someplace",
      admission: "some rule",
      about: "some description",
    })
    .expect(404);
});

it("200s on successful save and returns new school", async () => {
  const id = await createSchool("school1");

  const response = await request(app)
    .patch(`/schools/${id}`)
    .send({
      name: "test",
      image: "placeholder",
      location: "someplace",
      admission: "some rule",
      about: "some description",
    })
    .expect(200);

  const school = await School.findById(id);

  expect(school.name).toEqual("test");
  expect(school.image).toEqual("placeholder");
  expect(school.location).toEqual("someplace");
  expect(school.admission).toEqual("some rule");
  expect(school.about).toEqual("some description");
  expect(school._id.toString()).toEqual(response.body._id);

  expect(response.body.name).toEqual("test");
  expect(response.body.image).toEqual("placeholder");
  expect(response.body.location).toEqual("someplace");
  expect(response.body.admission).toEqual("some rule");
  expect(response.body.about).toEqual("some description");
});

const createSchool = async (name) => {
  const school = new School({ name, image: "placeholder" });

  await school.save();

  return school._id.toString();
};
