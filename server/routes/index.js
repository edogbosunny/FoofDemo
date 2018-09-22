import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import signUpController from "../controllers/signupController";
import signInController from "../controllers/signinController";
import orderController from "../controllers/orderController";
import isAuthenticated from "../policy/isAuthenticated";
import isAdmin from "../policy/isAdmin";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

//defaultl home route
router.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "welcome home"
  });
});

router.post("/signup", signUpController.signUpCtr);
router.post("/signin", signInController.signinCtr);
router.post("/order", [
  isAuthenticated.authenticationCheck,
  isAdmin.isAdmin,
  orderController.addOrder
]);
router.get("/orders", orderController.getAllOrder);
router.get("/orders/:id", orderController.getSingleOrder);
router.delete("/orders/:id", orderController.deleteOrder);
// router.delete("/user/:id", signUpController.deleteUser);
router.put("/update/:id", orderController.updateOrder);

export default router;
