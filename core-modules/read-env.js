require("dotenv").config();

const env = {
  production: {
    port: process.env.DEV_PORT,
    mongo_url: process.env.PROD_MONGO_URL,
    redis_host: process.env.PROD_REDIS_HOST,
    redis_port: process.env.PROD_REDIS_PORT,
  },
  development: {
    port: process.env.PROD_PORT,
    mongo_url: process.env.DEV_MONGO_URL,
    redis_host: process.env.DEV_REDIS_HOST,
    redis_port: process.env.DEV_REDIS_PORT,
  },
};

function getEnv(key) {
  const environment =
    process.env.ENVIRONMENT === "production" ? "production" : "development";

  return env[environment][key];
}

module.exports = { getEnv };
