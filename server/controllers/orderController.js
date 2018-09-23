import db from '../config/db';
import validateOrderInput from '../validation/order';

class Orders {
  static addOrder(req, res) {
    const userId = req.app.get('userId');
    const { meal, quantity, price, status } = req.body;
    const { errors, isValid } = validateOrderInput(req.body);
    // console.log(userId);
    if (!userId) {
      console.error('User id was not set');
      return res.status(500).json({
        message: 'An error encountered on the server' });
    }

    if (!isValid) {
      return res.status(400).json({
        token: null,
        error: errors,
      });
    }
    (async () => {
      try {
        const query = `INSERT INTO orders (user_id, meal, quantity, price, status)
        VALUES ($1, $2, $3, $4, $5) RETURNING order_id
        `;
        const resp = await db.query(query, [
          userId, meal, quantity, price, status,
        ]);
        res.status(200).json({
          message: 'product Uploaded Succesfully',
          data: { createdOn: Date.now(), orderid: resp.rows[0].order_id, meal, quantity, price, status },
        });
      } catch (e) {
        throw e;
      }
    })().catch((err) => {
      // console.err(err);
      return res.status(500).json({
        success: false,
        message: 'Server encountered an error',
      });
    });
  }

  static getAllOrder(req, res) {
    const query = `SELECT o.order_id, o.meal,o.created_on, o.quantity, o.price, o.status, u.user_id, u.username  FROM orders as o
        INNER JOIN users AS u ON o.user_id = u.user_id`;
    (async () => {
      const resp = await db.query(query);
      res.status(200).json({
        message: 'all Order retrieved succesfully',
        count: resp.rowCount,
        data: resp.rows,
      });
    })().catch((err) => {
      // console.log(err);
      return res.status(500).json({
        message: 'An error encountered on the server',
        success: false,
      });
    });
  }

  static getSingleOrder(req, res) {
    const { id } = req.params;
    // const singleOrderQuery = `SELECT o.order_id, u.username,
    //  o.meal, o.created_on, o.quantity, o.status FROM orders o
    //  INNER JOIN users AS u
    //  ON o.user_id = u.user_id
    //  WHERE o.order_id = $1`;

    const singleOrderQuery = `SELECT o.order_id, o.meal,o.created_on, o.quantity, o.price, o.status, u.user_id, u.username  FROM orders as o
    INNER JOIN users AS u ON o.user_id = u.user_id WHERE o.order_id = $1`;
    (async () => {
      try {
        const resp = await db.query(singleOrderQuery, [id]);
        // console.log('resp====>', resp);
        res.status(200).json({
          message: 'Single User order Retrieved Succesfully',
          data: resp,
        });
      } catch (e) {
        throw e;
      }
    })().catch((err) => {
      // console.log('err======', err);
      return res.status(500).json({
        message: 'An error encountered on the server',
        // success: false
      });
    });
  }

  static deleteOrder(req, res) {
    // restrict thsi route only to admin
    const { id } = req.params;
    // delete query

    const checkQuery = 'SELECT o.order_id, o.meal,o.created_on, o.quantity, o.price, o.status, u.user_id,  u.username, u.user_role FROM orders as o INNER JOIN users AS u ON o.user_id = u.user_id WHERE order_id = $1';

    const deleteQuery = 'DELETE FROM orders WHERE order_id = $1';
    (async () => {
      try {
        const resp = await db.query(checkQuery, [id]);
        // console.log('response=========>', resp);
        if (resp.rows.length < 1) {
          return res.status(400).json({ message: 'order with specified ID does not exist' });
        }
        await db.query(deleteQuery, [id]);
        return res.status(200).json({
          message: 'order deleted succesfully',
        });
      } catch (e) {
        throw e;
      }
    })().catch((err) => {
      console.log(err);
      return res.status(500).json({ message: 'server error',
      });
    });
  }

  static updateOrder(req, res) {
    // console.log(req.params);
    const { id } = req.params;
    const { errors, isValid } = validateOrderInput(req.body);
    const { meal, quantity, price, status } = req.body;
    // const userId = req.app.get('userId');

    const updateQuery = 'UPDATE orders SET meal = $1, quantity = $2, price = $3, status = $4 WHERE order_id = $5';
    if (!isValid) {
      return res.status(400).json({ status: 'failed', token: null, error: errors });
    }
    (async () => {
      try {
        const resp = await db.query(updateQuery, [meal, quantity, price, status, id]);
        res.status(200).json({
          message: 'success',
          resp });
      } catch (e) { console.log(e); }
    })().catch((err) => {
      console.log(err);
      return res.status(500).json({ statuc: 'failed', message: 'server error' });
    });
  }
}

export default Orders;
