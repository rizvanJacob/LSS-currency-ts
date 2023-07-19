import { useEffect, useState, useContext } from "react";
import { Currency, CurrencyStatus } from "../../../../@types/trainee";
import dayjs from "dayjs";
import { computeStatus } from "../../../../utilities/computeCurrencyStatus";
import { Link, useParams } from "react-router-dom";
import getRequest from "../../../../utilities/getRequest";
import ProgressBar from "../../../../components/ProgressBar";
import BookButton from "./BookButton";
import SelfCompleteButton from "./SelfCompleteButton";
import { TRAINEE_ACTIONS_ACCESS } from "../../TraineesRoutes";
import { CurrentUserContext } from "../../../../App";

type Prop = {
  currency: Currency;
  selfComplete: boolean;
  handleSelfComplete: (currencyId: number, newExpiry: Date) => void;
  incrementCount: () => void;
};

type Booking = {
  status: number;
  trainings?: {
    id: number;
    start: Date;
  };
};

const getStatusName = (status: number) => {
  if (status === 1) return "Booked";
  if (status === 6) return "On Waitlist";
  return "";
};

const CurrencyCard = ({
  currency,
  selfComplete,
  handleSelfComplete,
  incrementCount,
}: Prop) => {
  const { id } = useParams();
  const [status, setStatus] = useState<CurrencyStatus>({
    message: "",
    className: "",
    open: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState<Booking>({
    status: 0,
  });
  const currentUser = useContext(CurrentUserContext);
  const canAccessActions =
    TRAINEE_ACTIONS_ACCESS.includes(currentUser?.accountType || 0) ||
    Number(id) === currentUser?.trainee?.id;

  useEffect(() => {
    getRequest(
      `/api/trainees/${id}/bookings/${currency.requirement}`,
      setBooking
    ).then(() => {
      setIsLoading(false);
      incrementCount();
    });
  }, []);

  useEffect(() => {
    computeStatus(
      currency,
      booking.status,
      booking.trainings?.start,
      setStatus
    );
  }, [booking, currency]);

  return isLoading ? (
    <ProgressBar />
  ) : (
    <div className={"collapse collapse-arrow"}>
      <input
        type="checkbox"
        checked={status.open}
        onChange={() => {
          setStatus({ ...status, open: !status.open });
        }}
      />
      <h4 className="collapse-title font-semibold text-left">
        <span className="pr-2">{currency?.requirements?.name}</span>
        <span className={status.className}>{status.message}</span>
        {currency.seniority && (
          <span className="badge badge-outline badge-primary mx-2">Senior</span>
        )}
      </h4>
      <div className="collapse-content">
        <div className="flex items-center">
          <div className="flex-1 flex-col min-w-max text-left">
            <p>Next due: {dayjs(currency.expiry).format("DD-MMM-YY")}</p>
            {booking.status > 0 && (
              <Link to={`/trainings/${booking.trainings?.id}`} className="link">
                {getStatusName(booking.status)}:{" "}
                {dayjs(booking.trainings?.start).format("DD-MMM-YY")}
              </Link>
            )}
          </div>
          {canAccessActions &&
            (selfComplete ? (
              <SelfCompleteButton
                traineeId={Number(id)}
                requirementId={currency.requirement || 0}
                handleSelfComplete={handleSelfComplete}
              />
            ) : (
              <BookButton
                requirement={currency.requirement}
                trainingStart={booking.trainings?.start}
                bookingStatus={booking.status}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard;
