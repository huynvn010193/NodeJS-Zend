const MainModel = require(__path_schemas + "users");

module.exports = {
  register: async (item) => {
    const user = await MainModel(item).save();
    return user.getSignedJWT();
  },
  login: async (item) => {
    const { email, password } = item;
    const result = await MainModel.findByCredentials(email, password);
  },
};
