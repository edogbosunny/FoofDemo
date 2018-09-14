import db from "../config/db";
import validateOrderInput from "../validation/order";

class Orders {
  static addOrder(req, res) {
    const userId = req.app.get("userId");
    const { meal, quantity, price, status } = req.body;
    const { errors, isValid } = validateOrderInput(req.body);
    console.log(userId);
    if (!userId) {
      console.error("User id was not set");
      return res.status(500).json({
        message: "An error encountered on the server",
        success: false
      });
    }

    if (!isValid) {
      return res.status(400).json({
        status: "failed",
        token: null,
        error: errors
      });
    }
    (async () => {
      try {
        const query = `INSERT INTO orders (user_id, meal, quantity, price, status)
        VALUES ($1, $2, $3, $4, $5) RETURNING order_id
        `;
        const resp = await db.query(query, [
          userId,
          meal,
          quantity,
          price,
          status
        ]);
        res.status(200).json({
          message: "product Uploaded Succesfully",
          data: {
            createdOn: Date.now(),
            orderid: resp.rows[0].order_id,
            meal,
            quantity,
            price,
            status
          }
        });
      } catch (e) {
        throw e;
      }
    })().catch(err => {
      console.err(err);
      return res.status(500).json({
        success: false,
        message: "Server encountered an error"
      });
    });
  }

  static getAllOrder(req, res) {
    const query = `SELECT o.order_id, o.meal,o.created_on, o.quantity, 
        o.price, o.status, u.user_id, u.username  FROM orders as o
        INNER JOIN users AS u
        ON o.user_id = u.user_id`;

    (async () => {
      const resp = await db.query(query);
      res.status(200).json({
        message: "all questions retrieved succesfully",
        count: resp.rowCount,
        data: resp.rows
      });
    })().catch(err => {
      console.log(err);
      return res.status(500).json({
        message: "An error encountered on the server",
        success: false
      });
    });
  }
}

export default Orders;
