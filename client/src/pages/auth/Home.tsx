import { useEffect, useState } from "react";

const Home = () => {
  const [authUrl, setAuthUrl] = useState<string>("");

  useEffect(() => {
    const getAuthUrl = async () => {
      const res = await fetch("/api");
      const { url } = await res.json();
      setAuthUrl(url);
    };
    getAuthUrl();
    console.log(authUrl);
  }, []);

  return (
    <>
      <a href={authUrl}>LOGIN LINK</a>
      <h1>CHECK IN</h1>
    </>
  );
};

export default Home;
