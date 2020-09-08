// 3rd packages
const express = require("express");
const router = express.Router();
var multer = require("multer");

// var upload = multer({ dest: "uploads/users" });

// midleware
const { authenticating, authorizing } = require("../../../middlewares/auth");
const upload = require("../../../middlewares/uploadImage");

// User Controller
const userController = require("./users");

// UserGroup Controller
const staffController = require("./staff");
const { removeStudent } = require("./users");

//router : /api/student/fillterStudent
//desc : fillter Student
//access : private
router.get(
  "/fillterStudent",
  authenticating,
  authorizing(["admin", "staff"]),
  userController.fillterStudent
);

//router: /api/student/updatePassword/:id
//desc : update password for student
//access: private
router.put("/updatePassword", userController.updatePassword);

// router: /api/student/registerUser
//desc: register an student
// access: public
router.post(
  "/registerUser/:type",
  upload.single("avataUser"),
  userController.registerUser
);

// router: /api/student/register
//desc: register an student
// access: public
router.post("/login", userController.login);

// router: /api/student/getAllUser
//desc: Get All student
// access: private
router.get(
  "/getAllUser",
  authenticating,
  authorizing(["admin","adminClub", "staff"]),
  userController.getAllUser
);

// router: /api/student/:id
//desc: Get student by Id
// access: private
router.get(
  "/:id",
  authenticating,
  authorizing(["user", "admin", "adminClub", "staff"]),
  userController.getUserById
);

// router: /api/student/:id
//desc: update student by Id
// access: private
// router.put(
//   "/:id",
//   authenticating,
//   authorizing(["user", "admin"]),
//   userController.updateUserById
// );

// router: /api/student/upload-avatar/:type/:id
//desc: update avatar student by Id
// access: private
router.post(
  "/upload-avatar/:type/:id",
  authenticating,
  authorizing(["user", "admin", "adminClub"]),
  upload.single("avatar"),
  userController.uploadAvatar
);

// router: /api/student/joinClub/:id
//desc: student join club
// access: private
router.post(
  "/joinClub/:idClub",
  authenticating,
  userController.addStudentForClub
);

// router: /api/student/joinClub/:id
//desc: student join club
// access: private
router.post(
  "/setPermissionStaff/:idStudent",
  authenticating,
  authorizing(["admin"]),
  staffController.setPremissionStaff
);

//router : /api/student/removeStudent/:idClub
//desc: Remove student
//access : private
router.get("/removeStudent/:idClub/:studentId", userController.removeStudent);

module.exports = router;
