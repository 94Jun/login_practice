const Login = () => {
  const github = () => {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
    window.open(url, "_self");
  };
  const google = () => {};
  const kakao = () => {};
  return (
    <div>
      <button onClick={github}>깃허브</button>
      <button onClick={google}>구글</button>
      <button onClick={kakao}>카카오</button>
    </div>
  );
};

export default Login;
