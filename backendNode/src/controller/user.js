const db = require("../config/db");
const jwt = require("jsonwebtoken");

const { appAuthToken } = require("../config");
const { currentDateTime } = require("../utility/date");
const {
  failedResponse,
  successResponse,
} = require("../validator/responseFormate");

exports.login = async (req, res) => {
  const { name, phone } = req.body;
  try {
    const [result] = await db.query("select id from users where phone=?", [
      phone,
    ]);
    let id = result && result[0] && result[0].id;
    if (id) {
      await db.query("update users set name=? where id=?", [name, id]);
    } else {
      const [result] = await db.query(
        "insert into users (name,phone,register_date) values (?,?,?)",
        [name, phone, currentDateTime]
      );
      id = result.insertId;
    }
    res.json(getLoginResponse({ id, name, phone }));
  } catch (err) {
    res.json(failedResponse(err && err.message, 400));
  }
};

const getLoginResponse = (userData) => {
  const token = jwt.sign(userData, appAuthToken, { expiresIn: "2h" });
  return {
    status: true,
    statusCode: 200,
    error: "",
    data: {
      login_token: token,
      user_data: userData,
    },
  };
};

exports.profile = async (req, res) => {
  const { name, phone } = req.body;
  try {
    const [result] = await db.execute(
      "select id,phone from users where phone=?",
      [phone]
    );
    if (result.length > 0) {
      const userData = result[0];

      const [result] = await db.execute("update users set name=? where id=?", [
        name,
        userData.id,
      ]);
      res.json(getLoginResponse({ name, phone }));
    } else {
      const [result] = await db.execute(
        "insert into users (name,phone,login_status,login_date,register_date) values (?,?,?,?,?)",
        [name, phone, "online", currentDateTime, currentDateTime]
      );
      res.json(getLoginResponse({ name, phone }));
    }
  } catch (err) {
    res.json({
      status: false,
      statusCode: 400,
      error: err && err.message,
      data: [],
    });
  }
};

exports.profile = async (req, res) => {
  const { tokenData } = req.body;
  console.log(tokenData);
  try {
    const [result] = await db.execute(
      "select name,phone from users where id=?",
      [tokenData.id]
    );
    res.json(successResponse({ profileData: result[0] }));
  } catch (err) {
    res.json(failedResponse(err && err.message, 400));
  }
};

exports.refreshToken = async (req, res) => {
  const { tokenData } = req.body;
  try {
    const [result] = await db.execute(
      "select id,name,phone from users where id=?",
      [tokenData.id]
    );
    const userData = result[0];
    const token = jwt.sign(userData, appAuthToken, { expiresIn: "2h" });
    res.json(successResponse({ newToken: token }));
  } catch (err) {
    res.json(failedResponse(err && err.message, 400));
  }
};
