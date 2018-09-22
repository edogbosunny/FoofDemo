import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const { expect, should } = chai;
chai.use(chaiHttp);
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTM3MjUyNTM1LCJleHAiOjE1MzczMzg5MzV9.7M5BI00ezWOkHyNTY6ONcT0gTxXeS0VDzPYPp7Xp-pk";
let orderToken;

describe("#GET /orders", () => {
  it("should return response 200", done => {
    chai
      .request(app)
      .get("/orders")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res).to.be.an("object");
        done();
      });
  });
});

describe("#GET Single Order", () => {
  it("should return a single order", done => {
    chai
      .request(app)
      .get("/orders/1")
      .end((err, res) => {
        expect(res).to.be.an("object");
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("#JWT Test", () => {
  it("should return jwt expired", done => {
    chai
      .request(app)
      .post("/order")
      .set("x-access-token", token)
      .end((err, res) => {
        expect(res).to.be.an("object");
        expect(res.body.err)
          .to.have.property("name")
          .eqls("TokenExpiredError");
        done();
      });
  });
  it("#Should return status 401 when no token is provided", done => {
    chai
      .request(app)
      .post("/order")
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it("#Should return status 401 when no token is provided", done => {
    chai
      .request(app)
      .post("/order")
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
describe("#Update Product /order PUT", () => {
  it("#user should login first to acces token to update product", done => {
    chai
      .request(app)
      .post("/signin")
      .send({ email: "test@gmail.com", password: "123456" })
      .end((err, res) => {
        orderToken = res.body.token;
        // console.log(orderToken);
        expect(res).to.have.status(201);
        done();
      });
  });
  it("#should be able to update product", () => {
    chai
      .request(app)
      .put("/update/1")
      .send({
        meal: "rice",
        quantity: "0",
        price: "NA",
        status: "pending"
      })
      .end((err, res) => {
        expect(res).to.have.a.status(200);
      });
  });
});
