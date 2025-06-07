const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  company: { type: String, required: true, default: "" },
  offer: { type: String, required: true, default: "" },
  details: { type: String, default: "" },
  expiry: { type: String, default: "" },
  category: { type: String, default: "Others" },
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
