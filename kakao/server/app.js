const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
