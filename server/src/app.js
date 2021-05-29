const express = require("express");
require("express-async-errors");
const { json } = require("body-parser");

const schoolIndexRouter = require("./routes/schools/index");

const NotFoundError = require("./errors/NotFountError");
const RequestValidationError = require("./errors/RequestValidationError");

const app = express();

app.use(json());

app.use(schoolIndexRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError("route");
});

app.use((err, req, res, next) => {
  if (err instanceof RequestValidationError || err instanceof NotFoundError) {
    return res.status(err.statusCode).send(err.errors);
  }
});

module.exports = app;
