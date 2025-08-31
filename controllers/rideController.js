const {
  createRideSchema,
  acceptRideSchema,
  completeRideSchema,
} = require("../zodSchemas/rideSchema");
const RiderModel = require("../models/rider-model");
const rideQueue = require("../queues");
const RideModel = require("../models/rideModel");
const asyncErrorHandler = require("../core-modules/errorHandler");
const z = require("zod");
const rideService = require("../services/rideService");

const createRide = asyncErrorHandler(async (req, resp) => {
  const validatedData = createRideSchema.safeParse(req.body);
  if (!validatedData.success) {
    return resp.status(400).json({
      message: "Invalid data",
      error: validatedData.error.message,
    });
  }

  const checkUserAlreadyHasActiveRideRequest =
    await rideQueue.checkActiveRideRequestUser(validatedData.data.bookedBy);
  if (checkUserAlreadyHasActiveRideRequest) {
    return resp.status(200).json({
      message: "User already has an active ride request",
    });
  }

  const riders = await rideService.getAvailableRiders();

  if (riders.length) {
    await rideService.addRideToQueue(rideQueue, validatedData, riders);
    resp.status(200).json({
      message: "Ride Initiated contacting riders",
    });
  } else {
    resp.status(400).json({
      message: "No riders found",
    });
  }
});

const acceptRide = asyncErrorHandler(async (req, resp) => {
  const validatedData = acceptRideSchema.safeParse(req.body);
  if (!validatedData.success) {
    return resp.status(400).json({
      message: "Invalid data",
      errors: validatedData.error.errors,
    });
  }

  const { bookedBy, rider } = validatedData.data;
  // Check if there are any active notification jobs for this ride
  const waitingJobs = await rideQueue.getJobs();
  const hasActiveRide = waitingJobs.some(
    (job) => job.data.ride && job.data.ride.bookedBy === bookedBy
  );

  if (!hasActiveRide) {
    return resp.status(400).json({
      success: false,
      message: "This ride is no longer available",
      error: {
        type: "RIDE_NOT_AVAILABLE",
        message:
          "The ride may have been canceled by the user or accepted by another rider",
      },
    });
  }

  const result = await rideQueue.cancelRideJobs(bookedBy);

  await RiderModel.findByIdAndUpdate(rider, {
    isCurrentlyRiding: true,
  });

  const ride = new RideModel({
    ...validatedData.data,
  });

  await ride.save();

  resp.status(200).json({
    message: "Ride accepted successfully",
    data: {
      ride: ride,
      jobsCanceled: result.canceledJobs,
    },
  });
});

const completeRide = asyncErrorHandler(async (req, resp) => {
  const validatedData = completeRideSchema.safeParse(req.body);
  if (!validatedData.success) {
    return resp.status(400).json({
      message: "Invalid data",
      errors: validatedData.error.errors,
    });
  }

  const { rideId } = validatedData.data;

  const ride = await RideModel.findByIdAndUpdate(rideId, {
    isRideCompleted: true,
  });

  await RiderModel.findByIdAndUpdate(ride.rider, {
    isCurrentlyRiding: false,
  });

  resp.status(200).json({
    message: "Ride completed successfully",
  });
});

const cancelRide = asyncErrorHandler(async (req, resp) => {
  const cancelRideSchema = z.object({
    bookedBy: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
    reason: z.string().optional(),
  });

  const validatedData = cancelRideSchema.safeParse(req.body);
  if (!validatedData.success) {
    return resp.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validatedData.error.errors,
    });
  }

  const { bookedBy, reason } = validatedData.data;

  // Only cancel pending notification jobs
  const result = await rideQueue.cancelRideJobs(bookedBy);

  resp.status(200).json({
    success: true,
    message: "Ride canceled successfully",
    data: {
      jobsCanceled: result.canceledJobs,
      reason: reason || "User canceled",
    },
  });
});

module.exports = { createRide, acceptRide, completeRide, cancelRide };
