process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../server");
var should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe("Pets", () => {
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done();
  });
});
describe("Test club API", () => {
  describe("/Get", () => {
    it("GET ALL CLUB", (done) => {
      chai
        .request(app)
        .get("/api/club/getAllClub")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
    it("SEARCH CLUB", (done) => {
      chai
        .request(app)
        .get("/api/club/searchClub")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
    it("FILLTER CLUB", (done) => {
      chai
        .request(app)
        .get("/api/club/fillterClub")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/Get:id", () => {
    it("Get Club by Id", (done) => {
      let id = "";
      chai
        .request(app)
        .get("/api/club/getClubById/" + id)
        .end((err, res) => {
          done();
        });
    });
    it("Get all feedBack", (done) => {
      let id = "";
      chai
        .request(app)
        .get("/api/club/getAllFeedback/" + id)
        .end((err, res) => {
          done();
        });
    });

    it("Get all schedule of club", (done) => {
      let id = "";
      chai
        .request(app)
        .get("/api/club/getAllScheduleOfClub/" + id)
        .end((err, res) => {
          done();
        });
    });
    it("Search student", (done) => {
      let idClub ="";
      chai
        .request(app)
        .get("/api/club/searchStudent" + idClub)
        .end((err, res) => {
          done();
        });
    });
    it("Search schedule", (done) => {
      let idClub ="";
      chai
        .request(app)
        .get("/api/club/searchSchedule" + idClub)
        .end((err, res) => {
          done();
        });
    });
    it("Search feedback", (done) => {
      let idClub = "";
      chai
        .request(app)
        .get("/api/club/searchFeedback" + idClub)
        .end((err, res) => {
          done();
        });
    });
    it("Get chart student of club", (done) => {
      let idClub = "";
      chai
        .request(app)
        .get("/api/club/getChartStudentOfClub" + idClub)
        .end((err, res) => {
          done();
        });
    });
  });
  describe("/post", () => {
    it("Create club", (done) => {
      let club = {
        clubName: "thao",
        clubGroupType: "1",
        clubDesc: "123123",
        clubEmail: "12312312",
        clubHistory: "123123123",
        imageClub: "123123123",
      };
      let image =
        "https://res.cloudinary.com/dlum5lyh2/image/upload/v1595228479/SEP_Phong/ImageClub/1595228476814.png";
      chai
        .request(app)
        .post("/api/club/create/" + image)
        .send(club)
        .end((err, res) => {
          done();
        });
    });

    it("Add schedule", (done) => {
      let schedule = {
        date: "20/05/1234",
        room: "1",
        content: "bla bla bla",
        note: "12312312",
      };
      let id = "";
      chai
        .request(app)
        .post("/api/club/addSchedule/" + id)
        .send(schedule)
        .end((err, res) => {
          done();
        });
    });

    it("Send feedback", (done) => {
      let feedback = {
        feedBack: "12312sdfdsfsd",
        rate: "1",
        studentId: "",
      };
      let id = "5f15413f0f878c2248b17292";
      chai
        .request(app)
        .post("/api/club/createFeedBack/" + id)
        .send(feedback)
        .end((err, res) => {
          done();
        });
    });
  });
  describe("/Put", () => {
    it("Update Club", (done) => {
      let id = "5f1e890a4d34d23684730dea";
      chai
        .request(app)
        .put("/api/club/update/" + id)
        .send({
          clubPhone: "222",
          clubEmail: "222",
          clubDesc: "2222",
        })
        .end((err, res) => {
          done();
        });
    });
    it("Update file Struc", (done) => {
      let id = "5f1e890a4d34d23684730dea";
      chai
        .request(app)
        .put("/api/club/updateFileStruc" + id)
        .send({
          clubStructureImage:
            "https://res.cloudinary.com/dlum5lyh2/image/upload/v1595836678/SEP_Phong/ImageClub/1595836677839.jpg",
        })
        .end((err, res) => {
          done();
        });
    });
    it("Update file Logo", (done) => {
      let id = "5f1e890a4d34d23684730dea";
      chai
        .request(app)
        .put("/api/club/updateFileLogo" + id)
        .send({
          clubLogo:
            "https://res.cloudinary.com/dlum5lyh2/image/upload/v1595836680/SEP_Phong/ImageClub/1595836679462.jpg",
        })
        .end((err, res) => {
          done();
        });
    });
    it("Update Image Banner", (done) => {
      let id = "5f1e890a4d34d23684730dea";
      chai
        .request(app)
        .put("/api/club/updateImageBanner" + id)
        .send({
          clubImage:
            "https://res.cloudinary.com/dlum5lyh2/image/upload/v1595836680/SEP_Phong/ImageClub/1595836679462.jpg",
        })
        .end((err, res) => {
          done();
        });
    });
    it("Update info text", (done) => {
      let id = "5f1e890a4d34d23684730dea";
      chai
        .request(app)
        .put("/api/club/updateInfoText" + id)
        .send({
          clubDesc: "123123123",
          clubEmail: "12131231",
          clubFace: "123123",
          clubFunction: "123123",
          clubHistory: "123123123",
          clubName: "1231231",
          clubPhone: "123123123",
          clubPurpose: "!23123123",
          clubGroupType: "123123123123",
        })
        .end((err, res) => {
          done();
        });
    });
    it("Delete schedule", (done) => {
      let id = "5f1e890a4d34d23684730dea";
      chai
        .request(app)
        .put("/api/club/deleteSchedule" + id)
        .send({
          isActive: "false",
        })
        .end((err, res) => {
          done();
        });
    });
    it("Update Schedule", (done) => {
      let id = "5f1e890a4d34d23684730dea";
      chai
        .request(app)
        .put("/api/club/updateSchedule" + id)
        .send({
          date: "111",
          room: "11",
          content: "1",
          note: "1",
        })
        .end((err, res) => {
          done();
        });
    });
    it("Delete Club", (done) => {
      let id = "";
      chai
        .request(app)
        .put("/api/club/deleteSchedule" + id)
        .send({
          isActive: "false",
        })
        .end((err, res) => {
          done();
        });
    });
  });
});
