const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const databaseConfig = require(__path_configs + "database");
const systemConfig = require(__path_configs + "system");

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

schema.methods.getSignedJWT = function () {
  return jwt.sign({ id: this._id }, systemConfig.JWT_SECRET, {
    expiresIn: systemConfig.JWT_EXP,
  });
};

module.exports = mongoose.model(databaseConfig.col_users, schema);
