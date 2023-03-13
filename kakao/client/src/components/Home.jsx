import Login from "./login/Login";
import logo from "../logo.svg";
import Logout from "./login/Logout";
import { useContext } from "react";
import { UserContext } from "../context/LoginContext";
import axios from "axios";

const Home = () => {
  const { userInfo, isLogin } = useContext(UserContext);
  let accessToken = localStorage.getItem("access_token");
  const getTokenInfo = async () => {
    const res = await axios({
      url: "https://kapi.kakao.com/v1/user/access_token_info",
      headers: `Authorization: Bearer ${accessToken}`,
    });
    console.log(res.data);
  };
  const getUserInfo = async () => {
    const res = await axios({
      url: "https://kapi.kakao.com/v2/user/me",
      headers: `Authorization: Bearer ${accessToken}`,
    });
    console.log(res.data);
  };
  const getUserList = async () => {
    const res = await axios({
      url: "https://kapi.kakao.com/v1/user/ids",
      headers: `Authorization: KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
    });
    console.log(res);
  };
  const getToken = async () => {
    const refresh = window.localStorage.getItem("refresh_token");
    const res = await axios({
      url: "https://kauth.kakao.com/oauth/token",
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        grant_type: "refresh_token",
        client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
        refresh_token: refresh,
        client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
      },
    });
    console.log(res);
    localStorage.setItem("access_token", res.data.access_token);
    accessToken = localStorage.getItem("access_token")
  };
  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      {isLogin ? (
        <>
          <p>환영합니다. {userInfo.nickname}님</p>
          <Logout />
        </>
      ) : (
        <Login />
      )}
      <div>
        <button onClick={getTokenInfo}>access 토큰 정보 확인</button>
      </div>
      <div>
        <button onClick={getUserInfo}>사용자 정보 확인</button>
      </div>
      <div>
        <button onClick={getUserList}>사용자 목록 확인</button>
      </div>
      <div>
        <button onClick={getToken}>access 토큰 갱신</button>
      </div>
    </div>
  );
};

export default Home;
