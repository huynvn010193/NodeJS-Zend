const mongoose = require("mongoose");
const { Schema } = mongoose;

const databaseConfig = require(__path_configs + "database");

const schema = new mongoose.Schema({
  username: String,
  email: String,
  role: String,
  password: String,
});

module.exports = mongoose.model(databaseConfig.col_users, schema);
