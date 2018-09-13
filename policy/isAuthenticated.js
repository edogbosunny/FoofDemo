import jwt from "jsonwebtoken";
import config from "../config/default";

class isAuthenticated {
  static authenticationCheck(req, res, next) {
    const token = req.headers["x-access-token"];
    console.log("token", token);
    if (!token) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: "no token provided"
      });
    }
    const decoded = jwt.verify(token, config.tokenSecret);
    if (decoded) {
      req.app.set("user_id", decoded.id);
      next();
    } else {
      return res.statuse(401).json({
        auth: false,
        token: null,
        message: "failed to authenticate token"
      });
    }
  }
}

export default isAuthenticated;
