// load model
const { Club, ClubSchema } = require("../../../models/club.model");
const { Event } = require("../../../models/event.model");
const { Student } = require("../../../models/student.model");
const { Schedule } = require("../../../models/schedule.model");

// 3rd packages
var dateFormat = require("dateformat");
const _ = require("lodash");
var jwt = require("jsonwebtoken");
var moment = require("moment-timezone");

// Middleware

//validate
const validateInformationClub = require("../../../validations/ValidateInformationClub");
const validateUpdateSchedule = require("../../../validations/ValidateUpdateSchedule");
const { remove } = require("lodash");

// register club
const createClub = async (req, res) => {
  const { isValid, errors } = await validateInformationClub(req.body);
  if (!isValid) return res.status(400).json(errors);

  var today = new Date();
  const dateVietNam = moment.tz(today, "Asia/Ho_Chi_Minh");

  const {
    clubName,
    clubDesc,
    clubHistory,
    clubGroupType,
    clubPhone,
    clubEmail,
    clubFace,
    clubPurpose,
    clubFunction,
  } = req.body;

  if (!req.files.imageClub) {
    return res.send({
      message: "fail",
      content: "Chưa nhập file image câu lạc bộ",
    });
  }
  if (!req.files.clubLogo) {
    return res.send({
      message: "fail",
      content: "Chưa nhập file logo câu lạc bộ",
    });
  }
  if (!req.files.clubStructureImage) {
    return res.send({
      message: "fail",
      content: "Chưa nhập file cấu trúc câu lạc bộ ",
    });
  }

  const clubImagePath = req.files.imageClub[0].path;
  const clubLogo = req.files.clubLogo[0].path;
  const clubStructureImage = req.files.clubStructureImage[0].path;

  const newClub = new Club({
    clubName,
    clubDesc,
    clubHistory,
    clubGroupType,
    clubImage: clubImagePath,
    clubLogo,
    clubPhone,
    clubEmail,
    clubFace,
    clubPurpose,
    clubFunction,
    clubStructureImage,
    registerDate: dateVietNam,
  });
  try {
    newClub
      .save()
      .then((newClub) =>
        res.status(200).json({
          message: "success",
          newClub: newClub,
        })
      ) // success
      .catch((err) => res.status(400).json({ err: err, message: "fail" })); // err
  } catch (error) {
    res.send("Lỗi hệ thống", error);
  }
};

// get all  club
const getAllClub = (req, res) => {
  Club.find()
    .populate({
      path: "students.studentId",
    })
    .populate({
      path: "clubAdmin.studentId",
    })
    .populate({
      path: "event.eventId",
      match: { isActive: true },
    })
    .populate({
      path: "feedBack.studentId",
      match: { isActive: true },
    })
    .populate({ path: "schedule.scheduleId", match: { isActive: true } })

    .exec(function (err, club) {
      _.remove(club.event, function (n) {
        return n.eventId === null;
      });
      _.remove(club.schedule, function (n) {
        return n.scheduleId === null;
      });
      console.log("club", club);
      club.sort(function (a, b) {
        return new Date(b.registerDate) - new Date(a.registerDate);
      });
      if (err) return handleError(err);
      res.send(club);
    });
};

// get   club by id
const getClubById = (req, res) => {
  let { idClub } = req.params;

  Club.findById(idClub)
    .populate({
      path: "students.studentId",
    })
    .populate({
      path: "clubAdmin.studentId",
    })
    .populate({
      path: "event.eventId",
      match: { isActive: true },
    })
    .populate({
      path: "feedBack.studentId",
      match: { isActive: true },
    })
    .populate({ path: "schedule.scheduleId", match: { isActive: true } })
    .exec(async (err, club) => {
      if (err) {
        console.log("err", err);
        return res.send({ msg: "id not found" });
      }
      _.remove(club.event, function (n) {
        return n.eventId === null;
      });
      _.remove(club.schedule, function (n) {
        return n.scheduleId === null;
      });

      res.send(club);
    });
};

