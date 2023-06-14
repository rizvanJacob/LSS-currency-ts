import { useEffect, useState } from "react";

const userPage = () => {
  //RIZ: good use of useState including the naming conventions.
  // However, since this is typescript, you will want to define the
  // type of object the array should hold.
  // You'll need to create a custom "User" type or interface.
  const [users, setUsers] = useState([]);

  const fetchUserData = () => {
    fetch("/api/VA/nimalan")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  //good use of useEffect. However, since you used the .then() syntax,
  // you don't need to define fetchUserData() as a separate function
  useEffect(() => {
    fetchUserData();
    //you could have directly put in the fetch statement here, like so:
    // fetch("/api/VA/nimalan")
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(data => {
    //     setUsers(data)
    //   })

    //another way to do it would be the async/await syntax,
    // which is what Alvin did. the async/await syntax is
    // now considered best practice as it is more readable.
  }, []);

  return (
    <div>
      <table>
        {/* Additional Task: make the <thead></thead> element 
        and its children a separate component */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Open ID</th>
            <th>Display Name</th>
            <th>Account Type Name</th>
          </tr>
        </thead>
        <tbody>
          {/* RIZ: Good use of map here. However, you probably 
          don't want to use the "any" type as that negates 
          the benefits of a typed language like typescript. 
          To fix this you will have to define a custome User type or interface. */}
          {users.map((user: any) => (
            // Additional Task: make the <tr></tr> element and its children
            // a separate component. The component will have to take in a user prop.
            <tr>
              <td>{user.id}</td>
              <td>{user.openId}</td>
              <td>{user.displayName}</td>
              <td>{user.accountTypes.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default userPage;
