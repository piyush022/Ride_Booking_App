const z = require("zod");

const createRiderSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email format").toLowerCase(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

module.exports = { createRiderSchema };
