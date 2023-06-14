import { Route, Routes } from "react-router-dom";
import VALinks from "./VALinks";
import Alvin from "./Alvin";
import Nimalan from "./Nimalan";

export default function VARoutes() {
  return (
    <>
      <VALinks />
      <Routes>
        {/* Problem 3: create a route that takes a path "/VA/:name" and renders your respective components.
         Your component should send a HTTP request to "/api/VA/:name" and display the response. 
         Your components should be named ":name.tsx" in the same folder as this file. */}
        {/* Alvin's solution should take the path "/VA/alvin" */}
        <Route path="/VA/Alvin" element={<Alvin />} />
        
        <Route path="/VA/Nimalan" element={<Nimalan />} />

      </Routes>
      {/* try not to look at this "VALinks file" */}
    </>
  );
}
