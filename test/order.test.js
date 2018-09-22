import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const { expect, should } = chai;
chai.use(chaiHttp);
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTM3MjUyNTM1LCJleHAiOjE1MzczMzg5MzV9.7M5BI00ezWOkHyNTY6ONcT0gTxXeS0VDzPYPp7Xp-pk";

let userToken;
let orderToken;
let addOrderToken;

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
describe("#Update Product /order =PUT", () => {
  it("#user should login first to acces token to update product", done => {
    chai
      .request(app)
      .post("/signin")
      .send({ email: "test@gmail.com", password: "123456" })
      .end((err, res) => {
        orderToken = res.body.token;
        console.log(orderToken);
        expect(res).to.have.status(201);
        done();
      });
  });
  it("#should be able to update product", done => {
    chai
      .request(app)
      .put("/update/1")
      .set("x-access-token", orderToken)
      .send({
        meal: "rice",
        quantity: "0",
        price: "NA",
        status: "pending"
      })
      .end((err, res) => {
        expect(res).to.have.a.status(200);
        done();
      });
  });
});

// return error when user tries to update product
describe("#Update Product /order PUT", () => {
  it("#user should login first to acces token to update product", done => {
    chai
      .request(app)
      .post("/signin")
      .send({ email: "test@test.com", password: "123456" })
      .end((err, res) => {
        userToken = res.body.token;
        expect(res).to.have.status(201);
        done();
      });
  });
  it("#user cannot update product because he is not an admin", done => {
    chai
      .request(app)
      .put("/update/1")
      .set("x-access-token", userToken)
      .send({
        meal: "rice",
        quantity: "0",
        price: "NA",
        status: "pending"
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

//test to make order fail
describe("#Add Empty order Product /order =POST", () => {
  it("#user should login first to acces token to add product order", done => {
    chai
      .request(app)
      .post("/signin")
      .send({ email: "test@gmail.com", password: "123456" })
      .end((err, res) => {
        addOrderToken = res.body.token;
        // console.log(orderToken);
        expect(res).to.have.status(201);
        done();
      });
  });
  it("#should be able to update product", done => {
    chai
      .request(app)
      .put("/update/1")
      .set("x-access-token", addOrderToken)
      .send({})
      .end((err, res) => {
        expect(res).to.have.a.status(400);
        done();
      });
  });

  it("#should be able to add empty product order", done => {
    chai
      .request(app)
      .post("/order")
      .set("x-access-token", orderToken)
      .send({ meal: null, status: "", quantity: "", price: "" })
      .end((err, res) => {
        expect(res).to.have.a.status(400);
        done();
      });
  });
});

//return error for when deleting an order that does not exist
describe("#Delete /orders/900", () => {
  it("#return 400 error ", done => {
    chai
      .request(app)
      .del("/orders/9000")
      .set("x-access-token", orderToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