//upload club information
const uploadClub = async (req, res) => {
  const { isValid, errors } = await validateInformationClub(req.body);
  if (!isValid) return res.status(400).json(errors);

  const clubImagePath = req.files.imageClub[0].path;
  const clubLogo = req.files.clubLogo[0].path;
  const clubStructureImage = req.files.clubStructureImage[0].path;

  const { idClub } = req.params;
  Club.findByIdAndUpdate(idClub)
    .then((club) => {
      console.log("club", club);
      club.clubName = req.body.clubName;
      club.clubDesc = req.body.clubDesc;
      club.clubHistory = req.body.clubHistory;
      club.clubGroupType = req.body.clubGroupType;
      club.clubImage = clubImagePath;
      club.clubFunction = req.body.clubFunction;
      club.clubPurpose = req.body.clubPurpose;
      club.clubFace = req.body.clubFace;
      club.clubEmail = req.body.clubEmail;
      club.clubPhone = req.body.clubPhone;
      club.clubLogo = clubLogo;
      club.clubStructureImage = clubStructureImage;
      club.save();
      res.send(club);
    })

    .then((club) => res.status(200).json(club))
    .catch((err) =>
      res.status(400).send({
        message: " he thong dang bao tri",
      })
    );
};

//search club
const searchClub = (req, res) => {
  const { searchClub } = req.body;
  Club.find({ clubName: searchClub })
    .then((club) => {
      res.send(club);
    })
    .then((club) => res.status(200).json(club))
    .catch((err) => res.status(400).send({ message: "khong tim thay clb" }));
};

// Fillter Club
const fillterClub = (req, res) => {
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

  Club.find()
    .populate({
      path: "event.eventId",
      match: { isActive: true },
    })
    .then((club) => {
      for (const key in club) {
        switch (dateFormat(club[key].registerDate, "m")) {
          case "1":
            arr1.push(club[key]);
            fillter[0] = arr1.length;
            break;
          case "2":
            arr2.push(club[key]);
            fillter[1] = arr2.length;
            break;
          case "3":
            arr3.push(club[key]);
            fillter[2] = arr3.length;
            break;
          case "4":
            arr4.push(club[key]);
            fillter[3] = arr4.length;
            break;
          case "5":
            arr5.push(club[key]);
            fillter[4] = arr5.length;
            break;
          case "6":
            arr6.push(club[key]);
            fillter[5] = arr6.length;
            break;
          case "7":
            arr7.push(club[key]);
            fillter[6] = arr7.length;
            break;
          case "8":
            arr8.push(club[key]);
            fillter[7] = arr8.length;
            break;
          case "9":
            arr9.push(club[key]);
            fillter[8] = arr9.length;
            break;
          case "10":
            arr10.push(club[key]);
            fillter[9] = arr10.length;
            break;
          case "11":
            arr11.push(club[key]);
            fillter[10] = arr11.length;
            break;
          case "12":
            arr12.push(club[key]);
            fillter[11] = arr12.length;
            break;
          default:
            break;
        }
      }
      res.send(fillter);
    });
};

// Create Schedule Of Club
const addSchedule = (req, res) => {
  const { id } = req.params;
  let { date, room, content, note } = req.body;
  const newSchedule = new Schedule({
    date,
    room,
    content,
    note,
  });
  if (Club.findById(id)) {
    newSchedule.save().then((schedule) => {
      Club.findByIdAndUpdate(id).then((club) => {
        club.schedule.push({ scheduleId: schedule._id });
        club.save();
        res.send({ Club: club, Schedule: schedule });
      });
    });
  }
};
const getAllScheduleOfClub = (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  Club.findById(id)
    .populate({ path: "schedule.scheduleId", match: { isActive: true } })
    .exec(function (err, club) {
      _.remove(club.schedule, function (n) {
        return n.scheduleId === null;
      });
      console.log("club", club);
      club.schedule.sort(function (a, b) {
        return new Date(b.registerDate) - new Date(a.registerDate);
      });
      console.log("đá");
      if (err) return handleError(err);
      res.send(club.schedule);
    });
};

const sendFeedBack = (req, res) => {
  const { idClub } = req.params;
  const { feedBack, rate } = req.body;
  const token = req.header("Authorization");
  const KEY = "LouisPanda";
  const decoded = jwt.verify(token, KEY);

  Club.findByIdAndUpdate(idClub)
    .populate({ path: "feedBack.studentId" })
    .then((club) => {
      let studentIdArr = [];
      let rateArr = [];
      let average = 0;
      let tmp = 0;
      let dem = 0;
      club.students.forEach((item) => {
        if (item.isConfirmJoin === true) {
          studentIdArr.push({ item: item.studentId.toString() });
        }
      });

      if (_.some(studentIdArr, { item: decoded.payload.id })) {
        club.feedBack.push({ studentId: decoded.payload.id, feedBack, rate });
        club.feedBack.forEach((element) => {
          rateArr.push(element.rate);
        });
        for (let i = 0; i < rateArr.length; i++) {
          dem = i;
          tmp += Number(rateArr[i]);
          average = tmp;
        }
        club.memberRate = average / (dem + 1);
        club.save();
        res.send(club.feedBack);
      } else {
        res.send({ message: "Ban chua tham gia club" });
      }
    });
};

