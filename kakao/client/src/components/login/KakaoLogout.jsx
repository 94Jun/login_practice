import { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
const KakaoLogout = () => {
  const { accessToken, isLogin, setIsLogin } = useContext(UserContext);
  const token = window.localStorage.getItem("access_token");
  const navigate = useNavigate();
  const expireAccessToken = async () => {
    const config = {
      url: "https://kapi.kakao.com/v1/user/logout",
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Bearer ${token}` },
    };
    const res = await axios(config);
    console.log(res);
    localStorage.clear();
    setIsLogin(false);
  };
  useEffect(() => {
    try {
      expireAccessToken();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }, []);
  return <div>logout callback</div>;
};

export default KakaoLogout;
