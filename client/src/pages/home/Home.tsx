import { CurrentUser } from "../../@types/@types.currentUser";
import { useEffect, useState } from "react";
import getRequest from "../../utilities/getRequest";

type props = {
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

const Home = ({ setCurrentUser: setUser }: props) => {
  const [authUrl, setAuthUrl] = useState<String>("");

  useEffect(() => {
    getRequest("", setAuthUrl);
  }, []);

  return (
    <>
      <h1>LOG IN WITH SINGPASS</h1>
      <h1>CHECK IN</h1>
    </>
  );
};

export default Home;
