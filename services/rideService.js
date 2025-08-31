const RiderModel = require("../models/rider-model");

class RideService {
  async getAvailableRiders() {
    const getRiders = await RiderModel.find({
      isActive: true,
      isDeleted: false,
      isCurrentlyRiding: false,
    }).select("_id name email");

    return getRiders;
  }

  async addRideToQueue(rideQueue, validatedData, getRiders) {
    await rideQueue.addToRideQueue({
      ride: validatedData.data,
      riders: getRiders,
    });
  }
}

module.exports = new RideService();
