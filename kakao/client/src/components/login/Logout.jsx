const Logout = () => {
  const kakaoLogout = () => {
    const url = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&logout_redirect_uri=${process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URI}`
    window.open(url, "_self");
  }  

  return <button onClick={kakaoLogout}>로그아웃</button>;
};

export default Logout;
