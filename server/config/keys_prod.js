import dotenv from "dotenv";

dotenv.config();

const pgURI = {
  psqlURI: process.env.PSQL_URI
};

export default { pgURI };
