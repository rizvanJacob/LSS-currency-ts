import { useEffect, useState } from 'react';

const userPage = () => {
    const [users, setUsers] = useState([])

    const fetchUserData = () => {
        fetch("/api/VA/nimalan")
          .then(response => {
            return response.json()
          })
          .then(data => {
            setUsers(data)
          })
      }

      useEffect(() => {
        fetchUserData()
      }, []);

      return (
        <div>
          <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Open ID</th>
              <th>Display Name</th>
              <th>Account Type Name</th>
              </tr>
              </thead>
              <tbody>
        {users.map((user: any) => (
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
    }

  export default userPage;