// 3rd packages
const mongoose = require("mongoose");

// Schema model
const ClubGroupSchema = new mongoose.Schema({
  clubType: {
    type: String,
    required: true,
  },
  Student: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
});

const ClubGroup = mongoose.model("ClubGroup ", ClubGroupSchema);

// Export module
module.exports = {
  ClubGroupSchema,
  ClubGroup,
};
