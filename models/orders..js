import db from "../config/db";
/**
 * Creation of ORder Table
 */
const createOrderTable = async () => {
  const client = await db.connect();
  try {
    const query = `CREATE TABLLE IF NOT EXISTS orders(
order_id SERIAL UNIQUE,
      );`;
  } catch (err) {
    throw err;
  }
};
