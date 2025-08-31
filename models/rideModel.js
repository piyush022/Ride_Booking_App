const mongoose = require("mongoose");

const rideSchema = mongoose.Schema({
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rider",
    required: true,
  },
  startLocation: {
    type: { type: String, required: true },
    coordinates: { type: [Number], required: true },
  },
  endLocation: {
    type: { type: String, required: true },
    coordinates: { type: [Number], required: true },
  },
  startLocationName: { type: String, required: true },
  endLocationName: { type: String, required: true },
  expectedPrice: { type: Number, required: true },
  expectedDistance: { type: Number, required: true },
  expectedDuration: { type: Number, required: true },
  isRideStarted: { type: Boolean, default: false },
  isRideCompleted: { type: Boolean, default: false },
  isRideCancelled: { type: Boolean, default: false },
  isRideAccepted: { type: Boolean, default: false },
});

const Ride = new mongoose.model("ride", rideSchema);

module.exports = Ride;
