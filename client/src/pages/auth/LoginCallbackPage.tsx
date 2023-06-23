import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  CurrentUser,
  UserPayload,
  setCurrentUserProp,
} from "../../@types/currentUser";
import { buildFullUrl } from "../../utilities/stringManipulation";
import dayjs from "dayjs";
import { createLogoutTimer } from "../../utilities/accountUtils";

const LoginCallbackPage = ({
  setCurrentUser,
}: setCurrentUserProp): JSX.Element => {
  const location = useLocation();
  const code = location.state.code;
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    attemptLogin(signal, setCurrentUser, code, navigate).then((returnValue) => {
      return () => {
        console.log("cleaning up logincallback");
        controller.abort;
        if (returnValue) returnValue();
      };
    });
  }, []);

  return <>Authorizing...</>;
};

export default LoginCallbackPage;

const attemptLogin = async (
  signal: AbortSignal,
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>,
  code: string,
  navigate: any
) => {
  const response = await fetch(buildFullUrl(`/api/login/${code}/`), {
    signal: signal,
  });
  if (response.ok) {
    const data = await response.json();
    const { token } = data;
    localStorage.setItem("token", token);

    const decoded = jwt_decode(token) as UserPayload;
    const currentUser = decoded as CurrentUser;

    setCurrentUser(currentUser);
    const clearLogoutTimer = createLogoutTimer(decoded.exp, setCurrentUser);
    navigate("/", { replace: true });
    return clearLogoutTimer;
  } else if (response.status === 404) {
    const openId = await response.json();
    navigate("/new", { state: { openId }, replace: true });
  } else if (response.status === 400) {
    alert("Your requested account has not been approved");
    navigate("/", { replace: true });
  }
  return null;
};
