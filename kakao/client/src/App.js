import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KakaoLogin from "./components/login/KakaoLogin";
import { useState } from "react";
import KakaoLogout from "./components/login/KakaoLogout";
import { UserContext } from "./context/LoginContext";

function App() {
  const [accessToken, setAccessToken] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState();
  
  return (
    <BrowserRouter>
    <UserContext.Provider value={{accessToken, setAccessToken, isLogin, setIsLogin, userInfo, setUserInfo}}>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route
              path="/auth/kakao/callback/login"
              element={
                <KakaoLogin/>
              }
            />
            <Route path="/auth/kakao/callback/logout" element={<KakaoLogout/>}/>
          </Routes>
        </header>
      </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
