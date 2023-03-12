import { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const login = async () => {
    const config = {
      url: "http://localhost:8080/login",
      method: "POST",
      withCredentials: true,
      data: { email, password },
    };
    const res = await axios(config);
    if (res.status === 200) {
      window.open("/", "_self");
    }
  };
  const submit = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <form onSubmit={submit} style={{ border: "1px solid white", padding: "20px", backgroundColor: "#888", borderRadius: "1em" }}>
      <div>
        <label htmlFor="email">email</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input type="password" id="password" vlaue={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button>login</button>
    </form>
  );
};

export default Login;
