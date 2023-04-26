import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
type AuthURLs = {
  login: string;
  checkin: string;
};

const HomePage = (): JSX.Element => {
  const [authUrls, setAuthUrls] = useState<AuthURLs>({
    login: "",
    checkin: "",
  });
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") as string;
  const state = searchParams.get("state") as string;
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getAuthUrls = async () => {
      const res = await fetch("/api", {
        signal: signal,
      });
      const data = await res.json();
      setAuthUrls(data);
    };
    getAuthUrls();

    if (state === "login") {
      navigate("/loginCallback", { state: { code } });
    } else if (state === "checkin") {
      navigate("/checkinCallback", { state: { code } });
    }

    return () => {
      controller.abort;
    };
  }, []);

  return (
    <div className="flex flex-col mx-auto items-center h-48 justify-evenly">
      <a className="btn btn-wide" href={authUrls.login}>
        LOGIN
      </a>
      <a className="btn btn-wide" href={authUrls.checkin}>
        CHECK IN
      </a>
    </div>
  );
};

export default HomePage;
