import { Routes, Route } from "react-router-dom";

const TraineesRoutes = (): JSX.Element => {
  return (
    <>
      Trainee Routes
      <Routes>
        <Route path="/" />
        <Route path="/:id" />
        <Route path="/new" />
        <Route path="/:id/edit" />
      </Routes>
    </>
  );
};

export default TraineesRoutes;
