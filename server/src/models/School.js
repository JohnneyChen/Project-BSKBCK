const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  about: String,
  location: String,
  admission: String,
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;
