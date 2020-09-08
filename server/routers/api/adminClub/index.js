// 3rd packages
const express = require("express");
const router = express.Router();
const adminClubController = require("./adminClub");

// midleware
const { authenticating, authorizing } = require("../../../middlewares/auth");

// router: /api/admin/clubAdmin/Access
//desc: club admin access student join club
// access: private
router.post(
  "/accessForStudent/:id/:idClub",
  adminClubController.accessForStudent
);

// router: /api/admin/clubAdmin/Access
//desc: club admin access student join club
// access: private
router.post(
  "/accessAdminForClub/:id/:idClub",
  adminClubController.accessAdminForStudent
);

// router: /api/admin/clubAdmin/delete
//desc: delete student
// access: private
router.put("/removeStudent/:id/:idClub", adminClubController.removeStudent);

// router: /api/admin/clubAdmin/delete
//desc: delete student
// access: private
router.put("/removeAdminClub/:id/:idClub", adminClubController.removeAdminClub);

module.exports = router;
