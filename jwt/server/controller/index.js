const userDB = require("../db");
const jwt = require("jsonwebtoken");

const login = (req, res, next) => {
  const { email, password } = req.body;
  const userInfo = userDB.find((user) => {
    return user.email === email;
  });
  if (!userInfo) {
    res.status(403).json("not authorized");
  } else {
    try {
      //access token 발급
      const accessToken = jwt.sign(userInfo, process.env.ACCESS_SECRET, {
        expiresIn: "1m",
        issuer: "Jun",
      });

      //refresh token 발급
      const refreshToken = jwt.sign(userInfo, process.env.REFRESH_SECRET, {
        expiresIn: "24h",
        issuer: "Jun",
      });

      //token 전송
      res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true,
      });
      res.status(200).json("login success");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  next();
};
const accessToken = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const userData = userDB.find((user) => user.email === data.email);
    const { password, ...others } = userData;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};
const refreshToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET);
    const userData = userDB.find((user) => user.email === data.email);
    //access token의 갱신
    const accessToken = jwt.sign(userData, process.env.ACCESS_SECRET, {
      expiresIn: "1m",
      issuer: "Jun",
    });
    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
    });
    res.status(200).json("Access token recreated");
  } catch (error) {
    res.status(500).json(error);
  }
};
const loginSuccess = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const userData = userDB.find((user) => user.email === data.email);
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
};
const logout = (req, res) => {
  try {
    res.cookie("accessToken", "");
    res.status(200).json("logout success");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { login, accessToken, refreshToken, loginSuccess, logout };
