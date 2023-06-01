import { Link } from "react-router-dom";

type Prop = {
  requirement: number | undefined;
  trainingStart: Date | undefined;
  bookingStatus: number;
};

const BookButton = ({ requirement, trainingStart, bookingStatus }: Prop) => {
  return (
    <Link
      className="break-words btn btn-sm btn-secondary border-primary shadow-md"
      to={`book/${requirement}/?selected=${trainingStart}`}
    >
      <button>{bookingStatus ? "Amend" : "Book"}</button>
    </Link>
  );
};

export default BookButton;
