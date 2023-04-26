import { useEffect, useState } from "react";

type AuthURLs = {
  login: string;
  checkin: string;
};

const HomePage = (): JSX.Element => {
  const [authUrls, setAuthUrls] = useState<AuthURLs>({
    login: "",
    checkin: "",
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getAuthUrls = async () => {
      const res = await fetch("https://lss-currency.onrender.com/api", {
        signal: signal,
      });
      const data = await res.json();
      setAuthUrls(data);
    };
    getAuthUrls();
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
