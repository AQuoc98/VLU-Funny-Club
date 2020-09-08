// 3rd packages
const mongoose = require("mongoose");

// Schema model

const AdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    ref: "GroupUser",
  },
  registerDate: { type: Date, default: new Date().getTime() },
});

const Admin = mongoose.model("Admin", AdminSchema);

// Export module
module.exports = {
  AdminSchema,
  Admin,
};
