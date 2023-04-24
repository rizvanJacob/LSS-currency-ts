import { useEffect, useState } from "react";
import { Currency } from "../../../../@types/trainee";
import dayjs from "dayjs";
import {
  CurrencyStatus,
  computeStatus,
} from "../../../../utilities/computeCurrencyStatus";
import { Link, useParams } from "react-router-dom";
import getRequest from "../../../../utilities/getRequest";

type Prop = {
  currency: Currency;
};

type Booking = {
  status: number;
  trainings?: {
    start: Date;
  };
};

const BOOKING_STATUSES = ["", "Booked", "On Waitlist"];

const CurrencyCard = ({ currency }: Prop) => {
  const { id } = useParams();
  const [status, setStatus] = useState<CurrencyStatus>({
    message: "",
    color: "",
    open: false,
  });
  const [booking, setBooking] = useState<Booking>({
    status: 0,
  });
  useEffect(() => {
    getRequest(
      `/api/trainees/${id}/bookings/${currency.requirement}`,
      setBooking
    );
    computeStatus(
      currency,
      booking.status,
      booking.trainings?.start,
      setStatus
    );
  }, []);
  return (
    <details open={status.open}>
      <summary>
        <span>{currency?.requirements?.name}</span>
      </summary>
      <p>{status.message}</p>
      <p>Next due: {dayjs(currency.expiry).format("DD-MMM-YY")}</p>
      {booking.status ? (
        <p>
          {BOOKING_STATUSES[booking.status]}:{" "}
          {dayjs(booking.trainings?.start).format("DD-MMM-YY")}
        </p>
      ) : null}
      <Link
        to={`book/${currency.requirement}/?selected=${booking.trainings?.start}`}
      >
        <button>{booking.status ? "Ammend booking" : "Book"}</button>
      </Link>
    </details>
  );
};

export default CurrencyCard;
