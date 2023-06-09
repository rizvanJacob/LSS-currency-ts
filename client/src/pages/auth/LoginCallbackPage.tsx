import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CurrentUser, setCurrentUserProp } from "../../@types/currentUser";
import { buildFullUrl } from "../../utilities/stringManipulation";
import { createLogoutTimeout } from "../../utilities/accountUtils";
import { Account, JWT_EXPIRIES } from "../../../../server/src/constants"; // get session tokens from respective acc types

const LoginCallbackPage = ({
  setCurrentUser,
}: setCurrentUserProp): JSX.Element => {
  const location = useLocation();
  const code = location.state.code;
  const navigate = useNavigate();


  // const logoutUser = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("tokenExpiration");
  //   navigate("/login", { replace: true });
  // };

  // const checkTokenExpiration = () => {
  //   const expirationTime = localStorage.getItem("tokenExpiration");
  //   if (expirationTime && parseInt(expirationTime) < Date.now()) {
  //     logoutUser();
  //   }
  // };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    attemptLogin(signal, setCurrentUser, code, navigate);
    
    createLogoutTimeout(10000); //Need to change this to token expiry

    //##RIZ: why are you checking the expiration timeout every second? 
    //you can just set a timeout to log the user out when the token expires.
    //the timeout will be the duration between now and the token expiry.
    //const checkExpirationTimeout = setInterval(checkTokenExpiration, 1000); 
    
    
    return () => {
      //##RIZ: remember to clear the timeout here. 
      const clearLogoutTimeout = createLogoutTimeout(10000);
      clearLogoutTimeout();
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

    //##RIZ: why are you storing these as new variables? they are accessible from currentUser.
    //you may want to change the decoded token from CurrentUser type to DecodedToken type
    //go take a look at src/@types/currentUser. 
    const accountType = currentUser.accountType as Account;
    const expirationTime = new Date();
    expirationTime.setSeconds(
      expirationTime.getSeconds() + parseInt(JWT_EXPIRIES[accountType])
    );

    // localStorage.setItem("token", token);
    // //##RIZ: why are you storing the expiration time in local storage?
    // //the expiration is already stored in the token (just encoded).
    // //look at lines 62-64 in App.tsx to see how to access it.
    // localStorage.setItem("tokenExpiration", expirationTime.getTime().toString());

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
