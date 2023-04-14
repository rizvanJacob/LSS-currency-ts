import "./App.css";
import axios from "axios";
import { useState } from "react";
import AllUsersPage from "./pages/users/index/AllUsersPage";

function App() {
  const [data, setData] = useState();
  const urlWithProxy = "/api";

  function getDataFromServer() {
    axios
      .get(urlWithProxy)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
    <div className="App">
      <button onClick={getDataFromServer}>Access server using proxy</button>
      <p>data : {data}</p>
    </div>

    <AllUsersPage />
    </>
  );
}

export default App;
