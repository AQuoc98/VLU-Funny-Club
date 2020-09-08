process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../server");
var should = chai.should();

chai.use(chaiHttp);

describe("Test API event", () => {
  describe("/Get", () => {
    it("GET ALL EVENT", (done) => {
      chai
        .request(app)
        .get("/api/event/getAll")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
    it("GET SEARCH EVENT", (done) => {
      chai
        .request(app)
        .get("/api/event/searchEvent")
        .end((err, res) => {
          done();
        });
    });
    it("GET FILLTER EVENT", (done) => {
      chai
        .request(app)
        .get("/api/event/fillterEvent")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("Get:id", () => {
    it("Get event club by idclub", (done) => {
      let id = "";
      chai
        .request(app)
        .get("/api/event/getEventClub/" + id)
        .end((err, res) => {
          done();
        });
    });
    it("Get event club by idEvent", (done) => {
      let id = "";
      chai
        .request(app)
        .get("/api/event/getIdById/" + id)
        .end((err, res) => {
          done();
        });
    });
    describe("/post", () => {
      it("Create Event", (done) => {
        let event = {
          time: "123123",
          eventTitle: "12312",
          eventDesc: "222222",
          eventAddress: "2222",
        };
        let imageEvent =
          "https://res.cloudinary.com/dlum5lyh2/image/upload/v1595253894/SEP_Phong/ImageEvent/1595253892705.jpg";
        chai
          .request(app)
          .post("/api/event/create" + imageEvent)
          .send(event)
          .end((err, res) => {
            done();
          });
      });
    });
  });
  describe("/Put", () => {
    it("Upload Event", (done) => {
      let id = "";
      chai
        .request(app)
        .put("/api/event/update" + id)
        .send({
          time: "111",
          eventTitle: "111",
          eventDesc: "111",
          eventAddress: "1111",
        })
        .end((err, res) => {
          done();
        });
    });
    it("delete event", (done) => {
      let id = "";
      chai
        .request(app)
        .put("/api/event/deleteEvent" + id)
        .send({
          isActive: "false",
        })
        .end((err, res) => {
          done();
        });
    });
    it("update file", (done) => {
      let id = "";
      chai
        .request(app)
        .put("/api/event/updateFile/" + id)
        .send({
          eventImage:
            "https://res.cloudinary.com/dlum5lyh2/image/upload/v1595748138/SEP_Phong/ImageAvatar/1595748138125.jpg",
        })
        .end((err, res) => {
          done();
        });
    });
  });
});
