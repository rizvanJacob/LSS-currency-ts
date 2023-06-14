interface User {
    id: number;
    openId: string;
    displayName: string;
    accountTypes: {
      name: string;
    };
  }

  interface TableRowProps {
    user: User;
  }
  const TableRow: React.FC<TableRowProps> = ({ user }) =>{
    return (
        <tbody>
            <tr>
            <td>{user.id}</td>
            <td>{user.openId}</td>
            <td>{user.displayName}</td>
            <td>{user.accountTypes.name}</td>
            </tr>
        </tbody>
      );
    };   
    
export default TableRow;

// interface TableHeadProps {
//     users: User[];
//   }


// const TableHead: React.FC<TableHeadProps> = ({ }) => {
//     return (
//     <div>  
//       <table>
//         <thead>
//           <tr>
//           <th>ID</th>
//           <th>Open ID</th>
//           <th>Display Name</th>
//           <th>Account Type</th>
//           </tr>
//       </thead>
//       {/* <tbody>
//         {users.map((user) => (
//           <TableRow key={user.id} user={user} />
//         ))}
//         </tbody> */}
//     </table>
//     </div>
// );
// };


