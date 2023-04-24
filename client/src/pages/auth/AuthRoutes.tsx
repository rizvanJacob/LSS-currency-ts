import { setCurrentUserProp } from "../../@types/currentUser";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginCallbackPage from "./LoginCallbackPage";
import SignUpPage from "./SignUpPage";
import UnauthorizedPage from "./UnauthorizedPage";

const AuthRoutes = ({ setCurrentUser }: setCurrentUserProp): JSX.Element => {
  return (
    <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route
        path="/loginCallback"
        element={<LoginCallbackPage setCurrentUser={setCurrentUser} />}
      />
      <Route path="/new" element={<SignUpPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  );
};

export default AuthRoutes;
