const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { login, accessToken, refreshToken, loginSuccess, logout } = require("./controller");

const app = express();
const PORT = 8080;

// dotenv 설정
dotenv.config();

// json 파싱
app.use(express.json());

// cookie 설정
app.use(cookieParser(process.env.COOKIE_SECRET));

// cors 설정
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});

app.post("/login", login);
app.get("/accesstoken", accessToken);
app.get("/refreshtoken", refreshToken);
app.get("/login/success", loginSuccess);
app.post("/logout", logout);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
