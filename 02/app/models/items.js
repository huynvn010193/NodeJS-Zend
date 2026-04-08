const MainModel = require(__path_schemas + "items");

// TODO: biến đổi: careers[in]=5d7a514b5d2c12c7449be025 => { careers: { $in: [5d7a514b5d2c12c7449be025] } }
const parseBracketQuery = (query) => {
  return Object.entries(query).reduce((acc, [key, value]) => {
    const match = key.match(/^(.+)\[(.+)\]$/);

    if (match) {
      const field = match[1]; // careers
      const operator = `$${match[2]}`; // $in

      if (!acc[field]) acc[field] = {};

      // các operator MongoDB yêu cầu giá trị là array
      const ARRAY_OPERATORS = new Set([
        "$in",
        "$nin",
        "$all",
        "$and",
        "$or",
        "$nor",
      ]);
      acc[field][operator] =
        ARRAY_OPERATORS.has(operator) && !Array.isArray(value)
          ? [value]
          : value;
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});
};

module.exports = {
  listItems: async (params, options) => {
    const newQuery = parseBracketQuery(params);

    if (options.task === "all") {
      return await MainModel.find(newQuery).select({});
    }
    if (options.task === "one") {
      return await MainModel.findById(params.id).select({});
    }
  },
  create: async (item) => {
    return await MainModel(item).save();
  },
  editItem: async (params, options) => {
    if (options.task === "edit") {
      return await MainModel.updateOne({ _id: params.id }, params.body);
    }
  },
  deleteItem: async (params, options) => {
    if (options.task === "one") {
      return await MainModel.deleteOne({ _id: params.id });
    }
  },
};
