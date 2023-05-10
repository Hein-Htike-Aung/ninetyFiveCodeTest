"use strict";

const Sequelize = require("sequelize");
const db: any = {};

export let sequelize: any;

sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_CONNECTION,
  logging: false,
  retry: {
    match: [/Deadlock/i],
    max: 3, // Maximum rety 3 times
    backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
    backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
