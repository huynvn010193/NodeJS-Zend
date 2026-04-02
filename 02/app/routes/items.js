var express = require("express");
var router = express.Router();
var asyncHandler = require("../middleware/async");

const controllerName = "items";
const MainModel = require(__path_models + controllerName);
const MainValidate = require(__path_validates + controllerName);
const ErrorResponse = require("../utils/ErrorResponse");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    let params = [];
    params.keyword = req.query.keyword;
    params.sortField = req.query.orderBy;
    params.sortType = req.query.orderDir;

    const data = await MainModel.listItems(params, { task: "all" });
    res.status(200).json({
      success: true,
      data: data,
    });
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const data = await MainModel.listItems(
      { id: req.params.id },
      { task: "one" },
    );
    res.status(200).json({
      success: true,
      data: data,
    });
  }),
);

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    let err = await MainValidate.validator(req);
    if (err) {
      console.log(err);
      res.send(new ErrorResponse(400, err));
      return;
    }
    const data = await MainModel.create(req.body);
    res.status(201).json({
      success: true,
      data: data,
    });
  }),
);

router.put(
  "/edit/:id",
  asyncHandler(async (req, res) => {
    const data = await MainModel.editItem(
      { id: req.params.id, body: req.body },
      { task: "edit" },
    );
    res.status(200).json({
      success: true,
      data: data,
    });
  }),
);

router.delete(
  "/delete/:id",
  asyncHandler(async (req, res) => {
    const data = await MainModel.deleteItem(
      { id: req.params.id },
      { task: "one" },
    );
    res.status(200).json({
      success: true,
      data: data,
    });
  }),
);

module.exports = router;
