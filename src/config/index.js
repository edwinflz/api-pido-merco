require("dotenv").config();

const PRODUCTION = require("./production");
const DEVELOPMENT = require("./development");
const QA = require("./qa");
const { NODE_ENV } = process.env;

let currentEnv = DEVELOPMENT;

if (NODE_ENV === "production") {
  currentEnv = PRODUCTION;
} else if (NODE_ENV === "qa") {
  currentEnv = QA;
}



module.exports = {
  PORT: process.env.PORT,
  APPLICATION_NAME: process.env.APPLICATION_NAME,
  SECRET_KEY: process.env.SECRET_KEY,
  API_KEY: process.env.API_KEY,
  CACHE_KEY: process.env.CACHE_KEY,
  ...currentEnv
};
