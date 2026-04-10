const MainModel = require(__path_schemas + "users");

// TODO: biến đổi: careers[in]=5d7a514b5d2c12c7449be025 => { careers: { $in: [5d7a514b5d2c12c7449be025] } }
const parseBracketQuery = (query) => {
  return Object.entries(query).reduce((acc, [key, value]) => {
    if (key === "select") return acc;

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
  register: async (item) => {
    return await MainModel(item).save();
  },
};
