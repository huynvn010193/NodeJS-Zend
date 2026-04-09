const mongoose = require("mongoose");

const databaseConfig = require(__path_configs + "database");

const schema = new mongoose.Schema({
  name: String,
  title: String,
  like: Number,
  dislike: Number,
});

module.exports = mongoose.model(databaseConfig.col_careers, schema);
