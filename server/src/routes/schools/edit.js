const express = require("express");
const { body } = require("express-validator");

const validateReq = require("../../middleware/validateReq");
const School = require("../../models/School");
const NotFoundError = require("../../errors/NotFountError");

const router = express.Router();

router.patch(
  "/schools/:id",
  body("name").notEmpty().withMessage("name required"),
  validateReq,
  async (req, res) => {
    const { id } = req.params;

    const { name, image, location, about, admission } = req.body;

    const school = await School.findById(id);

    if (!school) {
      throw new NotFoundError("record");
    }

    for (let key in req.body) {
      school[key] = req.body[key];
    }

    await school.save();

    res.status(200).send(school);
  }
);

module.exports = router;
