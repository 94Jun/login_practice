import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./context/LoginContext";
import Home from "./pages/Home";
import Git from "./components/callback/Git";
import Google from "./components/callback/Google";
import Kakao from "./components/callback/Kakao";
function App() {
  const [accessToken, setAccessToken] = useState();
  const [loginType, setLoginType] = useState();
  useEffect(() => {
    if (accessToken) {
      switch (loginType) {
        case "GIT":
          axios({
            url: "https://api.github.com/user",
            method: "GET",
            headers: {
              Authorization: `token ${accessToken}`,
            },
          }).then((res) => {
            console.log("user info from github", res);
          });
          break;
        case "GOOGLE":
          break;
        case "KAKAO":
          break;
        default:
          break;
      }
    }
  }, [loginType, accessToken]);
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ accessToken, setAccessToken, loginType, setLoginType }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/callback/git" element={<Git />} />
            <Route path="/auth/callback/google" element={<Google />} />
            <Route path="/auth/callback/kakao" element={<Kakao />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
