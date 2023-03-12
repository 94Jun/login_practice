import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/LoginContext";

const Kakao = () => {
  const {accesToken, setAccessToken, loginType, setLoginType} = useContext(UserContext);
  const navigate = useNavigate();
  return <div>Kakao Callback</div>;
}
 
export default Kakao;