const redis = require("ioredis");
const mongoose = require("mongoose");
const { getEnv } = require("../core-modules/read-env");

mongoose
  .connect(getEnv("mongo_url"))
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const redisclient = new redis({
  host: "localhost",
  port: 6379,
});

redisclient.on("connect", () => {
  console.log("Connected to Redis");
});
redisclient.on("error", (err) => {
  console.log(err);
});

module.exports = redisclient;
