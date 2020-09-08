const multer = require("multer");
var cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

try {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "",
      public_id: async (req, file) =>
        "SEP_Phong/" + req.params.type + "/" + Date.now(),
    },
  });

  const upload = multer({
    storage,
  });
  module.exports = upload;
} catch (error) {
  console.log(error);
}
