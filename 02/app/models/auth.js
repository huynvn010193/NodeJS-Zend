const MainModel = require(__path_schemas + "users");

module.exports = {
  register: async (item) => {
    const user = await MainModel(item).save();
    return user.getSignedJWT();
  },
  login: async (item, res) => {
    const { email, password } = item;
    const result = await MainModel.findByCredentials(email, password);
    console.log("result", result);
    if (result.err) {
      res.status(401).json({
        success: false,
        error: result.err,
      });
    }
    console.log("user", result.user);
  },
};
