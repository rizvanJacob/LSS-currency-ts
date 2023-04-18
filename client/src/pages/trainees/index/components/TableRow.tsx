import { TraineeProp } from "../../../../@types/trainee";

const TableRow = ({ trainee, category }: TraineeProp): JSX.Element => {
  return (
    <tr>
      <td>{trainee.callsign}</td>
      <td>{category}</td>
      <td>{1}</td>
      <td>Edit</td>
      <td>Delete</td>
    </tr>
  );
};

export default TableRow;
