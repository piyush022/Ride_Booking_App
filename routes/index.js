const express = require("express");
const coreRouter = express.Router();
const riderRouter = require("./riderRouter");
const rideRouter = require("./rideRoute");

coreRouter.use("/v1/rider", riderRouter);
coreRouter.use("/v1/ride", rideRouter);

module.exports = coreRouter;
