import "./App.css";
import { useState, useEffect } from 'react';
import EditUserRoute from "./pages/users/edit/EditUserRoute";
import UsersPageRoute from "./pages/users/index/UsersPageRoute";
function App() {

  return (
    <>
    <div className="App">
      <h1>A React App made with Vite</h1>
    </div>
        <UsersPageRoute />
        <EditUserRoute />
    </>
  );
}
export default App;
