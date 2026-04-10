var express = require("express");
var router = express.Router();
var asyncHandler = require("../middleware/async");

const controllerName = "auth";
const MainModel = require(__path_models + controllerName);
const MainValidate = require(__path_validates + controllerName);
const ErrorResponse = require("../utils/ErrorResponse");

router.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    let err = await validateReq(req, res, next);
    if (!err) {
      const data = await MainModel.register(req.body);
      res.status(201).json({
        success: true,
        data: data,
      });
    }
  }),
);

const validateReq = async (req, res, next) => {
  let err = await MainValidate.validator(req);
  if (Object.keys(err).length > 0) {
    next(new ErrorResponse(400, err));
    return true;
  }
  return false;
};

module.exports = router;
