import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const { expect, should } = chai;
chai.use(chaiHttp);

describe("#GET /getallorders", () => {
  it("should return response 200", done => {
    chai
      .request(app)
      .get("/getallorders")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });
});
