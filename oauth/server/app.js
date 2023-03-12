const exrpess = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const router = require("./routes");
const app = exrpess();
const PORT = 8080;

// json parsing
app.use(exrpess.json());

// dotenv
dotenv.config();

// cors 설정
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/auth", router);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
