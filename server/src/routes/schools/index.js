const express = require("express");

const School = require("../../models/School");

const router = express.Router();

router.get("/api/schools", async (req, res) => {
  const schools = await School.find({});

  res.send(schools);
});

module.exports = router;
