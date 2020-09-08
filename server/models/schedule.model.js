// 3rd packages
const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  room: {
    type: String,
  },
  content: {
    type: String,
  },
  note: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  registerDate: { type: Date, default: new Date().getTime() },
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = {
  ScheduleSchema,
  Schedule,
};
