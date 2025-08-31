const z = require("zod");

const createRideSchema = z.object({
  bookedBy: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "bookedBy field: Invalid ObjectId format. Must be a 24-character hexadecimal string"
    ),
  startLocation: z.object({
    type: z.string().default("Point"),
    coordinates: z
      .array(z.number())
      .length(
        2,
        "startLocation.coordinates field: Must contain exactly 2 numbers in format [longitude, latitude]"
      )
      .refine(
        ([lng, lat]) => lng >= -180 && lng <= 180,
        "startLocation.coordinates field: Longitude (first number) must be between -180 and 180 degrees"
      )
      .refine(
        ([lng, lat]) => lat >= -90 && lat <= 90,
        "startLocation.coordinates field: Latitude (second number) must be between -90 and 90 degrees"
      ),
  }),
  endLocation: z.object({
    type: z.string().default("Point"),
    coordinates: z
      .array(z.number())
      .length(
        2,
        "endLocation.coordinates field: Must contain exactly 2 numbers in format [longitude, latitude]"
      )
      .refine(
        ([lng, lat]) => lng >= -180 && lng <= 180,
        "endLocation.coordinates field: Longitude (first number) must be between -180 and 180 degrees"
      )
      .refine(
        ([lng, lat]) => lat >= -90 && lat <= 90,
        "endLocation.coordinates field: Latitude (second number) must be between -90 and 90 degrees"
      ),
  }),
  startLocationName: z
    .string()
    .min(
      1,
      "startLocationName field: Cannot be empty. Please provide a valid start location name"
    )
    .trim(),
  endLocationName: z
    .string()
    .min(
      1,
      "endLocationName field: Cannot be empty. Please provide a valid end location name"
    )
    .trim(),
  expectedPrice: z
    .number()
    .positive("expectedPrice field: Must be a positive number greater than 0"),
  expectedDistance: z
    .number()
    .positive(
      "expectedDistance field: Must be a positive number greater than 0 (in kilometers or miles)"
    ),
  expectedDuration: z
    .number()
    .positive(
      "expectedDuration field: Must be a positive number greater than 0 (in minutes)"
    ),
});

// Schema for accepting a ride
const acceptRideSchema = z.object({
  bookedBy: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "bookedBy field: Invalid ObjectId format. Must be a 24-character hexadecimal string"
    ),
  rider: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "rider field: Invalid ObjectId format. Must be a 24-character hexadecimal string"
    ),
  bookedFor: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "bookedFor field: Invalid ObjectId format. Must be a 24-character hexadecimal string"
    )
    .optional(),
  startLocation: z.object({
    type: z.string().default("Point"),
    coordinates: z
      .array(z.number())
      .length(
        2,
        "startLocation.coordinates field: Must contain exactly 2 numbers in format [longitude, latitude]"
      )
      .refine(
        ([lng, lat]) => lng >= -180 && lng <= 180,
        "startLocation.coordinates field: Longitude (first number) must be between -180 and 180 degrees"
      )
      .refine(
        ([lng, lat]) => lat >= -90 && lat <= 90,
        "startLocation.coordinates field: Latitude (second number) must be between -90 and 90 degrees"
      ),
  }),
  endLocation: z.object({
    type: z.string().default("Point"),
    coordinates: z
      .array(z.number())
      .length(
        2,
        "endLocation.coordinates field: Must contain exactly 2 numbers in format [longitude, latitude]"
      )
      .refine(
        ([lng, lat]) => lng >= -180 && lng <= 180,
        "endLocation.coordinates field: Longitude (first number) must be between -180 and 180 degrees"
      )
      .refine(
        ([lng, lat]) => lat >= -90 && lat <= 90,
        "endLocation.coordinates field: Latitude (second number) must be between -90 and 90 degrees"
      ),
  }),
  startLocationName: z
    .string()
    .min(
      1,
      "startLocationName field: Cannot be empty. Please provide a valid start location name"
    )
    .trim(),
  endLocationName: z
    .string()
    .min(
      1,
      "endLocationName field: Cannot be empty. Please provide a valid end location name"
    )
    .trim(),
  expectedPrice: z
    .number()
    .positive("expectedPrice field: Must be a positive number greater than 0"),
  expectedDistance: z
    .number()
    .positive(
      "expectedDistance field: Must be a positive number greater than 0 (in kilometers or miles)"
    ),
  expectedDuration: z
    .number()
    .positive(
      "expectedDuration field: Must be a positive number greater than 0 (in minutes)"
    ),
  isRideStarted: z.boolean().default(true),
  isRideAccepted: z.boolean().default(true),
});

const completeRideSchema = z.object({
  rideId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "rideId field: Invalid ObjectId format. Must be a 24-character hexadecimal string"
    ),
});

module.exports = {
  createRideSchema,
  acceptRideSchema,
  completeRideSchema,
};
