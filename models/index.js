import createUserTable from "./users";
import { createCipher } from "crypto";

const CreateTables = async () => {
  try {
    const userTable = await createUserTable();
    console.log("user table Init");
  } catch (e) {
    throw e;
  }
};

export default CreateTables;
