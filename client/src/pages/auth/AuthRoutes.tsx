import { setCurrentUserProp } from "../../@types/currentUser";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginCallback from "./LoginCallbackPage";
import SignUpPage from "./SignUpPage";

const AuthRoutes = ({ setCurrentUser }: setCurrentUserProp): JSX.Element => {
  return (
    <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route
        path="/loginCallback"
        element={<LoginCallback setCurrentUser={setCurrentUser} />}
      />
      <Route path="/new" element={<SignUpPage />} />
    </Routes>
  );
};

export default AuthRoutes;
