// 3rd packages
const express = require("express");
const router = express.Router();

// midleware
const { authenticating, authorizing } = require("../../../middlewares/auth");
const upload = require("../../../middlewares/uploadImage");

// Club Controller
const clubController = require("./club");

// router: /api/club/create
//desc: create club
// access: private
router.post(
  "/create/:type",
  // authenticating,
  // authorizing(["admin"]),
  upload.fields([
    {
      name: "imageClub",
    },
    {
      name: "clubLogo",
    },
    {
      name: "clubStructureImage",
    },
  ]),
  clubController.createClub
);

// router: /api/club/getAllClub
//desc: get all full club
// access: public
router.get("/getAllClub", clubController.getAllClub);

//router: /api/club/getAllFeedback/:idclub
//desc : get all feedback and fillter feedback
//access : private
router.get("/getAllFeedback/:idClub", clubController.getAllFeedback);

// router: /api/club/getAllClub
//desc: get all full club
// access: public
router.put("/updateInfoText/:id", clubController.updateInfoText);

// router: /api/club/getAllClub
//desc: get all full club
// access: public
router.put(
  "/updateFileLogo/:type/:id",
  upload.single("imageClub"),
  clubController.updateImageLogo
);

// router: /api/club/getAllClub
//desc: get all full club
// access: public
router.put(
  "/updateFileStruc/:type/:id",
  upload.single("imageClub"),
  clubController.updateImageStruc
);

//router: /api/club/upload
//desc : uploadCLub
//access : private
router.put(
  "/update/:type/:idClub",
  upload.fields([
    {
      name: "imageClub",
    },
    {
      name: "clubLogo",
    },
    {
      name: "clubStructureImage",
    },
  ]),
  clubController.uploadClub
);

//router: /api/club/deleteSchedule/:id
//desc : uploadCLub
//access : private
router.put("/deleteSchedule/:id", clubController.deleteSchedule);

// router: /api/club/getAllClub
//desc: get all full club
// access: public
router.put(
  "/updateFileImageBanner/:type/:id",
  upload.single("imageClub"),
  clubController.updateImageBanner
);

//router: /api/club/updateSchedule/:id
//desc : updateSchedule
//access : private
router.put("/updateSchedule/:id", clubController.updateSchedule);

// router: /api/club/getClubById/:idClub
//desc: get club by Id
// access: private
router.get("/getClubById/:idClub", clubController.getClubById);

//router: /api/club/searchClub
//desc: search club
//access: public
router.get("/searchClub", clubController.searchClub);

//router: /api/club/fillterClub
//desc: filter club
//access: public
router.get("/fillterClub", clubController.fillterClub);

//router: /api/club/addSchedule/:id
//desc: add schedule club
//access: private
router.post("/addSchedule/:id", clubController.addSchedule);

//router: /api/club/getAllScheduleOfClub/:id
//desc:get All Schedule club
//access: private
router.get("/getAllScheduleOfClub/:id", clubController.getAllScheduleOfClub);

//router: /api/club/createFeedBack/:id
//desc:create feedback of club
//access: private
router.post("/sendFeedBackOfClub/:idClub", clubController.sendFeedBack);

//router: /api/club/createFeedBack/:id
//desc:create feedback of club
//access: private
router.get(
  "/getChartStudentOfClub/:idClub",
  clubController.getChartStudentOfClub
);

//router: /api/club/createFeedBack/:id
//desc:create feedback of club
//access: private
router.post("/searchFeedBack/:idClub", clubController.searchFeedBack);

//router: /api/club/createFeedBack/:id
//desc:create feedback of club
//access: private
router.post("/searchSchedule/:idClub", clubController.searchSchedule);

//router: /api/club/createFeedBack/:id
//desc:create feedback of club
//access: private
router.post("/searchStudent/:idClub", clubController.searchStudent);

//router: /api/club/createFeedBack/:id
//desc:create feedback of club
//access: private
router.delete("/delete/:idClub", clubController.deleteClub);

module.exports = router;
