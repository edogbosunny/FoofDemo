import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import db from "../config/db";
import config from "../config/default";
import validateSignin from "../validation/signup";

class signUp {
  static signUpCtr(req, res) {
    let { user_id, username, email, password } = req.body;
    const { errors, isValid } = validateSignin(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: "failed",
        token: null,
        error: errors
      });
    } else {
      (async () => {
        try {
          const genSalt = bcrypt.genSaltSync(8);
          const hashpassword = bcrypt.hashSync(password, genSalt);
          const userExist = await db.query(
            `SELECT *  FROM users WHERE email = $1`,
            [email]
          );
          if (userExist.rowCount > 0) {
            return res.status(400).json({
              message: "user with email already exists",
              auth: false,
              token: null
            });
          }
          let user_role;
          if (req.body.user_role === "" || req.body.user_role === undefined) {
            user_role = "user";
          } else {
            user_role = req.body.user_role;
          

          const query = `INSERT INTO users(email, hashpassword, username, user_role)
          VALUES ($1, $2, $3, $4) RETURNING user_id `;
          const resp = await db.query(query, [
            email,
            hashpassword,
            username,
            user_role
          ]);
        
          const userId = resp.rows[0].user_id;
          const token = jwt.sign({ id: userId }, config.tokenSecret, {
            expiresIn: 86400
          });
          res.status(200).json({
            message: "Signup successfully",
            auth: true,
            token
          });
        }
        } catch (e) {
          throw e;
        }
      })().catch(e => {
        console.error(e);
        res.status(500).json({
          auth: false,
          token: null,
          error: "The Server encountered a problem"
        });
      });
    }
  }
}

export default signUp;
