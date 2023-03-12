import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import Login from "./Login";
import { useEffect } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();

  const loginHandler = () => {
    setIsLogin(true);
  };
  const logoutHandler = async () => {
    const config = {
      url: "http://localhost:8080/logout",
      method: "POST",
      withCredentials: true,
    };
    const res = await axios(config);
    if (res.status === 200) {
      window.open("/", "_self");
    }
  };
  const accessToken = async () => {
    const config = {
      url: "http://localhost:8080/accesstoken",
      method: "GET",
      withCredentials: true,
    };
    const res = await axios(config);
    console.log(res.data)
  };
  const refreshToken = async () => {
    const config = {
      url: "http://localhost:8080/refreshtoken",
      method: "GET",
      withCredentials: true,
    };
    const res = await axios(config);
  };
  const checkLogin = async () => {
    const config = {
      url: "http://localhost:8080/login/success",
      method: "GET",
      withCredentials: true,
    };
    const res = await axios(config);
    if (res.data) {
      setIsLogin(true);
      setUser(res.data);
    } else {
      setIsLogin(false);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a style={{ cursor: "pointer" }} onClick={accessToken}>
          get Access Token
        </a>
        <a style={{ cursor: "pointer" }} onClick={refreshToken}>
          get Refresh Token
        </a>
        {isLogin ? <button onClick={logoutHandler}>logout</button> : <Login loginHandler={loginHandler} />}
      </header>
    </div>
  );
}

export default App;
