import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import db from '../config/db';
import config from '../config/default';
import validateSignin from '../validation/signin';

class signin {
  static signinCtr(req, res) {
    //  console.log(req.app.get('user_id'));
    const { email, password } = req.body;
    const { errors, isValid } = validateSignin(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: 'failed', token: null, error: errors });
    }
    (async () => {
      try {
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const user = await db.query(userQuery, [email]);
        // console.log(user)
        if (user.rows.length < 1) {
          res.status(401).json({
            auth: false, token: null, message: 'User does not exist' });
        } else if (!bcrypt.compareSync(password, user.rows[0].hashpassword)) {
          res.status(401).json({ auth: false, token: null, message: 'Password is not correct' });
        } else {
          const userId = user.rows[0].user_id;
          const token = jwt.sign({ id: userId }, config.tokenSecret, { expiresIn: 86400 });
          res.status(201).json({ auth: true, message: 'Login Successful', token });
        }
      } catch (e) { throw e; }
    })().catch((err) => {
      // console.error(err);
      res.status(501).json({ auth: false, token: null, messsage: 'The Server encountered a problem' });
    });
  }
}
export default signin;
