import { Link } from 'react-router-dom';

export default function EditUserButton(): JSX.Element {
  return (
    <>
      <Link to={`users/123id/edit`}>
        <button style={{ backgroundColor: '#00A0A0' }}>Edit</button>
      </Link>
    </>
  );
}
