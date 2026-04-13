const asyncHandler = require("./async");
var ErrorResponse = require("../utils/ErrorResponse");
const notify = require(__path_configs + "notify");
const systemConfig = require(__path_configs + "system");

var jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(new ErrorResponse(401, notify.ERROR_LOGIN_USED));
    }

    // TODO: decode token
    try {
      const decoded = jwt.verify(token, systemConfig.JWT_SECRET);
      next();
    } catch (error) {
      return next(new ErrorResponse(401, notify.ERROR_LOGIN_USED));
    }
  }
});

module.exports = protect;
