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
          let user_role = "admin";
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
  //delete user
  static deleteUser(req, res, next) {
    //ONly an Administrator should accces this route
    const { id } = req.params;
    const deleteUserQuery = `DELETE FROM users WHERE user_id = $1`;
    const checkUserQuery = `SELECT * FROM users WHERE user_id = $1`;
    (async () => {
      try {
    const serverResp = await db.query(checkUserQuery, [id]);
        // console.log("response=========>", resp);
        if (serverResp.rows.length < 1) {
          return res.status(405).json({ message: "user does not exist" });
        }
        await db.query(deleteUserQuery, [id]);
        return res.status(201).json({
          message: "user deleted succesfully"
        });
      } catch (e) {
        throw e;
      }
    })().catch(err => {
      console.log(err);
      return res.status(500).json({
        message: "server error"
      });
    });
  }
}

export default signUp;
