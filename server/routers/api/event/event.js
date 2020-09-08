// load model
const { Event } = require("../../../models/event.model");
const { Club } = require("../../../models/club.model");

// 3rd packages
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var moment = require("moment-timezone");
var dateFormat = require("dateformat");
const _ = require("lodash");

//validate
const validateEvent = require("../../../validations/ValidateEvent");

// Middleware
const upload = require("../../../middlewares/uploadImage");
const club = require("../club/club");

// register club
const createEvent = async (req, res) => {
  const { isValid, errors } = await validateEvent(req, true);
  if (!isValid) return res.status(200).json({ errors: errors });

  if (!req.file) {
    res.status(200).json({ errors: { path: "Vui lòng nhập file" } });
  }

  const { eventTitle, eventDesc, eventAddress, time } = req.body;

  const eventImagePath = req.file.path;
  const token = req.header("Authorization");
  const KEY = "LouisPanda";
  const decoded = jwt.verify(token, KEY);

  var today = new Date();
  const dateVietNam = moment.tz(today, "Asia/Ho_Chi_Minh");

  const newEvent = new Event({
    time,
    eventTitle,
    eventDesc,
    eventAddress,
    eventImage: eventImagePath,
    Club: decoded.payload.clubId,
    registerDate: dateVietNam,
  });

  newEvent
    .save()
    .then((newEvent) => {
      Club.findByIdAndUpdate(decoded.payload.clubId).then((club) => {
        club.event.push({ eventId: newEvent._id });

        newEvent.save();
        club.save();
      });

      res.status(200).json(newEvent);
    }) // success
    .catch((err) => res.status(400).json(err)); // err
};
// get all  club
const getAllEvent = (req, res) => {
  Event.find({isActive: true})
    .then((event) => {
      _.remove(club.event, function (n) {
        return n.eventId === null;
      });
      event.sort(function (a, b) {
        return new Date(b.registerDate) - new Date(a.registerDate);
      });
      res.send(event);
    });
};

// upload event
const uploadEvent = async (req, res) => {
  const { isValid, errors } = await validateEvent(req);
  if (!isValid) return res.status(200).json({ errors: errors });

  const { id } = req.params;

  try {
    Event.findByIdAndUpdate(id)
      .then((event) => {
        event.time = req.body.time;
        event.eventTitle = req.body.eventTitle;
        event.eventDesc = req.body.eventDesc;
        event.eventAddress = req.body.eventAddress;
        event.save();
        res.send(event);
      })
      .catch((err) =>
        res.status(400).send({
          message: err,
        })
      );
  } catch (error) {
    console.log(" he thong dang bao tri", error);
  }
};

// upload event
const updateFile = async (req, res) => {
  const { id } = req.params;

  try {
    Event.findByIdAndUpdate(id)
      .then((event) => {
        event.eventImage = req.file.path;
        event.save();
        res.send(event);
      })
      .catch((err) =>
        res.status(400).send({
          message: err,
        })
      );
  } catch (error) {
    console.log(" he thong dang bao tri", error);
  }
};

//delete event
const deleteEvent = (req, res) => {
  const { idEvent } = req.params;
  Event.findByIdAndUpdate(idEvent).then((event) => {
    event.isActive = false;
    event.save();
    res.send(event);
  });
};
//search event
const searchEvent = (req, res) => {
  const { searchEvent } = req.body;
  console.log("searchEvent", searchEvent);
  const { idClub } = req.params;
  var nameRegex = new RegExp(searchEvent.toLowerCase(), "i");

  console.log("nameRegex", nameRegex);
  Club.findById(idClub)
    .populate({
      path: "event.eventId",
      match: {
        $or: [
          { eventTitle: { $regex: nameRegex } },
          { eventDesc: { $regex: nameRegex } },
          { eventAddress: { $regex: nameRegex } },
        ],
        isActive: true,
      },
    })
    .exec(function (err, club) {
      _.remove(club.event, function (n) {
        return n.eventId === null;
      });
      res.send(club.event);
    });
};

//get event club
const getEventClub = (req, res) => {
  Club.findById(idClub)
    .populate({ path: "event.eventId", macth: { isActive: true } })
    .then((club) => {
      res.send(club.event);
    });
};

//get event club by id
const getEventById = (req, res) => {
  const { id } = req.params;

  Event.findById(id).populate({
    path: "event.eventId",
    macth: { isActive: true },
  });
  then((club) => {
    _.remove(club.event, function (n) {
      return n.eventId === null;
    });
    res.send(club.event);
  })
    .then((event) => res.status(200).json(event))
    .catch((err) => res.status(400).send({ message: " he thong bao tri" }));
};

//fillter event
const fillterEvent = (req, res) => {
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

  Event.find({isActive:true})
    .then((event) => {
      for (const key in event) {
        switch (dateFormat(event[key].registerDate, "m")) {
          case "1":
            arr1.push(event[key]);
            fillter[0] = arr1.length;
            break;
          case "2":
            arr2.push(event[key]);
            fillter[1] = arr2.length;
            break;
          case "3":
            arr3.push(event[key]);
            fillter[2] = arr3.length;
            break;
          case "4":
            arr4.push(event[key]);
            fillter[3] = arr4.length;
            break;
          case "5":
            arr5.push(event[key]);
            fillter[4] = arr5.length;
            break;
          case "6":
            arr6.push(event[key]);
            fillter[5] = arr6.length;
            break;
          case "7":
            arr7.push(event[key]);
            fillter[6] = arr7.length;
            break;
          case "8":
            arr8.push(event[key]);
            fillter[7] = arr8.length;
            break;
          case "9":
            arr9.push(event[key]);
            fillter[8] = arr9.length;
            break;
          case "10":
            arr10.push(event[key]);
            fillter[9] = arr10.length;
            break;
          case "11":
            arr11.push(event[key]);
            fillter[10] = arr11.length;
            break;
          case "12":
            arr12.push(event[key]);
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
  createEvent,
  getAllEvent,
  uploadEvent,
  deleteEvent,
  searchEvent,
  getEventClub,
  getEventById,
  fillterEvent,
  updateFile,
};
