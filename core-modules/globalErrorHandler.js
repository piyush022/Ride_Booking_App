const globalErrorHandler = (err, req, res, next) => {
  console.error("🚨 Global Error Handler:", err);

  // Handle Zod validation errors
  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed - Please check the following fields:",
      errors: err.errors.map((error) => ({
        field: error.path.join(".") || "unknown",
        message: error.message,
        code: error.code,
        receivedValue: error.received,
        expectedType: error.expected,
      })),
      totalErrors: err.errors.length,
      timestamp: new Date().toISOString(),
    });
  }

  // Handle MongoDB validation errors
  if (err.name === "ValidationError") {
    const mongoErrors = Object.keys(err.errors).map((field) => ({
      field: field,
      message: err.errors[field].message,
      receivedValue: err.errors[field].value,
    }));

    return res.status(400).json({
      success: false,
      message: "Database validation failed:",
      errors: mongoErrors,
      totalErrors: mongoErrors.length,
      timestamp: new Date().toISOString(),
    });
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      message: "Duplicate entry found",
      error: {
        field: duplicateField,
        message: `${duplicateField} already exists in the database`,
        receivedValue: err.keyValue[duplicateField],
      },
      timestamp: new Date().toISOString(),
    });
  }

  // Handle Cast errors (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid data format",
      error: {
        field: err.path,
        message: `Invalid ${err.kind} for field '${err.path}'`,
        receivedValue: err.value,
      },
      timestamp: new Date().toISOString(),
    });
  }

  // Handle JWT errors (for future authentication)
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: {
        type: "Authentication Error",
        message: err.message,
      },
      timestamp: new Date().toISOString(),
    });
  }

  // Handle other known errors with status codes
  if (err.status || err.statusCode) {
    return res.status(err.status || err.statusCode).json({
      success: false,
      message: err.message || "An error occurred",
      timestamp: new Date().toISOString(),
    });
  }

  // Handle unknown/unexpected errors
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: {
      type: "Unknown Error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
    timestamp: new Date().toISOString(),
    requestId: req.headers["x-request-id"] || `req_${Date.now()}`,
  });
};

module.exports = globalErrorHandler;
