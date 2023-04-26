import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LogoutCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate("/", { replace: true });
    navigate(0);
  }, []);

  return <>Logging out...</>;
};

export default LogoutCallback;
