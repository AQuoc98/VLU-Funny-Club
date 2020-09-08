// 3rd packages
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const secretKey = dotenv.SECRET_KEY;
console.log(secretKey);

// load model
const { Admin } = require("../../../models/admin.model");
const { Student } = require("../../../models/student.model");

// 3rd packages
const bcrypt = require("bcryptjs");
var validator = require("validator");

// register admin
const registerAdmin = (req, res) => {
  const { userName, passWord } = req.body;
  const newAdmin = new Student({
    userName,
    passWord,
    userType: "admin",
  });
  validator.isEmpty(userName)
    ? res.send({ msg: "UserName is Empty" })
    : Student.findOne({ $or: [{ userName }] })
        .then((admin) => {
          if (admin) return res.status(400).json({ err: "UserName exists" });
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(passWord, salt, function (err, hash) {
              newAdmin.passWord = hash;
              newAdmin
                .save()
                .then((admin) => res.status(200).json(admin)) // success
                .catch((err) => res.status(400).json(err)); // err
            });
          });
        })
        .catch((err) => err);
};

// admin login
const loginAdmin = (req, res) => {
  const { userName, passWord } = req.body;
  try {
    Student.findOne({ userName })
      .then((user) => {
        if (!user)
          return res.status(400).json({ userName: "UserName is not exist" });
        bcrypt.compare(passWord, user.passWord).then((isMath) => {
          if (!isMath)
            return res.status(400).json({ passWord: "passWord incorrect" });

          const payload = {
            userType: user.userType,
            firstName: user.firstName,
            lastName: user.lastName,
          };
          const KEY = "LouisPanda";
          // "2 days", "10h", "7d" "120" is equal to "120ms
          jwt.sign(
            {
              payload,
            },
            KEY,
            { expiresIn: "1h" },
            (err, token) => {
              if (err) return res.status(400).json(err);
              return res.status(200).json({
                sucess: true,
                token: token,
              });
            }
          );
        });
      })
      .catch((err) => res.status(400).json(err)); // err
  } catch (error) {
    console.log(error);
  }
};

// register student

const registerStaff = async (req, res, next) => {
  const { userName, passWord, fullName } = req.body;
  const newStaff = new Student({
    userName,
    passWord,
    fullName,
    userType: "staff",
  });
  validator.isEmpty(userName)
    ? res.send({ msg: "Staff is Empty" })
    : Student.findOne({ $or: [{ userName }] })
        .then((user) => {
          if (user) return res.status(400).json({ err: "Staff exists" });
          // Hash PassWord
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(passWord, salt, function (err, hash) {
              newStaff.passWord = hash;
              newStaff
                .save()
                .then((user) => res.status(200).json(user)) // success
                .catch((err) => res.status(400).json(err)); // err
            });
          });
        })
        .catch((err) => err);
};

module.exports = { registerAdmin, loginAdmin, registerStaff };
