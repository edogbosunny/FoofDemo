import createUserTable from "./users";
import createOrderTable from "./orders";

const CreateTables = async () => {
  try {
    const userTable = await createUserTable();
    console.log("user table Init");

    const orderTable = await createOrderTable();
    console.log("order table init");
  } catch (e) {
    // throw e;
  }
};

export default CreateTables;
