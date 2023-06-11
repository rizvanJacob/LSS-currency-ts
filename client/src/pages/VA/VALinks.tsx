import { Link } from "react-router-dom";

const VALinks = () => {
  return (
    <>
      <div className="flex justify-center gap-2 py-2">
        <Link to="/VA/alvin" className="btn btn-secondary btn-md">
          Alvin
        </Link>
        <Link to="/VA/nimalan" className="btn btn-secondary btn-md">
          Nimalan
        </Link>
        <Link to="/" className="btn btn-secondary btn-md">
          Home
        </Link>
      </div>
    </>
  );
};

export default VALinks;
