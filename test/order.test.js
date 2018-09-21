import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const { expect, should } = chai;
chai.use(chaiHttp);

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
