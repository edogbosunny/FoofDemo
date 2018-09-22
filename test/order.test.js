import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const { expect, should } = chai;
chai.use(chaiHttp);
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTM3MjUyNTM1LCJleHAiOjE1MzczMzg5MzV9.7M5BI00ezWOkHyNTY6ONcT0gTxXeS0VDzPYPp7Xp-pk";

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
        done();
      });
  });
});
