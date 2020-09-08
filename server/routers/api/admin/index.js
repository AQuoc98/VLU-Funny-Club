// 3rd packages
const express = require("express");
const router = express.Router();
const adminController = require("./admin");

// midleware
const { authenticating, authorizing } = require("../../../middlewares/auth");

// router: /api/admin/register
//desc: register an admin
// access: private
router.post("/register", adminController.registerAdmin);

// router: /api/admin/register
//desc: register an admin
// access: private
router.post("/registerStaff", adminController.registerStaff);

// router: /api/admin/
//desc: login admin
// access: private
router.post("/login", adminController.loginAdmin);

module.exports = router;
