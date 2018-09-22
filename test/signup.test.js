import chai from "chai";
import chaiHttp from "chai-http";

import db from "../server/config/db";
import createTables from "../server/models/index";
import app from "../app";
const { expect } = chai;
chai.use(chaiHttp);
let token;

describe("#Signup /signup POST", () => {
  it("#should return status 400 email exists", done => {
    chai
      .request(app)
      .post("/signup")
      .send({
        username: "test",
        email: "testp@gmail.com",
        password: "123456",
        password2: "123456"
      })
      .end((err, res) => {
        expect(res).to.be.an("object");
        expect(res).to.have.status(400);
        expect(res.body.message).to.eqls("user with email already exists");

        done();
      });
  });
  it("#should return 400 status for empty credentials", done => {
    chai
      .request(app)
      .post("/signup")
      .send({})
      .end((err, res) => {
        expect(res).to.be.an("object");
        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property("token")
          .eqls(null);
        done();
      });
  });

  it("#should return 400 password do not match", done => {
    chai
      .request(app)
      .post("/signup")
      .send({
        username: "test",
        email: "test123@gmail.com",
        password: "123456",
        password2: "1234567"
      })
      .end((err, res) => {
        expect(res).to.be.an("object");
        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property("token")
          .eqls(null);
        done();
      });
  });

  
});
