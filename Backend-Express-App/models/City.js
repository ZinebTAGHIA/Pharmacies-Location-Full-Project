const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("City", citySchema);
