const { verify } = require("jsonwebtoken");
const { appAuthToken } = require("../config");
const { failedResponse } = require("../utility/responseFormate");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
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
