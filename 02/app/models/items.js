const MainModel = require(__path_schemas + "items");

module.exports = {
  listItems: async (params, options) => {
    let sort = {};
    // if (params.sortField !== undefined && params.sortType !== undefined) {
    //   sort[params.sortField] = params.sortType;
    // } else {
    //   sort = { name: "asc" };
    // }
    if (params.sortField) sort[params.sortField] = params.sortType;

    if (options.task === "all") {
      return await MainModel.find({}).select("id name status").sort(sort);
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
