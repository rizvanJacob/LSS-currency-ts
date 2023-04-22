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
      const res = await fetch("/api", { signal: signal });
      const data = await res.json();
      setAuthUrls(data);
    };
    getAuthUrls();
    return () => {
      controller.abort;
    };
  }, []);

  return (
    <>
      <a href={authUrls.login}>
        <h1>LOGIN</h1>
      </a>
      <a href={authUrls.checkin}>
        <h1>CHECK IN</h1>
      </a>
    </>
  );
};

export default HomePage;
