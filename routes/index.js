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
  isAuthenticated.authenticationCheck, isAdmin.isAdmin,
  orderController.addOrder
]);
router.get("/getallorders", orderController.getAllOrder);
router.get("/getorder/:id", orderController.getSingleOrder);
router.post("/delorder/:id", orderController.deleteOrder);
router.post("/update/:id", orderController.updateOrder);

export default router;
