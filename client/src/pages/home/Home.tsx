import { CurrentUser } from "../../@types/@types.currentUser";
import { useEffect, useState } from "react";
import getRequest from "../../utilities/getRequest";

type props = {
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

const Home = ({ setCurrentUser: setUser }: props) => {
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

  const login = async () => {};

  return (
    <>
      <a href={authUrl}>LOGIN LINK</a>

      <button onClick={login}>LOG IN WITH SINGPASS</button>
      <h1>CHECK IN</h1>
    </>
  );
};

export default Home;
