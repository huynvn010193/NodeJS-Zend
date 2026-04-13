const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const databaseConfig = require(__path_configs + "database");
const systemConfig = require(__path_configs + "system");
const notify = require(__path_configs + "notify");

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

schema.statics.findByCredentials = async function (email, password) {
  let err = "";

  // TODO: check empty
  if (!email || !password) {
    return { err: notify.ERROR_EMAIL_PASSWORD_NOT_EMPTY };
  }

  // TODO: check user
  const user = await this.findOne({ email: email });
  if (!user) {
    return { err: notify.ERROR_EMAIL_PASSWORD };
  }

  // TODO: check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { err: notify.ERROR_EMAIL_PASSWORD };
  }
  return { user };
};

module.exports = mongoose.model(databaseConfig.col_users, schema);
