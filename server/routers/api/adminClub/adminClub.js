// 3rd packages
var jwt = require("jsonwebtoken");
var _ = require("lodash");
const dotenv = require("dotenv");

const secretKey = dotenv.SECRET_KEY;
console.log(secretKey);

// load model
const { Club } = require("../../../models/club.model");
const { Student } = require("../../../models/student.model");

// 3rd packages
const bcrypt = require("bcryptjs");
var validator = require("validator");

// register admin
const accessForStudent = (req, res) => {
  const { id, idClub } = req.params;
  Student.findById(id).then((student) => {
    Club.findByIdAndUpdate(idClub).then((club) => {
      console.log("club", club);
      for (const key in club.students) {
        if (club.students.hasOwnProperty(key)) {
          const element = club.students[key];
          console.log("12321321", element);
          if (element.studentId._id == id) {
            console.log("element1", element);
            element.isConfirmJoin = true;
            student.club.push({ clubId: idClub, isConfirmJoin: true });
            student.save();
            club.save();
          }
        }
      }
      return res.send(club.students);
    });
  });
};

const accessAdminForStudent = (req, res) => {
  const { id, idClub } = req.params;
  Student.findByIdAndUpdate(id).then((student) => {
    Club.findByIdAndUpdate(idClub)
      // .populate({ path: "students.studentId" })
      .then((club) => {
        if (club.clubAdmin.length >= 1) {
          return res.send({ msg: "Câu lạc bộ đã tồn tại admin club" }, 404);
        }
        console.log("Phong");
        console.log("club.students", club.students);
        if (club.students.length == 0) {
          club.clubAdmin.push({
            studentId: id,
          });
          club.students.push({
            studentId: id,
            isAdmin: true,
            isConfirmJoin: true,
          });
          student.userType = "adminClub";
          student.club.push({
            clubId: idClub,
            isAdmin: true,
            isConfirmJoin: true,
          });
          student.save();
          club.save();
          return res.send(club);
        }
        club.students.forEach((element) => {
          console.log("element", element);
          console.log("Phong1");
          if (element.studentId == id) {
            club.clubAdmin.push({
              studentId: id,
            });
            club.students.forEach((element) => {
              if (element.studentId == id) {
                element.isAdmin = true;
              }
            });
            student.club.forEach((element) => {
              element.isAdmin = true;
            });
            student.userType = "adminClub";
            student.save();
            club.save();
            return res.send(club);
          } else {
            club.clubAdmin.push({
              studentId: id,
            });
            club.students.push({
              studentId: id,
              isAdmin: true,
              isConfirmJoin: true,
            });
            student.userType = "adminClub";
            student.club.push({
              clubId: idClub,
              isAdmin: true,
              isConfirmJoin: true,
            });
            student.save();
            club.save();
            return res.send(club);
          }
        });
      });
  });
};

const removeStudent = (req, res) => {
  const { id, idClub } = req.params;
  Student.findById(id).then((student) => {
    Club.findById(idClub).then((club) => {
      for (const key in club.students) {
        if (club.students.hasOwnProperty(key)) {
          const element = club.students[key];
          if (element.studentId == id) {
            club.students.splice(key, 1);
          }
        }
      }
      for (const key in student.club) {
        if (student.club.hasOwnProperty(key)) {
          const element = student.club[key];
          if (element.clubId == idClub) {
            student.club.splice(key, 1);
          }
        }
      }
      student.save();
      club.save();
      return res.send(student);
    });
  });
};

const removeAdminClub = (req, res) => {
  const { id, idClub } = req.params;
  console.log("id", id);
  Student.findByIdAndUpdate(id).then((student) => {
    Club.findByIdAndUpdate(idClub).then((club) => {
      club.clubAdmin = [];
      student.userType = "user";
      club.students.forEach((element) => {
        if (element.studentId == id) {
          element.isAdmin = false;
        }
      });
      student.club.forEach((element) => {
        element.isAdmin = false;
      });
      student.save();
      club.save();
      return res.send(club);
    });
  });
};
module.exports = {
  accessForStudent,
  accessAdminForStudent,
  removeStudent,
  removeAdminClub,
};
