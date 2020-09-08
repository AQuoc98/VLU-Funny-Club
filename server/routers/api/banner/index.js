//3rd package
const express = require("express");
const router = express.Router();

//middleware
const { authenticating, authorizing } = require("../../../middlewares/auth");
const upload = require("../../../middlewares/uploadImage");

//banner controller
const bannerController = require("./banner");

//router : /api/banner/create/ImageBanner
//desc : create banner
//access : private
router.post(
  "/create/:type",
  authenticating,
  authorizing(["admin"]),
  upload.single("imageBanner"),
  bannerController.creatBanner
);

//router : /api/banner/delete/ImageBanner
//desc : update banner
//access : private
router.put(
  "/delete/:idBanner",
  authenticating,
  authorizing(["admin"]),
  bannerController.deleteBanner
);
//router: /api/banner/getAllBanner
//desc : get all banner
//access: private
router.get(
  "/getAllBanner",
  authenticating,
  authorizing(["admin"]),
  bannerController.getAllBanner
);

//router: /api/banner/getAllBanner
//desc : get all banner
//access: private
router.get("/getAllBannerForHomePage", bannerController.getAllBannerForUser);

module.exports = router;
