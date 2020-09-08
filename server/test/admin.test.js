process.env.NODE_ENV = 'test';

var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../server");
var should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe("Test Admin /POST API", () => {
    describe("/POST register", () => {
        it("it Should register admin account", (done) => {
            let regis_admin_detail = {
                userName: "admin",
                passWord: "123123",
            };
            chai.request(app)
                .post("/api/admin/register")
                .send(regis_admin_detail)
                .end((res) => {
                    done();
                });
        });
    });
    describe("/POST register Staff", () => {
        it("it Should register Staff account", (done) => {
            let staff_detail = {
                userName:"Staff2",
                passWord:"213231",
                fullName:"staff 231"
            };
            chai.request(app)
                .post("/api/admin/registerStaff")
                .send(staff_detail)
                .end((res) => {
                    done();
                });
        });
    });
});