import { useEffect, useState } from "react";

const Home = () => {
  const [authUrl, setAuthUrl] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getAuthUrl = async () => {
      const res = await fetch("/api", { signal: signal });
      const { url } = await res.json();
      setAuthUrl(url);
    };
    getAuthUrl();
    return () => {
      controller.abort;
    };
  }, []);

  return (
    <>
      <a href={authUrl}>LOGIN LINK</a>
      <h1>CHECK IN</h1>
    </>
  );
};

export default Home;
