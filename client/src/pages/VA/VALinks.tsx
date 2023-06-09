import { Link } from "react-router-dom";

const VALinks = () => {
  return (
    <>
      <div className="flex justify-center gap-2">
        <Link to="/VA/alvin" className="btn btn-secondary btn-wide">
          Alvin
        </Link>
      </div>
    </>
  );
};

export default VALinks;
