const { Queue } = require("bullmq");
const { getEnv } = require("../core-modules/read-env");

class RideQueue {
  constructor() {
    this.queue = new Queue("ride-queue", {
      connection: {
        host: getEnv("redis_host"),
        port: getEnv("redis_port"),
      },
      defaultJobOptions: {
        removeOnComplete: 10, // Keep only last 10 completed jobs
        removeOnFail: 5, // Keep only last 5 failed jobs
        ttl: 300000, // Job expires after 5 minutes if not processed
      },
    });
  }
  async addToRideQueue(data, options) {
    await this.queue.add("ride-queue", data, options);
  }

  async removeFromRideQueue(jobid) {
    const job = await this.queue.getJob(jobid);
    if (job) {
      await job.remove();
      return true;
    }

    return false;
  }

  async cancelRideJobs(bookedBy) {
    try {
      const waitingJobs = await this.queue.getJobs(["waiting", "delayed"]);
      let canceledCount = 0;

      for (const job of waitingJobs) {
        if (job.data.ride && job.data.ride.bookedBy === bookedBy) {
          await job.remove();
          canceledCount++;
          console.log(`==> Canceled job ${job.id}`);
        }
      }

      return { success: true, canceledJobs: canceledCount };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getJobs() {
    const jobs = await this.queue.getJobs(["waiting", "delayed"]);
    return jobs;
  }

  async getQueue() {
    return this.queue;
  }

  async checkActiveRideRequestUser(bookedBy) {
    const jobs = await this.queue.getJobs(["waiting", "delayed", "active"]);
    if (jobs.length) {
      return true;
    }

    return false;
  }
}

const obj = new RideQueue();

module.exports = obj;