const updateImageLogo = (req, res) => {
  const { id } = req.params;
  Club.findByIdAndUpdate(id).then((club) => {
    club.clubLogo = req.file.path;
    club.save();
    res.send(club);
  });
};

const updateImageStruc = (req, res) => {
  const { id } = req.params;
  Club.findByIdAndUpdate(id).then((club) => {
    club.clubStructureImage = req.file.path;
    club.save();
    res.send(club);
  });
};

//get all feedback
const getAllFeedback = (req, res) => {
  const { idClub } = req.params;

  Club.findById(idClub)
    .populate({ path: "feedBack.studentId", select: "info" })
    .then((club) => {
      club.feedBack.sort(function (a, b) {
        return new Date(b.registerDate) - new Date(a.registerDate);
      });
      res.send(club.feedBack);
    });
};

//delete club infomation
const deleteSchedule = (req, res) => {
  const { id } = req.params;
  Schedule.findByIdAndUpdate(id)
    .then((schedule) => {
      schedule.isActive = false;
      schedule.save();
      res.send(schedule);
    })
    .then((schedule) => res.status(200).json(schedule))
    .catch((err) =>
      res.status(400).send({
        message: " he thong dang bao tri",
      })
    );
};

//delete club infomation

const deleteClub = (req, res) => {
  const { idClub } = req.params;
  Club.findByIdAndDelete(idClub)
    .then((club) => {
      console.log("club.clubAdmin[0]", club.clubAdmin[0]);
      if (club.clubAdmin.length > 0) {
        Student.findByIdAndUpdate(club.clubAdmin[0].studentId).then(
          (student) => {
            console.log("student", student);
            student.userType = "user";
            if (student.club.length > 0) {
              for (const key in student.club) {
                if (student.club.hasOwnProperty(key)) {
                  const element = student.club[key];
                  if (element.clubId == idClub) {
                    console.log("key", key);
                    student.club.splice(key, 1);
                    student.save();
                  }
                }
              }
            }
            student.save();
          }
        );
      }
      club.event.forEach((element) => {
        Event.findByIdAndDelete(element.eventId.toString())
          .then((event) => {
            event.save();
          })
          .catch((err) => err);
      });
      _.remove(club.event, function (n) {
        return n;
      });
      _.remove(club.students, function (n) {
        return n;
      });
      _.remove(club.feedBack, function (n) {
        return n;
      });
      _.remove(club.schedule, function (n) {
        return n;
      });
      _.remove(club.clubAdmin, function (n) {
        return n;
      });
      club.save();
      res.send(club);
    })
    .catch((err) => {
      console.log("err", err);
      return res.status(400).send({
        message: " he thong dang bao tri",
      });
    });
};

const updateImageBanner = (req, res) => {
  const { id } = req.params;
  console.log("id", req.file.path);
  Club.findByIdAndUpdate(id).then((club) => {
    club.clubImage = req.file.path;
    club.save();
    res.send(club);
  });
};

