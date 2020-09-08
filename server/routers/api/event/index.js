// 3rd packages
const express = require("express");
const router = express.Router();

// midleware
const { authenticating, authorizing } = require("../../../middlewares/auth");
const upload = require("../../../middlewares/uploadImage");

// Club Controller
const eventController = require("./event");

// router: /api/event/create
//desc: create event
// access: private
router.post(
  "/create/:type",
  upload.single("imageEvent"),
  eventController.createEvent
);

// router: /api/event/getAll
//desc: get all event
// access: public
router.get("/getAll", eventController.getAllEvent);

//router: /api/event/update
//desc : update event
//access: private
router.put("/update/:id", eventController.uploadEvent);

//router: /api/event/updateFile
//desc : update event
//access: private
router.put(
  "/updateFile/:type/:id",
  upload.single("imageEvent"),
  eventController.updateFile
);

//router: /api/event/delete
//desc : delete event
//access : private
router.put(
  "/delete/:idEvent",
  // authenticating,
  // authorizing(["adminClub" ]),
  eventController.deleteEvent
);

//router: /api/event/search
//desc : search event
//access : private
router.post("/searchEvent/:idClub", eventController.searchEvent);

//router : /api/event/getEventClub
//desc : get event in club
//access : private
router.get("/getEventClub/:idClub", eventController.getEventClub);

//router : /api/event/getEventClub
//desc : get event in club
//access : private
router.get("/getIdById/:id", eventController.getEventById);

//router : /api/event/fillterEvent
//desc : fillter event
//access : private
router.get(
  "/fillterEvent",
  // authenticating,
  // authorizing(["admin", "adminClub", "staff"]),
  eventController.fillterEvent
);

module.exports = router;
