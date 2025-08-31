require("./connection/connection");
require("./workers");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const { getEnv } = require("./core-modules/read-env");
const coreRouter = require("./routes");
const globalErrorHandler = require("./core-modules/globalErrorHandler");

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

//core-router
app.use("/api", coreRouter);

// 404 Error Handler
app.use((req, resp) => {
  resp.status(404).json({
    message: "The route you were looking was not found",
    success: false,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  globalErrorHandler(err, req, res, next);
});

app.listen(getEnv("port") || 7071, () => {
  console.log(`Server is running on port ${getEnv("port")}`);
});
