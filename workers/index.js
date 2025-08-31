const { Worker } = require("bullmq");
const rideQueue = require("../queues");
const sendNotification = require("../core-modules/send-notification");
const { getEnv } = require("../core-modules/read-env");

const worker = new Worker(
  "ride-queue",
  async (job) => {
    // console.log("==>RIDE", job);

    if (job.data.riders.length === 0) {
      console.log("==>No riders found");
      return;
    }

    const singleRider = job.data.riders.shift();
    const notifyrider = await sendNotification(singleRider, job.data.ride);
    if (job.data.riders.length) {
      await rideQueue.addToRideQueue(job.data, {
        delay: 15000,
      });
    }
  },
  {
    concurrency: 5,
    connection: {
      host: getEnv("redis_host"),
      port: getEnv("redis_port"),
    },
  }
);

module.exports = worker;
