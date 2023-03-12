const express = require("express");
const session = require("express-session");
const cors = require("cors");
const userDB = require("./db");
//서버 측에서 세션 관리를 위한 스토어 생성
const FileStore = require("session-file-store")(session);

const app = express();
const PORT = 8122;

//dotenv 설정
const dotenv = require("dotenv");
dotenv.config();

//cors 설정
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

//session 설정
app.use(
  session({
    name: "session ID",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
    },
  })
);

//json 파싱
app.use(express.json());

//session 확인 미들웨어
app.use("/", (req, res, next) => {
  try {
    //req.session 개체에 직접 접근해서 데이터 생성 및 수정 가능(세션 정보에 veiws라는 새로운 개체 생성)
    if (req.session.views) {
      req.session.views++;
    } else {
      req.session.views = 1;
    }
    console.log(req.session);
  } catch (error) {
    console.error(error);
  }
  next();
});

app.get("/session", (req, res) => {
  //session 받아오는 로직

  res.status(200).json("session information");
});

app.post("/login", (req, res) => {
  //사용자가 입력한 email과 db에 있는 email을 비교해 정보 가져오기
  const userInfo = userDB.find((item) => {
    return item.email === req.body.email;
  });

  //session 생성
  req.session.save(() => {
    req.session.user = {
      email: userInfo.email,
      username: userInfo.username,
    };
    const data = req.session;
    res.status(200).json({ data });
  });
});

app.post("/logout", (req, res) => {
  //session 정보 삭제
  req.session.destroy(() => {
    res.status(200).json({ message: "logout success" });
  });
});

app.get("/login/success", (req, res) => {
  try {
    const data = req.session;
    res.status(200).json(data);
  } catch (error) {
    res.status(403).json("user not found");
  }
});

app.listen(PORT, () => {
  console.log(`server is on ${PORT}`);
});
