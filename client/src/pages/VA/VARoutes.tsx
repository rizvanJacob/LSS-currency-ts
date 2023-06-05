import { Route, Routes } from "react-router-dom";
import VALinks from "./VALinks";

export default function VARoutes() {
  return (
    <>
      <Routes>
        {/* Problem 3: create a route that takes a path "/VA/:name" and renders your respective components. Your component should send a HTTP request to "/api/VA/:name" and display the response. Your components should be named ":name.tsx" in the same folder as this file. */}
        {/* Alvin's solution should take the path "/VA/alvin" */}
        {/* Nimalan's solution should take the path "/VA/nimalan" */}
      </Routes>
      {/* try not to look at this "VALinks file" */}
      <VALinks />
    </>
  );
}
