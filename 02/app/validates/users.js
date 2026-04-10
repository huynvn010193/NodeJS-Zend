const util = require("util");

const notify = require(__path_configs + "notify");

const options = {
  username: { min: 3, max: 100 },
  email: { min: 1, max: 30 },
  password: { min: 4, max: 30 },
};

module.exports = {
  validator: (req, res, next) => {
    const username = String(req.body?.username || "").trim();
    const email = String(req.body?.email || "").trim();
    const password = String(req.body?.password || "").trim();

    const errors = [];
    let message = {};

    if (
      username.length <= options.username.min ||
      username.length >= options.username.max
    ) {
      errors.push({
        param: "username",
        msg: util.format(
          notify.ERROR_USERNAME,
          options.username.min,
          options.username.max,
        ),
        value: req.body?.username,
        location: "body",
      });
    }

    if (
      email.length <= options.email.min ||
      email.length >= options.email.max
    ) {
      errors.push({
        param: "email",
        msg: util.format(
          notify.ERROR_EMAIL,
          options.email.min,
          options.email.max,
        ),
        value: req.body?.email,
        location: "body",
      });
    }

    if (
      password.length <= options.password.min ||
      password.length >= options.password.max
    ) {
      errors.push({
        param: "password",
        msg: util.format(
          notify.ERROR_PASSWORD,
          options.password.min,
          options.password.max,
        ),
        value: req.body?.password,
        location: "body",
      });
    }

    errors.map((val, ind) => {
      message[val.param] = val.msg;
    });

    return message;
  },
};
