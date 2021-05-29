const express = require("express");
const { body } = require("express-validator");

const validateReq = require("../../middleware/validateReq");
const School = require("../../models/School");

const router = express.Router();

router.post(
  "/schools",
  body("name").notEmpty().withMessage("name required"),
  body("image").notEmpty().withMessage("image required"),
  validateReq,
  async (req, res) => {
    const { name, image, location, about, admission } = req.body;

    const school = new School({ name, image, location, about, admission });

    await school.save();

    res.status(201).send(school);
  }
);

module.exports = router;
