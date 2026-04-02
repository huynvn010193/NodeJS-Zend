const util = require("util");

const notify = require(__path_configs + "notify");

const options = {
  name: { min: 3, max: 100 },
};

module.exports = {
  validator: (req, res, next) => {
    const name = String(req.body?.name || "").trim();
    const errors = [];
    let message = {};

    if (name.length < options.name.min || name.length > options.name.max) {
      errors.push({
        param: "name",
        msg: util.format(notify.ERROR_NAME, options.name.min, options.name.max),
        value: req.body?.name,
        location: "body",
      });

      errors.map((val, ind) => {
        message[val.param] = val.msg;
      });
    }

    return message;
  },
};
