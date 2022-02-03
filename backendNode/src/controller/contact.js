const db = require("../config/db");
const { currentDateTime } = require("../utility/date");
const {
  failedResponse,
  successResponse,
} = require("../utility/responseFormate");

exports.create = async (req, res) => {
  const { name, phone, tokenData } = req.body;
  const userID = tokenData && tokenData.id;
  try {
    const [result] = await db.query(
      "insert into contacts (user_id,name,phone,add_date) values (?,?,?,?)",
      [userID, name, phone, currentDateTime]
    );
    const id = result.insertId;
    res.json(successResponse({ id, name, phone }));
  } catch (err) {
    res.json(failedResponse(err && err.message, 400));
  }
};

exports.update = async (req, res) => {
  const { id, name, phone, tokenData } = req.body;
  const userID = tokenData && tokenData.id;
  try {
    await db.query("update contacts set name=?,phone=? where id=?", [
      name,
      phone,
      id,
    ]);
    res.json(successResponse({ id, name, phone }));
  } catch (err) {
    res.json(failedResponse(err && err.message, 400));
  }
};

exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const userID = req.body && req.body.tokenData && req.body.tokenData.id;
  try {
    await db.query("delete from contacts where id=? and user_id=?", [
      id,
      userID,
    ]);
    res.json(successResponse({}));
  } catch (err) {
    res.json(failedResponse(err && err.message, 400));
  }
};

exports.getAll = async (req, res) => {
  const userID = req.body && req.body.tokenData && req.body.tokenData.id;
  try {
    const [result] = await db.query("select * from contacts where user_id=?", [
      userID,
    ]);
    res.json(successResponse(result));
  } catch (err) {
    res.json(failedResponse(err && err.message, 400));
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const userID = req.body && req.body.tokenData && req.body.tokenData.id;
  try {
    const [result] = await db.query(
      "select * from contacts where id=? and user_id=?",
      [id, userID]
    );
    if (result.length > 0) {
      res.json(successResponse(result[0]));
    } else {
      res.json(failedResponse("Data not found.", 200));
    }
  } catch (err) {
    res.json(failedResponse(err && err.message, 400));
  }
};
