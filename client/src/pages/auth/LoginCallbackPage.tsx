import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CurrentUser, setCurrentUserProp, UserPayload } from "../../@types/currentUser";
import { buildFullUrl } from "../../utilities/stringManipulation";
import { createLogoutTimeout } from "../../utilities/accountUtils";
import { Account, JWT_EXPIRIES } from "../../../../server/src/constants"; // get session tokens from respective acc types

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
    
    //##RIZ: You create a logout timeout here. but what if the login fails
    //and the control flow directs to line 72 onwards? 
    //Do you still want to create the logout timeout? 
    //createLogoutTimeout(10000); //Need to change this to token expiry

    //I assume you passing in 10000 is supposed to mean 10 seconds. But your
    //createLogoutTimeout function is expecting a number represing the expiry time in unix. 
    
    
    return () => {
      //##RIZ: I don't thionk you are clearing the correct timeout. 
      //There will still be an active timeout created by line 22. 
      // const clearLogoutTimeout = createLogoutTimeout(10000);
      // clearLogoutTimeout();
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
    //##RIZ: Hint, you need to decode the token as another type of interface.
    //referece compare with line 77 in App.tsx to see what's going on. 
    const decoded = jwt_decode(token) as UserPayload;
    setCurrentUser(decoded as CurrentUser);
    createLogoutTimeout(decoded.exp);
    console.log('Token expires at:', new Date(decoded.exp));
    const clearLogoutTimeout = createLogoutTimeout(decoded.exp);
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

    navigate("/", { replace: true });
  } else if (response.status === 404) {
    const openId = await response.json();
    navigate("/new", { state: { openId }, replace: true });
  } else if (response.status === 400) {
    alert("Your requested account has not been approved");
    navigate("/", { replace: true });
  }
};
