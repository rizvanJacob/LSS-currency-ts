import { Route, Routes } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import { Account } from "../../../../server/src/constants";
import { CurrentUser } from "../../@types/currentUser";
import { useContext } from "react";
import { CurrentUserContext } from "../../App";

export default function DashboardRoutes() {
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const DASHBOARD_ACCESS = [
    Account.Admin,
  ];
  return (
    currentUser ? (
      <Routes>
        {DASHBOARD_ACCESS.includes(Number(currentUser.accountType)) ? (
          <Route path="/" element={<DashboardPage />} />
        ): null}
      </Routes>
    ) : null
  );
}
