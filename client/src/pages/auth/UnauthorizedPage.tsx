import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
      navigate("/", { replace: true });
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      {showMessage && <h1>You are not authorized to view this page.</h1>}
    </>
  );
}
