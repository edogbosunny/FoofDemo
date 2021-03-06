import express from "express";
import bodyParser from "body-parser";
import route from "./server/routes/index";
import createTables from "./server/models/index";

const port = process.env.PORT || 3004;

//db creation
(async () => {
  try {
    await createTables();
  } catch (e) {
    // throw e;
  }
})().catch(err => {
  // console.log(err.stack);
});

const app = express();
app.use(route);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`connected on port ${port}`);
});
export default app;
