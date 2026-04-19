const MainModel = require(__path_schemas + "users");
const sendEmail = require("./../utils/sendEmail");

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

    // TODO: create reset url
    const resetURL = `/api/v1/resetPassword/${resetToken}`;
    const message = `Truy cập vào đường dẫn sau đổi password: \n\n ${resetURL}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Thay đổi password",
        message,
      });
      return "Vui lòng check email";
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return "Không thể gửi email, vui lòng thử lại";
    }

    return resetToken;
  },
};
