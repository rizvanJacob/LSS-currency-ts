import { useEffect, useState } from "react";
import { Currency, CurrencyStatus } from "../../../../@types/trainee";
import dayjs from "dayjs";
import { computeStatus } from "../../../../utilities/computeCurrencyStatus";
import { Link, useParams } from "react-router-dom";
import getRequest from "../../../../utilities/getRequest";
import ProgressBar from "../../../../components/ProgressBar";
import BookButton from "./BookButton";
import SelfCompleteButton from "./SelfCompleteButton";

type Prop = {
  currency: Currency;
  selfComplete: boolean;
  handleSelfComplete: (currencyId: number, newExpiry: Date) => void;
};

type Booking = {
  status: number;
  trainings?: {
    id: number;
    start: Date;
  };
};

const BOOKING_STATUSES = ["", "Booked", "On Waitlist"];

const CurrencyCard = ({ currency, selfComplete, handleSelfComplete }: Prop) => {
  const { id } = useParams();
  const [status, setStatus] = useState<CurrencyStatus>({
    message: "",
    className: "",
    open: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [booking, setBooking] = useState<Booking>({
    status: 0,
  });

  useEffect(() => {
    getRequest(
      `/api/trainees/${id}/bookings/${currency.requirement}`,
      setBooking
    ).then(() => {
      setIsLoading(false);
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
      </h4>
      <div className="collapse-content">
        <div className="flex items-center">
          <div className="flex-1 flex-col min-w-max text-left">
            <p>Next due: {dayjs(currency.expiry).format("DD-MMM-YY")}</p>
            {booking.status && (
              <Link to={`/trainings/${booking.trainings?.id}`} className="link">
                {BOOKING_STATUSES[booking.status]}:{" "}
                {dayjs(booking.trainings?.start).format("DD-MMM-YY")}
              </Link>
            )}
          </div>
          {selfComplete ? (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard;