//update club infomation
const updateSchedule = async (req, res) => {
  const { isValid, errors } = await validateUpdateSchedule(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { room, content, note, date } = req.body;
  const { id } = req.params;
  Schedule.findByIdAndUpdate(id)
    .then((schedule) => {
      schedule.date = date;
      schedule.room = room;
      schedule.content = content;
      schedule.note = note;
      schedule.save();
      res.send(schedule);
    })
    .then((schedule) => res.status(200).json(schedule))
    .catch((err) =>
      res.status(400).send({
        message: " he thong dang bao tri",
      })
    );
};

//delete club infomation
const updateInfoText = async (req, res) => {
  const { isValid, errors } = await validateInformationClub(req.body);
  if (!isValid) return res.status(400).json(errors);
  const {
    clubDesc,
    clubEmail,
    clubFace,
    clubFunction,
    clubHistory,
    clubName,
    clubPhone,
    clubPurpose,
    clubGroupType,
  } = req.body;
  const { id } = req.params;
  Club.findByIdAndUpdate(id)
    .then((club) => {
      club.clubDesc = clubDesc;
      club.clubEmail = clubEmail;
      club.clubFace = clubFace;
      club.clubFunction = clubFunction;
      club.clubHistory = clubHistory;
      club.clubName = clubName;
      club.clubPhone = clubPhone;
      club.clubPurpose = clubPurpose;
      club.clubGroupType = clubGroupType;
      club.save();
    })
    .then((club) => res.status(200).json(club))
    .catch((err) =>
      res.status(400).send({
        message: " he thong dang bao tri",
      })
    );
};

const getChartStudentOfClub = (req, res) => {
  const { idClub } = req.params;
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

  Club.findById(idClub).then((club) => {
    console.log("club", club);
    for (const key in club.students) {
      if (club.students[key].isConfirmJoin == true) {
        switch (dateFormat(club.students[key].registerDate, "m")) {
          case "1":
            arr1.push(club[key]);
            fillter[0] = arr1.length;
            break;
          case "2":
            arr2.push(club[key]);
            fillter[1] = arr2.length;
            break;
          case "3":
            arr3.push(club[key]);
            fillter[2] = arr3.length;
            break;
          case "4":
            arr4.push(club[key]);
            fillter[3] = arr4.length;
            break;
          case "5":
            arr5.push(club[key]);
            fillter[4] = arr5.length;
            break;
          case "6":
            arr6.push(club[key]);
            fillter[5] = arr6.length;
            break;
          case "7":
            arr7.push(club[key]);
            fillter[6] = arr7.length;
            break;
          case "8":
            arr8.push(club[key]);
            fillter[7] = arr8.length;
            break;
          case "9":
            arr9.push(club[key]);
            fillter[8] = arr9.length;
            break;
          case "10":
            arr10.push(club[key]);
            fillter[9] = arr10.length;
            break;
          case "11":
            arr11.push(club[key]);
            fillter[10] = arr11.length;
            break;
          case "12":
            arr12.push(club[key]);
            fillter[11] = arr12.length;
            break;
          default:
            break;
        }
      }
    }
    res.send(fillter);
  });
};

const searchFeedBack = (req, res) => {
  const { searchFeedBack } = req.body;
  const { idClub } = req.params;
  Club.findById(idClub)
    .populate({
      path: "feedBack.studentId",
    })
    .exec(function (err, club) {
      if (searchFeedBack == "") {
        return res.send(
          club.feedBack.sort(function (a, b) {
            return new Date(b.registerDate) - new Date(a.registerDate);
          })
        );
      }
      let a = club.feedBack
        .filter((x) => {
          return x.feedBack == searchFeedBack;
        })
        .sort(function (a, b) {
          return new Date(b.registerDate) - new Date(a.registerDate);
        });
      return res.send(a);
    });
};
//search event
const searchSchedule = (req, res) => {
  const { searchSchedule } = req.body;
  const { idClub } = req.params;
  var nameRegex = new RegExp(searchSchedule.toLowerCase(), "i");
  console.log("nameRegex", nameRegex);

  Club.findById(idClub)
    .populate({
      path: "schedule.scheduleId",
      match: {
        $or: [
          { room: { $regex: nameRegex } },
          { content: { $regex: nameRegex } },
          { note: { $regex: nameRegex } },
        ],
        isActive: true,
      },
    })
    .exec(function (err, club) {
      _.remove(club.schedule, function (n) {
        return n.scheduleId === null;
      });
      res.send(club.schedule);
    });
};

//search Student
const searchStudent = (req, res) => {
  const { searchStudent } = req.body;
  const { idClub } = req.params;
  var nameRegex = new RegExp(searchStudent.toLowerCase(), "i");
  console.log("nameRegex", nameRegex);

  Club.findById(idClub)
    .populate({
      path: "students.studentId",
      match: {
        $or: [
          { "info.fullName": { $regex: nameRegex } },
          { "info.major": { $regex: nameRegex } },
          { mssv: { $regex: nameRegex } },
        ],
        // isConfirmJoin: true,
      },
    })
    .exec(function (err, club) {
      console.log("club", club);
      _.remove(club.students, function (n) {
        return n.studentId === null;
      });
      res.send(club.students);
    });
};
module.exports = {
  searchStudent,
  updateSchedule,
  searchSchedule,
  createClub,
  getAllClub,
  uploadClub,
  getClubById,
  searchClub,
  fillterClub,
  addSchedule,
  getAllScheduleOfClub,
  sendFeedBack,
  getAllFeedback,
  deleteSchedule,
  updateImageLogo,
  updateInfoText,
  updateImageStruc,
  getChartStudentOfClub,
  searchFeedBack,
  deleteClub,
  updateImageBanner,
};
