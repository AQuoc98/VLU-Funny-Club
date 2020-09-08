// 3rd packages
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  // startTime: {
  //   type: String,
  //   required: true,
  // },
  // endTime: {
  //   type: String,
  //   required: true,
  // },
  time: {
    type: String,
    // required: true,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  eventDesc: {
    type: String,
    required: true,
  },
  eventImage: {
    type: String,
  },
  eventAddress: {
    type: String,
    required: true,
  },
  Club: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "Club",
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  registerDate: { type: String },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = {
  EventSchema,
  Event,
};
