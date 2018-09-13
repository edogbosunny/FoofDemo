import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import signUpController from "../controllers/signupController";
import isAuthenticated from "../policy/isAuthenticated";

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

export default router;
