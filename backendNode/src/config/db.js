const { db } = require("./index");
const mysql = require("mysql2");

const pool = mysql.createPool(db);

module.exports = pool.promise();
