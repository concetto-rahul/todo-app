const dotenv = require("dotenv").config();

module.exports = {
  view_engine: process.env.VIEW_ENGINE,
  port: process.env.PORT,
  db: {
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    debug: false,
  },
  appAuthToken: process.env.APP_AUTH_TOKEN,
};
