//RIZ: no need to import React since you're not using it.
import React, { useEffect, useState } from "react";

// with reference from: https://www.codingthesmartway.com/how-to-fetch-api-data-with-react/
const Alvin = () => {
  //correct use of useState. However, since this is typescript, you want to be explicit about what type of array data will contain. You will need to declare a new type called user.
  const [data, setData] = useState([]);

  //correct use of useEffect. This callback function will run once when the component is mounted, since the dependency array is empty.
  useEffect(() => {
    const fetchData = async () => {
      try {
        //correct use of the fetch API and async/await.
        const response = await fetch("/api/VA/alvin");
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    //good that you realised the useEffect callback function itself cannot be async. you need to declare the async function and call it within. Typically what we do (which you'll see if you look at our code, is to declare the function in another module and import it.)
    fetchData();
  }, []);

  return (
    // with reference from https://www.valentinog.com/blog/html-table/
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Open ID</th>
          <th>Display Name</th>
          <th>Account Type</th>
          <th>Account Type Name</th>
        </tr>
      </thead>
      <tbody>
        {/* good use of map to render the data. the reason you're getting the compilation errors is that data doesn't have its type declared. Try to get that done and you'll be good.  */}
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.openId}</td>
            <td>{user.displayName}</td>
            <td>{user.accountType}</td>
            <td>{user.accountTypes.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Alvin;
