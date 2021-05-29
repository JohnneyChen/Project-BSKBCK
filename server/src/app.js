const express = require("express");
const { json } = require("body-parser");
require("express-async-errors");

const schoolIndexRouter = require("./routes/schools/index");
const schoolNewRouter = require("./routes/schools/new");
const schoolShowRouter = require("./routes/schools/show");
const schoolEditRouter = require("./routes/schools/edit");
const uploadRouter = require("./routes/upload");

const NotFoundError = require("./errors/NotFountError");
const RequestValidationError = require("./errors/RequestValidationError");

const app = express();

app.use(json());

app.use(schoolIndexRouter);
app.use(schoolNewRouter);
app.use(schoolShowRouter);
app.use(schoolEditRouter);
app.use(uploadRouter);

if (["production"].includes(process.env.NODE_ENV)) {
  const path = require("path");

  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.all("*", (req, res) => {
  throw new NotFoundError("route");
});

app.use((err, req, res, next) => {
  if (err instanceof RequestValidationError || err instanceof NotFoundError) {
    return res.status(err.statusCode).send(err.errors);
  }

  console.log(err);
  res.status(500).send(err);
});

module.exports = app;
