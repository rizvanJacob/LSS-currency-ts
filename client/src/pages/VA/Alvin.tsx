import React, { useEffect, useState } from "react";


// with reference from: https://www.codingthesmartway.com/how-to-fetch-api-data-with-react/
const Alvin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/VA/alvin");
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

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