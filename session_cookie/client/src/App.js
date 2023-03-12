import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [result, setResult] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();
  const getSession = async () => {
    const config = {
      url: "http://localhost:8122/session",
      method: "GET",
      withCredentials: true,
    };
    const res = await axios(config);
    setResult(res);
    console.log(res);
  };
  const logout = async () => {
    const config = {
      url: "http://localhost:8122/logout",
      method: "POST",
      withCredentials: true,
    };
    const res = await axios(config);
    if (res.status === 200) {
      setIsLogin(false);
    }
  };
  const loginHandler = () => {
    setIsLogin(true);
  };
  const checkLogin = async () => {
    const config = {
      url: "http://localhost:8122/login/success",
      method: "GET",
      withCredentials: true,
    };
    const res = await axios(config);
    
    if (res.data.user) {
      setUser({
        username: res.data.user.username,
        email: res.data.user.email,
      });
      setIsLogin(true);
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
        <p style={{ cursor: "pointer" }} onClick={getSession}>
          Get session
        </p>
        {isLogin ? <button onClick={logout}>Logout</button> : <Login loginHandler={loginHandler} />}
      </header>
    </div>
  );
}

export default App;
