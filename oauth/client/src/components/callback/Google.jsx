import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/LoginContext";

const Google = () => {
  const {accesToken, setAccessToken, loginType, setLoginType} = useContext(UserContext);
  const navigate = useNavigate();
  return <div>Google Callback</div>;
}
 
export default Google;