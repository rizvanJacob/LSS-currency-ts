import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  CurrentUser,
  setCurrentUserProp,
} from "../../@types/@types.currentUser";

const LoginCallback = ({ setCurrentUser }: setCurrentUserProp) => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await fetch(`/api/login/${code}`);
      const data = await response.json();
      console.log(data);
      const { token } = data;
      localStorage.setItem("token", token);

      const currentUser = jwt_decode(token) as CurrentUser;
      setCurrentUser(currentUser);
    };
    getCurrentUser();
    navigate("/", { replace: true });
  }, []);
  return <h1>Callback page</h1>;
};

export default LoginCallback;
