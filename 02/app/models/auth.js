const MainModel = require(__path_schemas + "users");

module.exports = {
  register: async (item) => {
    const user = await MainModel(item).save();
    return user.getSignedJWT();
  },
  login: async (item, res) => {
    const { email, password } = item;
    const result = await MainModel.findByCredentials(email, password);
    if (result.err) {
      res.status(401).json({
        success: true,
        error: result.err,
      });
      return false;
    }
    return result.user.getSignedJWT();
  },
  forgotPassword: async (item) => {
    const user = await MainModel.findOne({ email: item.email });
    if (!user) {
      return false;
    }
    const resetToken = user.resetPassword();
    await user.save();
    return resetToken;
  },
};
