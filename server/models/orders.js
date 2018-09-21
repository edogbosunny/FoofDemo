import db from "../config/db";
/**
 * Creation of ORder Table
 */
const createOrderTable = async () => {
  const client = await db.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS orders (
            order_id SERIAL UNIQUE,
            user_id SERIAL NOT NULL REFERENCES users (user_id),
            meal VARCHAR NOT NULL,
            quantity VARCHAR NOT NULL,
            price VARCHAR NOT NULL,
            status VARCHAR NOT NULL,
            created_on TIMESTAMPTZ DEFAULT NOW (),
            PRIMARY KEY (order_id)

      );`;

    await client.query(query);
  } catch (err) {
    throw err;
  } finally {
    client.release;
  }
};
export default createOrderTable;
