const moment = require("moment");

exports.currentDateTime = moment().format("YYYY-DD-MM HH:mm:ss");

exports.currentDate = moment().format("YYYY-DD-MM");
