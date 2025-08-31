const mongoose = require("mongoose");

const riderSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  isOnline: { type: Boolean, default: false },
  isCurrentlyRiding: { type: Boolean, default: false },
});

const Rider = new mongoose.model("rider", riderSchema);

module.exports = Rider;
