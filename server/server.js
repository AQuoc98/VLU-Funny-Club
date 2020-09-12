// 3rd packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");

// connect mongoose
const { mongoURI } = require("./config/keys");

// create app by express
const app = express();

// Middleware : cors
app.use(cors());

// create port
const port = process.env.PORT || 5000;

// mongoose connect to db
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  // callback connect on port server
  () => {
    app.listen(port, () => {
      console.log("connect success full " + port);
    });
  }
);
// .then(() => console.log("Connected to DB"))
// .catch((err) => console.log("TCL: err", err));

// Middleware : body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, token"
  );
  next();
});

// Api student
app.use("/api/student", require("./routers/api/student/index"));

// Api admin
app.use("/api/admin", require("./routers/api/admin/index"));

// Api club
app.use("/api/club", require("./routers/api/club/index"));

// Api Event
app.use("/api/event", require("./routers/api/event/index"));

// Api Event
app.use("/api/adminClub", require("./routers/api/adminClub/index"));

//api banner
app.use("/api/banner", require("./routers/api/banner/index"));

module.exports = app;
