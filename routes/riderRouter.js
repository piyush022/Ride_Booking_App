const express = require("express");
const router = express.Router();
const RiderModel = require("../models/rider-model");
const { createRiderSchema } = require("../zodSchemas/riderSchema");

router.post("/create-rider", async (req, resp) => {
  const validatedData = createRiderSchema.safeParse(req.body);
  if (!validatedData.success) {
    return resp.status(400).json({
      message: "Invalid data",
      error: validatedData.error.message,
    });
  }

  const rider = new RiderModel({
    ...validatedData.data,
  });
  await rider.save();
  resp.status(200).json({
    message: "Rider created successfully",
    data: rider,
  });
});

module.exports = router;
