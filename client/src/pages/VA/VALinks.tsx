import { Link } from "react-router-dom";

const VALinks = () => {
  return (
    <>
      <div className="flex justify-center gap-2">
        <Link to="/VA/alvin" className="btn btn-secondary btn-wide">
          Alvin
        </Link>
        <Link to="/VA/nimalan" className="btn btn-secondary btn-wide">
          Nimalan
        </Link>
      </div>
    </>
  );
};

export default VALinks;
