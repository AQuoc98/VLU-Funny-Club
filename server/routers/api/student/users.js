// 3rd packages
var jwt = require("jsonwebtoken");

// load model
const { Student } = require("../../../models/student.model");
const { Club } = require("../../../models/club.model");

// 3rd packages
const bcrypt = require("bcryptjs");
var validator = require("validator");
const dateFormat = require("dateformat");

//validate
const validateRegisterInput = require("../../../validations/ValidateRegisterInput");
const validateUpdatePassword = require("../../../validations/ValidateUpdatePassword");
const { functions, remove } = require("lodash");
const _ = require("lodash");

// register student

const registerUser = async (req, res, next) => {
  const { isValid, errors } = await validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const {
    userName,
    passWord,
    passWord2,
    fullName,
    mssv,
    major,
    classMajor,
  } = req.body;

  const avataUser = req.file.path;
  console.log("avataUser", avataUser);
  const newUser = new Student({
    userName,
    passWord,
    mssv,
    info: {
      avataUser,
      fullName,
      major,
      classMajor,
    },
    userType: "user",
  });
  validator.isEmpty(userName)
    ? res.send({ msg: "UserName is Empty" })
    : Student.findOne({ $or: [{ userName }] })
        .then((user) => {
          if (user) return res.status(400).json({ err: "UserName exists" });
          // Hash PassWord
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(passWord, salt, function (err, hash) {
              newUser.passWord = hash;
              newUser
                .save()
                .then((user) => res.status(200).json(user)) // success
                .catch((err) => res.status(400).json(err)); // err
            });
          });
        })
        .catch((err) => err);
};

//  login
const login = (req, res) => {
  const { userName, passWord } = req.body;

  Student.findOne({ userName })
    .then((user) => {
      if (!user)
        return res.status(400).json({ userName: "UserName is not exist" });
      bcrypt.compare(passWord, user.passWord).then((isMath) => {
        if (!isMath)
          return res.status(400).json({ passWord: "Password incorrect" });
        let clubId;
        // Check userType
        if (user.userType === "adminClub") {
          console.log("user", user);
          // Check all club
          for (const key in user.club) {
            if (user.club.hasOwnProperty(key)) {
              const element = user.club[key];
              // Check is admin in club
              if (element.isAdmin === true) {
                clubId = element.clubId;
              }
            }
          }
        }
        const payload = {
          id: user.id,
          userType: user.userType,
          fullName: user.info.fullName,
          mssv: user.mssv,
          major: user.info.major,
          classMajor: user.info.classMajor,
          avatar: user.info.avataUser,
          clubId,
        };
        const KEY = "LouisPanda";
        // "2 days", "10h", "7d" "120" is equal to "120ms
        jwt.sign(
          {
            payload,
          },
          KEY,
          { expiresIn: "50h" },
          (err, token) => {
            if (err) return res.status(400).json(err);
            return res.status(200).json({
              sucess: true,
              token: token,
              userType: user.userType,
              payload,
            });
          }
        );
      });
    })
    .catch((err) => res.status(400).json(err)); // err
};

// get All student
const getAllUser = (req, res) => {
  Student.find()
    .populate({
      path: "students.studentId",
      macth: { isActive: true },
    })
    .then((user) => {
      res.send(user);
    });
};

// Get User By Id
const getUserById = (req, res, next) => {
  const { id } = req.params;
  Student.findById(id)
    .populate({
      path: "club.clubId",
      macth: { isActive: true },
    })
    .then((user) => {
      console.log("user", user.club);
      _.remove(user.club, function (n) {
        console.log("n", n);
        return n.clubId === null;
      });
      res.status(200).json(user);
    })
    .catch((err) => res.status(400).json(err));
};

// Update a student identified by the id in the request
const updateUserById = (req, res) => {
  let { passWord } = req.body;
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Body can not be empty",
    });
  }

  // Find user and update it with the request body
  Student.findByIdAndUpdate(
    req.params.id,
    {
      passWord: req.body.passWord,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id,
        });
      }

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(passWord, salt, function (err, hash) {
          user.passWord = hash;
          user.save();
          return res.send(user);
        });
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.id,
      });
    });
};

