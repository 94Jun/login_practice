const Login = () => {
  const kakaoLogin = async () => {
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI}`;
    window.open(url, "_self");
  };
  return (
    <div>
      <img src={"kakao_login_medium_wide.png"} style={{ cursor: "pointer" }} onClick={kakaoLogin} />
    </div>
  );
};

export default Login;
