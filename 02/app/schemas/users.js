const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const databaseConfig = require(__path_configs + "database");

const schema = new mongoose.Schema({
  username: String,
  email: String,
  role: String,
  password: String,
});

schema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model(databaseConfig.col_users, schema);