// upload avatar for student
const uploadAvatar = (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  Student.findById(id)
    .then((user) => {
      if (!user) return Promise.reject({ errors });

      user.info.avataUser = req.file.path;
      return user.save();
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
};

// add club for student
const addStudentForClub = async (req, res, next) => {
  const { idClub } = req.params;
  const { requestConfirm } = req.body;
  const token = req.header("Authorization");
  const KEY = "LouisPanda";
  const decoded = jwt.verify(token, KEY);
  const id = decoded.payload.id;
  Student.findById(id)
    .then((user) => {
      console.log("user", user);
      Club.findByIdAndUpdate(idClub).then((club) => {
        for (const key in club.students) {
          const element = club.students[key];
          console.log("elemen213123123t", element);
          if (element.studentId == user.id) {
            return res.send({ message: "Đã gửi yêu cầu" });
          }
        }
        club.students.push({
          studentId: user.id,
          isConfirmJoin: false,
          requestConfirm,
        });
        club.save();
        return res.status(400).json(club);
      });
    })
    .catch((err) => res.status(400).json(err));
};

//update password for student
const updatePassword = async (req, res) => {
  const { password, newPassword } = req.body;

  // get id for token
  const token = req.header("Authorization");
  const KEY = "LouisPanda";
  const decoded = jwt.verify(token, KEY);

  // check validate
  const { isValid, errors } = await validateUpdatePassword(req.body);
  if (!isValid) return res.status(400).json(errors);

  // compare
  Student.findByIdAndUpdate(decoded.payload.id).then((student) => {
    if (bcrypt.compareSync(password, student.passWord) === false) {
      return res.status(401).json({ msg: "Mật khẩu cũ không chính xác" });
    }
    if (bcrypt.compareSync(newPassword, student.passWord) === true) {
      return res
        .status(401)
        .json({ msg: "Mật khẩu cũ không được trùng mật khẩu mới" });
    }

    bcrypt.compare(password, student.passWord, function (err, results) {
      if (err) {
        throw new Error(err);
      }
      if (results) {
        bcrypt.genSalt(10, function (err, salt) {
          if (err) {
            throw new Error(err);
          }
          bcrypt.hash(newPassword, salt, function (err, hash) {
            if (err) {
              throw new Error(err);
            }
            // Store hash in your password DB.
            student.passWord = hash;
            student.save();
          });
        });
        return res.status(200).json({ student });
      } else {
        return res.status(401).json({ msg: "Mật khẩu cũ không chính xác" });
      }
    });
  });
};

//Delete student
const deleteStudent = (req, res) => {
  const { id } = req.params;
  Student.findByIdAndRemove(id)
    .then((student) => {
      student.id = remove;
      student.save();
    })
    .then((student) => res.status(200).json(student))
    .catch((err) => res.status(400).json(err));
};
//Remove student
const removeStudent = (req, res) => {
  const { idClub } = req.params;
  Club.findById(idClub)
    .populate({ path: "students.studentId" })
    .then((club) => {
      club.students.findByIdAndRemove(studentId);
      club.students = remove;
      club.save();
    });
};
//fillter student
const fillterStudent = (req, res) => {
  let fillter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let arr1 = [];
  let arr2 = [];
  let arr3 = [];
  let arr4 = [];
  let arr5 = [];
  let arr6 = [];
  let arr7 = [];
  let arr8 = [];
  let arr9 = [];
  let arr10 = [];
  let arr11 = [];
  let arr12 = [];

  Student.find()
    .populate({
      path: "students.studentId",
      macth: { isActive: true },
    })
    .then((student) => {
      for (const key in student) {
        switch (dateFormat(student[key].registerDate, "m")) {
          case "1":
            arr1.push(student[key]);
            fillter[0] = arr1.length;
            break;
          case "2":
            arr2.push(student[key]);
            fillter[1] = arr2.length;
            break;
          case "3":
            arr3.push(student[key]);
            fillter[2] = arr3.length;
            break;
          case "4":
            arr4.push(student[key]);
            fillter[3] = arr4.length;
            break;
          case "5":
            arr5.push(student[key]);
            fillter[4] = arr5.length;
            break;
          case "6":
            arr6.push(student[key]);
            fillter[5] = arr6.length;
            break;
          case "7":
            arr7.push(student[key]);
            fillter[6] = arr7.length;
            break;
          case "8":
            arr8.push(student[key]);
            fillter[7] = arr8.length;
            break;
          case "9":
            arr9.push(student[key]);
            fillter[8] = arr9.length;
            break;
          case "10":
            arr10.push(student[key]);
            fillter[9] = arr10.length;
            break;
          case "11":
            arr11.push(student[key]);
            fillter[10] = arr11.length;
            break;
          case "12":
            arr12.push(student[key]);
            fillter[11] = arr12.length;
            break;
          default:
            break;
        }
      }
      res.send(fillter);
    });
};

module.exports = {
  updatePassword,
  registerUser,
  login,
  getAllUser,
  getUserById,
  updateUserById,
  uploadAvatar,
  addStudentForClub,
  deleteStudent,
  removeStudent,
  fillterStudent,
};
