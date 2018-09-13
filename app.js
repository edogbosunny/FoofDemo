import express from "express";
const port = process.env.PORT || 3003;
const app = express();

app.listen(port, () => {
  console.log(`connected on port ${port}`);
});
