import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CurrentUser, setCurrentUserProp } from "../../@types/currentUser";
import { buildFullUrl } from "../../utilities/stringManipulation";

const LoginCallbackPage = ({
  setCurrentUser,
}: setCurrentUserProp): JSX.Element => {
  const location = useLocation();
  const code = location.state.code;
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    attemptLogin(signal, setCurrentUser, code, navigate);
    //##RIZ: add the same timeout function here to logout the user when the token expires.
    //this can either be part of the attemptLogin function or a separate function.
    return () => {
      //##RIZ: remember to clear the timeout here. 
      controller.abort;
    };
  }, []);

  return <>Authorizing...</>;
};

export default LoginCallbackPage;

const attemptLogin = async (
  signal: AbortSignal,
  setCurrentUser: any,
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

    const currentUser = jwt_decode(token) as CurrentUser;
    setCurrentUser(currentUser);

    //setCurrentUser(null); -> logs the user out of the app
    //localStorage.removeItem("token"); -> removes the token from local storage

    navigate("/", { replace: true });
  } else if (response.status === 404) {
    const openId = await response.json();
    navigate("/new", { state: { openId }, replace: true });
  } else if (response.status === 400) {
    alert("Your requested account has not been approved");
    navigate("/", { replace: true });
  }
};
