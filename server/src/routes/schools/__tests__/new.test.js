const request = require("supertest");

const School = require("../../../models/School");
const app = require("../../../app");

it("400s when input is invalid", async () => {
  const res = await request(app).post("/api/schools").send({}).expect(400);

  expect(res.body.length).toEqual(2);
  expect(res.body[0].message).toEqual("name required");
  expect(res.body[1].message).toEqual("image required");
});

it("201s on successful save and returns new school", async () => {
  const res = await request(app)
    .post("/api/schools")
    .send({ name: "test", image: "placeholder" })
    .expect(201);

  const school = await School.find({});

  expect(school.length).toEqual(1);
  expect(school[0].name).toEqual("test");
  expect(school[0].image).toEqual("placeholder");
  expect(school[0]._id.toString()).toEqual(res.body._id);

  expect(res.body.name).toEqual("test");
  expect(res.body.image).toEqual("placeholder");
});

it("201s on successful save with additional info and returns new school", async () => {
  const res = await request(app)
    .post("/api/schools")
    .send({
      name: "test",
      image: "placeholder",
      location: "someplace",
      admission: "some rule",
      about: "some description",
    })
    .expect(201);

  const school = await School.find({});

  expect(school.length).toEqual(1);
  expect(school[0].name).toEqual("test");
  expect(school[0].image).toEqual("placeholder");
  expect(school[0].location).toEqual("someplace");
  expect(school[0].admission).toEqual("some rule");
  expect(school[0].about).toEqual("some description");
  expect(school[0]._id.toString()).toEqual(res.body._id);

  expect(res.body.name).toEqual("test");
  expect(res.body.image).toEqual("placeholder");
  expect(res.body.location).toEqual("someplace");
  expect(res.body.admission).toEqual("some rule");
  expect(res.body.about).toEqual("some description");
});
