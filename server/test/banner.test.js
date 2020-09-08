process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../server");
var should = chai.should();

chai.use(chaiHttp);

describe("Test API banner", () => {
    describe("/Post", () => {
        it("Create banner", (done) => {
            let banner = {
                bannerImage:"12313123"
            }
            let image = "https://res.cloudinary.com/dlum5lyh2/image/upload/v1595253894/SEP_Phong/ImageEvent/1595253892705.jpg"
            chai.request(app)
            .post("/api/banner/create/" + image)
            .send(banner)
            .end((err, res) => {
                done();
            })
        })
    })
    describe("/Put", () => {
        it("Delete banner", (done) => {
            let id ="";
            chai.request(app)
            .put("/api/banner/deleteBanner/" + id)
            .send({
                isActive: "false"
            })
            .end((err , res) => {
                done();
            })
        })
    })
    describe("/Get", () => {
        it("get all banner", (done) => {
            chai.request(app)
            .put("/api/banner/getAllBanner")
            .end((err , res) => {
                done();
            })
        })
        it("get all banner home page", (done) => {
            chai.request(app)
            .put("/api/banner/getAllBannerForHomePage")
            .end((err , res) => {
                done();
            })
        })
    })
})