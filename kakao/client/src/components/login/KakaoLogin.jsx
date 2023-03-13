import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "../../context/LoginContext";

const KakaoLogin = () => {
  const { setIsLogin, setAccessToken, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const getToken = async () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code) {
      const config = {
        url: "https://kauth.kakao.com/oauth/token",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          grant_type: "authorization_code",
          client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
          redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
          code: code,
          client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
        },
      };
      try {
        const res = await axios(config);
        const userInfo = jwt_decode(res.data.id_token);
        setUserInfo(userInfo);
        setAccessToken(res.data.access_token);
        window.localStorage.setItem("access_token", res.data.access_token);
        window.localStorage.setItem("refresh_token", res.data.refresh_token);
        setIsLogin(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getToken();
    navigate("/");
  }, []);
  return <div>kakao callback</div>;
};

export default KakaoLogin;
