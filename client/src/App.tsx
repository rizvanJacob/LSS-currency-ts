import "./App.css";
import axios from "axios";
import { useState } from "react";
import AllUsersPage from "./pages/users/index/AllUsersPage";


function App() {
  return (
    <>
    <div className="App">
      <h1>A React App made with Vite</h1>
    </div>

    <AllUsersPage />
    </>
  );
}

export default App;
