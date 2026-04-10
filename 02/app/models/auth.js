const MainModel = require(__path_schemas + "users");

module.exports = {
  register: async (item) => {
    const user = await MainModel(item).save();
    return user.getSignedJWT();
  },
};
