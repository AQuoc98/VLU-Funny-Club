// 3rd packages
const mongoose = require("mongoose");

// Add Model
const { EventSchema } = require("./event.model");
const { StudentSchema } = require("./student.model");

// Schema model
const ClubSchema = new mongoose.Schema({
  clubKhoa: {
    type: String,
  },
  clubAdmin: [
    {
      registerDate: { type: Date, default: new Date().getTime() },
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Student",
      },
    },
  ],
  clubName: {
    type: String,
    required: true,
  },
  clubDesc: {
    type: String,
    required: true,
  },
  clubPhone: {
    type: String,
    required: true,
  },
  clubEmail: {
    type: String,
    required: true,
  },
  clubFace: {
    type: String,
    required: true,
  },
  clubImage: {
    type: String,
    required: true,
  },
  clubLogo: {
    type: String,
    required: true,
  },
  registerDate: { type: String },
  clubHistory: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  event: [
    {
      eventId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Event",
      },
    },
  ],

  schedule: [
    {
      scheduleId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Schedule",
      },
      registerDate: { type: Date, default: new Date().getTime() },
    },
  ],
  clubPurpose: { type: String },
  clubFunction: { type: String },
  clubStructureImage: { type: String },
  memberRate: {
    type: String,
    default: 0,
  },
  clubGroupType: {
    type: String,
    require: true,
  },
  feedBack: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Student",
      },
      feedBack: { type: String },
      rate: { type: String },
      registerDate: { type: Date, default: new Date().getTime() },
    },
  ],
  students: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Student",
      },
      isConfirmJoin: {
        type: Boolean,
        default: false,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      requestConfirm: {
        type: String,
      },
      registerDate: { type: Date, default: new Date().getTime() },
    },
  ],
});

const Club = mongoose.model("Club", ClubSchema);

// Export module
module.exports = {
  ClubSchema,
  Club,
};
