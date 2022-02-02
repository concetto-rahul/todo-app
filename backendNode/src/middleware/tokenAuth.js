const { verify } = require("jsonwebtoken");
const { appAuthToken } = require("../config");
const { failedResponse } = require("../validator/responseFormate");

module.exports = {
  checkToken: (req, res, next) => {
    const token = req.get("authorization").slice(7);
    if (token) {
      try {
        const tokenData = verify(token, appAuthToken);
        req.body.tokenData = tokenData;
        next();
      } catch (err) {
        res.json(failedResponse(err.message));
      }
    } else {
      res.json(failedResponse("Access denied! unauthorized user."));
    }
  },
};
