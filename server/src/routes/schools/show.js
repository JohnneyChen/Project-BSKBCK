const express = require("express");

const School = require("../../models/School");
const NotFoundError = require("../../errors/NotFountError");

const router = express.Router();

router.get("/schools/:id", async (req, res) => {
  const { id } = req.params;

  const school = await School.findById(id);

  if (!school) {
    throw new NotFoundError("record");
  }

  res.send(school);
});

module.exports = router;
