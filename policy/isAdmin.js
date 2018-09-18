import db from "../config/db";

class Admin {
  static isAdmin(req, res, next) {
    const userId = req.app.get("userId");
    let query = `SELECT user_role from users WHERE user_id = $1`;
    (async () => {
      try {
        let resp = await db.query(query, [userId]);
        console.log("resp=======>", resp.rows[0].user_role);
        let userRole = resp.rows[0].user_role;
        if (userRole === "user") {
          return res.status(401).json({
            status: false,
            message:
              "Unauthorized Access You must be an admin to access this page"
          });
        } else {
          req.app.set("user_role", userRole);
          next();
        }
      } catch (e) {
        console.log(e);
      }
    })().catch(err => {
      console.log(err);
      return res.sstatus(500).json({
        error: true,
        message: "internal server error"
      });
    });
  }
}

export default Admin;
