const mongoose = require("mongoose");
const { Schema } = mongoose;

const pharmacySchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Latitude: {
    type: Number,
    required: true,
  },
  Longitude: {
    type: Number,
    required: true,
  },
  Garde: {
    type: String,
    required: true,
  },
  Zone_id: {
    type: Schema.Types.ObjectId,
    ref: "Zone",
    required: true,
  },
});

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);

module.exports = Pharmacy;
