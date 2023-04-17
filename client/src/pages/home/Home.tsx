import { CurrentUser } from "../../@types/@types.currentUser";

type props = {
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

const Home = ({ setCurrentUser: setUser }: props) => {
  return (
    <>
      <h1>LOG IN WITH SINGPASS</h1>
      <h1>CHECK IN</h1>
    </>
  );
};

export default Home;
