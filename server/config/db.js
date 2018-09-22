import { Pool } from "pg";
import dotenv from "dotenv";
import dbURI from "./keys";

dotenv.config();
const connectionString = dbURI.psqlURI || process.env.DATABASE_URL;

const pool = new Pool({
  connectionString
});

/**
 * Stop application an error occurs on the Database
 */
pool.on("error", err => {
  console.error("Unexpected error on idle client", err.stack);
  pool.end();
  process.exit(-1);
});

/**
 * When the Database is connected
 */
pool.on("connect", () => {
  console.log("PostgreSQL Database Connected");
});

process.on("SIGINT", () => {
  console.log(" Closing PostgreSQL Database ....");
  pool
    .end()
    .then(() => {
      console.log("Database Succesfully Closed");
    })
    .catch(err => {
      console.log(err.stack);
    });
});

export default pool;
