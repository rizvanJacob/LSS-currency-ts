import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CurrentUser, setCurrentUserProp } from "../../@types/currentUser";

const LoginCallback = ({ setCurrentUser }: setCurrentUserProp): JSX.Element => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") as string;
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    attemptLogin(signal, setCurrentUser, code, navigate);
    return () => {
      controller.abort;
    };
  }, []);

  return <>Authorizing...</>;
};

export default LoginCallback;

const attemptLogin = async (
  signal: AbortSignal,
  setCurrentUser: any,
  code: string,
  navigate: any
) => {
  const response = await fetch(`/api/login/${code}`, { signal: signal });
  if (response.ok) {
    const data = await response.json();
    const { token } = data;
    localStorage.setItem("token", token);

    const currentUser = jwt_decode(token) as CurrentUser;
    setCurrentUser(currentUser);
    navigate("/", { replace: true });
  } else if (response.status === 404) {
    const openId = await response.json();
    navigate("/new", { state: { openId }, replace: true });
  } else if (response.status === 400) {
    alert("Your requested account has not been approved");
    navigate("/", { replace: true });
  }
};
