var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.send("Đã vào phương thức get");
});

module.exports = router;
