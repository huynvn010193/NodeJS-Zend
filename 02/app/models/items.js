const MainModel = require(__path_schemas + "items");

module.exports = {
  listItems: async (params, options) => {
    if (options.task === "all") {
      return await MainModel.find({}).select("id name status");
    }
    if (options.task === "one") {
      return await MainModel.find({ id: params.id }).select("id name status");
    }
  },
  create: async (item) => {
    return await MainModel(item).save();
  },
  editItem: async (params, options) => {
    if (options.task === "edit") {
      return await MainModel.updateOne({ id: params.id }, params.body);
    }
  },
  deleteItem: async (params, options) => {
    if (options.task === "one") {
      return await MainModel.deleteOne({ id: params.id });
    }
  },
};
