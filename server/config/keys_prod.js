import dotenv from "dotenv";

dotenv.config();

const pgURI = {
  // psqlURI: process.env.PSQL_URI
  psqlURI:
    "postgres://qhefalxv:38KtNbxAYz_ugrv_96XyjZrVXlaUkaEr@stampy.db.elephantsql.com:5432/qhefalxv"
};

export default { pgURI };
