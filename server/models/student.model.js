var mongoose = require("mongoose");
// Add Model
// const { ClubSchema } = require("./club.model");

const StudentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: false,
  },
  passWord: {
    type: String,
    required: false,
  },

  registerDate: { type: Date, default: new Date().getTime() },
  isActive: {
    type: Boolean,
  },
  userType: {
    type: String,
    required: false,
    default: "student",
  },
  mssv: {
    type: String,
    required: false,
  },
  info: {
    avataUser: {
      type: String,
      required: false,
    },
    fullName: {
      type: String,
      required: false,
    },
    major: {
      type: String,
      required: false,
    },
    classMajor: {
      type: String,
      required: false,
    },
  },
  club: [
    {
      clubId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Club",
      },
      isConfirmJoin: {
        type: Boolean,
        default: false,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = {
  Student,
  StudentSchema,
};
