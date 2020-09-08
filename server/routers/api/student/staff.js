// 3rd packages
var jwt = require("jsonwebtoken");

// load model
const { Student } = require("../../../models/student.model");

// 3rd packages
const bcrypt = require("bcryptjs");
var validator = require("validator");

// register admin
const setPremissionStaff = (req, res) => {
  const { idStudent } = req.params;
  try {
    Student.findByIdAndUpdate(idStudent)
      .then((staff) => {
        staff.userType = "staff";
      })
      .catch((err) => {
        err;
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { setPremissionStaff };
