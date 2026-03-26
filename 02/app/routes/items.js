var express = require("express");
var router = express.Router();

const controllerName = "items";
const MainModel = require(__path_models + controllerName);

router.get("/", async (req, res) => {
  const data = await MainModel.listItems({}, { task: "all" });
  res.status(200).json({
    success: true,
    data: data,
  });
});

router.get("/:id", async (req, res) => {
  const data = await MainModel.listItems(
    { id: req.params.id },
    { task: "one" },
  );
  res.status(200).json({
    success: true,
    data: data,
  });
  res.send("Get one item with id: " + req.params.id);
});

router.post("/add", async (req, res) => {
  let params = [];
  params.id = makeId(5);
  params.name = req.body.name;
  params.status = req.body.status;

  const data = await MainModel.create(params);

  res.status(200).json({
    success: true,
    data: data,
  });

  res.send("Đã vào add item");
});

router.put("/edit/:id", (req, res) => {
  res.send("Đã vào edit item with id: " + req.params.id);
});

router.delete("/delete/:id", (req, res) => {
  res.send("Đã vào delete item with id: " + req.params.id);
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
