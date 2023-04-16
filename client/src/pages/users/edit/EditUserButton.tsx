import { Link } from 'react-router-dom';
import { UserProps } from "../index/AllUsersPage";

export default function EditUserButton({ user }: { user: UserProps }): JSX.Element {
  return (
    <>
      <Link to={`users/${user.id}/edit`}>
        <button style={{ backgroundColor: '#00A0A0' }}>Edit</button>
      </Link>
    </>
  );
}
