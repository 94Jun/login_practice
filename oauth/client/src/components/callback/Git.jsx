import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/LoginContext";
import axios from "axios";

const Git = () => {
  const { accesToken, setAccessToken, loginType, setLoginType } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code) {
      axios({
        url: "http://localhost:8080/auth/accesstoken",
        method: "POST",
        data: { code },
      })
        .then((res) => {
          const accessToken = res.data.split("=")[1].split("&")[0];
          setAccessToken(accessToken);
          setLoginType("GIT");
          navigate("/");
        })
    }
  }, []);
  return <div>Git Callback</div>;
};

export default Git;
