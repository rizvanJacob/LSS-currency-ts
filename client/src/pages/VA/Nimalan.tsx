import { useEffect, useState } from "react";
import  TableRow  from './TableComponents';
import  TableHead  from './TableHead';


const userPage = () => {
  //RIZ: good use of useState including the naming conventions.
  // However, since this is typescript, you will want to define the
  // type of object the array should hold.
  // You'll need to create a custom "User" type or interface.
  const [users, setUsers] = useState([]);

  // const fetchUserData = () => {
    
  // };

  //good use of useEffect. However, since you used the .then() syntax,
  // you don't need to define fetchUserData() as a separate function
  useEffect(() => {
    fetch("/api/VA/nimalan")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setUsers(data);
    });    
  }, []);
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
 
  
  return(
    <table>
      <TableHead  />
           {users.map((user) => (
            <TableRow user={user} />
          ))} 
      </table>
);
};

export default userPage;


  // interface User {
  //   id: number;
  //   openId: string;
  //   displayName: string;
  //   accountTypes: {
  //     name: string;
  //   };
  // }
  // const TableRow: React.FC<TableRowProps> = ({ user }) =>{
  //   return (
  //       <tr>
  //         <td>{user.id}</td>
  //         <td>{user.openId}</td>
  //         <td>{user.displayName}</td>
  //         <td>{user.accountTypes.name}</td>
  //       </tr>
  //     );
  //   }; 
  // interface TableRowProps {
  //   user: User;
  // }


//     interface YourComponentProps {
//       users: User[];
//     }


//     const YourComponent: React.FC<YourComponentProps> = ({ users }) => {
//       return (
//       <div>  
//         <table>
//           <thead>
//             <tr>
//             <th>ID</th>
//             <th>Open ID</th>
//             <th>Display Name</th>
//             <th>Account Type</th>
//             </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <TableRow key={user.id} user={user} />
//           ))}
//           </tbody>
//       </table>
//       </div>
// );
// };

// return (
//   <div>  
//     <table>
//       <thead>
//         <tr>
//         <th>ID</th>
//         <th>Open ID</th>
//         <th>Display Name</th>
//         <th>Account Type</th>
//         </tr>
//     </thead>
//     <tbody>
//       {users.map((user) => (
//         <TableRow key={user.id} user={user} />
//       ))}
//       </tbody>
//   </table>
//   </div>
// );



// return(
//     <div>    
//             <table>
//               <YourComponent users={[]} />
//               <tr>
//            {users.map((user) => (
//             <TableRow user={user} />
//           ))} 
//           </tr>
//           </table>
//         </div>
// );
  
  

    // <div>
    //   <table>
    //     {/* Additional Task: make the <thead></thead> element 
    //     and its children a separate component */}
    //     <thead>
    //       <tr>
    //         <th>ID</th>
    //         <th>Open ID</th>
    //         <th>Display Name</th>
    //         <th>Account Type Name</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {/* RIZ: Good use of map here. However, you probably 
    //       don't want to use the "any" type as that negates 
    //       the benefits of a typed language like typescript. 
    //       To fix this you will have to define a custome User type or interface. */}
  
    //         // Additional Task: make the <tr></tr> element and its children
    //         // a separate component. The component will have to take in a user prop.
    //       {users.map((user: any) => ( 
    //         <tr>
    //           <td>{user.id}</td>
    //           <td>{user.openId}</td>
    //           <td>{user.displayName}</td>
    //           <td>{user.accountTypes.name}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>

