// 3rd packages
const mongoose = require("mongoose");

// Schema model
const GroupUserSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true,
  },
});

const GroupUser = mongoose.model("GroupUser ", GroupUserSchema);

// Export module
module.exports = {
  GroupUserSchema,
  GroupUser,
};
