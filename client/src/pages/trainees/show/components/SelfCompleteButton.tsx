import { Link } from "react-router-dom";

const SelfCompleteButton = () => {
  return (
    <Link className="break-words btn btn-sm btn-outline" to={" "}>
      <button>Complete</button>
    </Link>
  );
};

export default SelfCompleteButton;
