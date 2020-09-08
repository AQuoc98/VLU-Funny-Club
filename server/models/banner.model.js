// 3rd packages
const mongoose = require("mongoose");

// Schema model
const BannerSchema = new mongoose.Schema({
  bannerImage: { type: String, required: true },
  bannerRegisterDate: { type: Date, default: new Date().getTime() },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
});

const Banner = mongoose.model("Banner", BannerSchema);

// Export module
module.exports = {
  BannerSchema,
  Banner,
};
