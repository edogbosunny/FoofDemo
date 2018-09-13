import express from "express";
import bodyParser from "body-parser";
import createTables from "./models/index";
const port = process.env.PORT || 3003;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//db creation
(async () => {
  try {
    await createTables();
  } catch (e) {
    throw e;
  }
})().catch(err => {
  console.log(err.stack);
});

app.listen(port, () => {
  console.log(`connected on port ${port}`);
});
export default app;
