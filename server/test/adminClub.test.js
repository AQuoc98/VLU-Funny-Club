process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Admin = require("../models/admin.model");

var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../server");
var should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe("Test Admin Club /POST API", () => {
    describe("/POST Access for Student", () => {
        it("it Should Access for Student", (done) => {
            let idStudent = "5f1842d646901a259c5610a7";
            let idClub = "5f17d6c8d6fd020045488dfa";
            chai.request(app)
                .post("/api/adminClub/accessForStudent/"+ idStudent +"/" + idClub)
                .end((err, res) => {
                    done();
                });
        });
    });
    describe("/POST Access Admin for Club", () => {
        it("it Should Access Admin for Club", (done) => {
            let idStudent = "5f1842d646901a259c5610a7";
            let idClub = "5f17d6c8d6fd020045488dfa";
            chai.request(app)
                .post("/api/adminClub/accessAdminForClub/"+ idStudent +"/" + idClub)
                .end((err, res) => {
                    done();
                });
        });
    });
});

describe("Test Admin Club /PUT API", () => {
    describe("/PUT remove student", () => {
        it("it Should remove student for club", (done) => {
            let idStudent = "5f1842d646901a259c5610a7";
            let idClub = "5f17d6c8d6fd020045488dfa";
            chai.request(app)
                .put("/api/adminClub/removeStudent/"+ idStudent + "/" + idClub)
                .end((res) => {
                    done();
                });
        });
    });
    describe("/PUT remove adminClub", () => {
        it("it Should remove admin Club", (done) => {
            let idStudent = "5f1842d646901a259c5610a7";
            let idClub = "5f17d6c8d6fd020045488dfa";
            chai.request(app)
                .put("/api/adminClub/removeAdminClub/" + idStudent + "/" + idClub)
                .end((res) => {
                    done();
                });
        });
    });
});