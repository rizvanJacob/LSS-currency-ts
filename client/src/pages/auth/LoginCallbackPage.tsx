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
 
    //##RIZ: Hint, you need to decode the token as another type of interface.
    //referece compare with line 77 in App.tsx to see what's going on. 
    const LogoutActions = () => {
      alert("Session expired"); 
      localStorage.clear();
      console.log('User logged out');
      
      //Alvin's logout actions
      //const navigate = useNavigate();
      navigate("/logout", { replace: true });
    };
    
    const decoded = jwt_decode(token) as UserPayload;
    setCurrentUser(decoded as CurrentUser);
    createLogoutTimeout(LogoutActions, decoded.exp);
    const clearLogoutTimeout = createLogoutTimeout(LogoutActions, decoded.exp);
    clearLogoutTimeout();

    
    //##RIZ: Still not sure why you are creating these new variables
    //they are not used anywhere else.
    // const accountType = currentUser.accountType as Account;
    // const expirationTime = new Date();
    // expirationTime.setSeconds(
    //   //##RIZ: and you definitely shouldn't be using JWT_EXPIRIES. This constant shouldn't even exist. 
    //   expirationTime.getSeconds() + parseInt(JWT_EXPIRIES[accountType])
    // );

    //setCurrentUser(currentUser);

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
