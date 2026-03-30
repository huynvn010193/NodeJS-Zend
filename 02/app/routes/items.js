var express = require("express");
var router = express.Router();

const controllerName = "items";
const MainModel = require(__path_models + controllerName);

router.get("/", async (req, res) => {
  try {
    let params = [];
    params.keyword = req.query.keyword;
    params.sortField = req.query.orderBy;
    params.sortType = req.query.orderDir;

    const data = await MainModel.listItems(params, { task: "all" });
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await MainModel.listItems(
      { id: req.params.id },
      { task: "one" },
    );
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/add", async (req, res) => {
  let params = [];
  params.id = makeId(5);
  params.name = req.body.name;
  params.status = req.body.status;

  try {
    const data = await MainModel.create(params);
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const data = await MainModel.editItem(
      { id: req.params.id, body: req.body },
      { task: "edit" },
    );
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const data = await MainModel.deleteItem(
      { id: req.params.id },
      { task: "one" },
    );
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

makeId = (number) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < number; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

module.exports = router;
