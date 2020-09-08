//3rd packages
const mongoose = require("mongoose");

//Staff Schema
const StaffSchema = new mongoose.Schema({
  userType: {
    type: String,
    default: "staff",
  },
  userName: {
    type: String,
    required: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  registerDate: { type: Date, default: new Date().getTime() },
});

const Staff = mongoose.model("Staff", StaffSchema);

//module exports
module.exports = {
  StaffSchema,
  Staff,
};
