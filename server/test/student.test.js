process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../server");
var should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

let login_detail = {
    "userName": "admin",
    "passWord": "123",
};
let login_detail2 = {
    "userName": "thanh2",
    "passWord": "123123",
};

describe("Test Student /POST API", () => {
    describe("/POST Login", () => {
        it("it Should be login", (done) => {
            chai.request(app)
                .post("/api/student/login")
                .send(login_detail)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect('Content-Type', /json/);
                    expect(200);
                    expect(res).to.have.status(200);
                    console.log("Login Successfully");
                    done();
                });
        });
    });
    describe("/POST Register", () => {
        it("it Should register", (done) => {
            let register_detail = {
                avataUser: "123123",
                userName: "thanh2",
                passWord: "123",
                passWord2: "123",
                fullName: "thanh",
                mssv: "T1745",
                major: "CNTT",
                classMajor: "K23t3"
              };
            let image = "https://res.cloudinary.com/dlum5lyh2/image/upload/v1595228479/SEP_Phong/ImageClub/1595228476814.png";
            chai.request(app)
                .post("/api/student/registerUser/" + image)
                .send(register_detail)
                .end((err, res) => {
                    done();
                });
        });
    });
    describe("/POST Upload Avata", () => {
        it("it Should upload Avata", (done) => {
            let id = "5ec77db3cbd2163a0ca9dc83";
            let image = "https://res.cloudinary.com/dlum5lyh2/image/upload/v1595228479/SEP_Phong/ImageClub/1595228476814.png";
            chai.request(app)
                .post("/api/student/login")
                .send(login_detail2)
                .end((err, res) => {
                    expect(res.body).to.have.property('token');
                    let token = res.body.token;
                    chai.request(app)
                        .post("/api/student/upload-avatar/users/" + id)
                        .set("Authorization", token)
                        .send(image)
                        .end((err, res) => {
                            done();
                        });
                });
        });
    });
    describe("/POST Join Club", () => {
        it("it Should join club", (done) => {
            let idStudent = "5f1847898853bb1dd8c988db";
            let requestConfirm = "gui yeu cau tham gia"
                            chai.request(app)
                                .post("/api/student/joinClub/" + idStudent)
                                .send(requestConfirm)
                                .end((err, res) => {
                                    done();
                                });
                });
        // });
    });
});
describe("Test student /GET API", () => {
    describe("/GET all User", () => {
        it("it Should Check Token and GET all User", (done) => {
            chai.request(app)
                .post("/api/student/login")
                .send(login_detail2)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.have.property('token');
                    let token = res.body.token;
                    console.log("Login Successfully");
                    chai.request(app)
                        .get("/api/student/getAllUser")
                        .set("Authorization", token)
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            expect(res.body).not.to.be.empty;
                            console.log("--------------------------");
                            console.log("Successfully get all Users");
                            done();
                        });
                });
        });
    });
    describe("/GET User by Id", () => {
        it("it Should GET User by Id", (done) => {
            let id = '5ec77db3cbd2163a0ca9dc83';
            chai.request(app)
                .post("/api/student/login")
                .send(login_detail)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.have.property('token');
                    let token = res.body.token;
                    console.log("Login Successfully");
                    chai.request(app)
                        .get("/api/student/"+ id)
                        .set("Authorization", token)
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            console.log("--------------------------");
                            console.log("Successfully get User by Id");
                            done();
                        });
                });
        });
    });
});

describe("Test student /POST API", () => {
    describe("/PUT update password", () => {
        it("it Should update passWord", (done) => {
            let updatePass = {
                password: "123",
                newPassword: "123123",
                password2: "123123"
            };
            chai.request(app)
                .post("/api/student/login")
                .send(login_detail)
                .end((err, res) => {
                    expect(res.body).to.have.property('token');
                    let token = res.body.token;
                    chai.request(app)
                        .put("/api/student/updatePassword")
                        .set("Authorization", token)
                        .send(updatePass)
                        .end((res) => {
                            done();
                        });
                });
        });
    });
});