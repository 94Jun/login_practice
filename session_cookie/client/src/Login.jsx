import { useState } from "react";
import axios from "axios";
const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const login = async () => {
    const config = {
      url: "http://localhost:8122/login",
      method: "POST",
      withCredentials: true,
      data: { email, password },
    };
    const res = await axios(config);
    if (res.status === 200) {
      props.loginHandler();
    }
  };
  const submit = (e) => {
    e.preventDefault();
    login();
  }
  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="email">email</label>
        <input type="text" id="email" value={email} onChange={changeEmail} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input type="password" id="password" value={password} onChange={changePassword} />
      </div>
      <button>login</button>
    </form>
  );
};

export default Login;
