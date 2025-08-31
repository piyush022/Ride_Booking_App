const express = require("express");
const router = express.Router();
const {
  createRide,
  acceptRide,
  completeRide,
  cancelRide,
} = require("../controllers/rideController");

router.post("/create-ride", createRide);

router.post("/accept-ride", acceptRide);

router.post("/complete-ride", completeRide);

router.post("/cancel-ride", cancelRide);

module.exports = router;
