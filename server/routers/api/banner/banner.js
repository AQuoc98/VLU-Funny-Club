//load model
const { Banner } = require("../../../models/banner.model");

// Middleware
const upload = require("../../../middlewares/uploadImage");

//create banner
const creatBanner = (req, res) => {
  const { bannerRegisterDate } = req.body;
  const bannerImagePath = req.file.path;

  const newBanner = new Banner({
    bannerRegisterDate,
    bannerImage: bannerImagePath,
  });
  newBanner
    .save()
    .then((banner) => res.status(200).json(banner))
    .catch((err) => res.status(400).json(err));
};
//delete banner
const deleteBanner = (req, res) => {
  const { idBanner } = req.params;
  Banner.findByIdAndUpdate(idBanner)
    .then((banner) => {
      banner.isActive = false;
      banner.save();
      res.send(banner);
    })
    .then((banner) => res.status(200).json(banner))
    .catch((err) => res.status(400).json(err));
};
//get all banner
const getAllBanner = (req, res) => {
  Banner.find()
    .where("isActive")
    .equals("true")
    .then((banner) => {
      res.send(banner);
    });
};

const getAllBannerForUser = (req, res) => {
  Banner.find()
    .where("isActive")
    .equals("true")
    .sort("-bannerRegisterDate")
    .limit(3)
    .then((banner) => {
      res.send(banner);
    });
};

module.exports = {
  getAllBannerForUser,
  creatBanner,
  deleteBanner,
  getAllBanner,
};
