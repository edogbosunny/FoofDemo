import chai from "chai";
import chaiHttp from "chai-http";

import db from "../server/config/db";
import createTables from "../server/models/index";
import app from "../app";
const { expect, should } = chai;
chai.use(chaiHttp);
let token;

describe("#user-SignIn /POST", () => {
  it("User should be able to sign in and get token", done => {
    chai
      .request(app)
      .post("/signin")
      .send({ email: "test@gmail.com", password: "123456" })
      .end((err, res) => {
        token = res.body.token;
        expect(res).to.be.an("object");
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property("token")
          .length.greaterThan(12);
        done();
      });
  });
  it("#Test for empty login fields", done => {
    chai
      .request(app)
      .post("/signin")
      .send({})
      .end((err, res) => {
        expect(res).to.be.an("object");
        expect(res.body)
          .to.have.property("token")
          .eqls(null);
        done();
      });
  });
  it("#Unregistered emails cannot login", done => {
    chai
      .request(app)
      .post("/signin")
      .send({ email: "aaaaa@aaa.com", paassword: "1234" })
      .end((err, res) => {
        expect(res).to.be.an("object");
        expect(res.body)
          .to.have.property("token")
          .eqls(null);
        done();
      });
  });
  it("#Wrong Passwords cannot login", done => {
    chai.request(app)
    .post("/signin")
    .send({ email: "test@test.com", password: "123444" }).end((err, res) => {
      expect(res).to.be.an("object");
      expect(res.body)
        .to.have.property("token")
        .eqls(null);
      done();
    });
  });
});
