import { useEffect, useState } from "react";
import { Currency, CurrencyStatus } from "../../../../@types/trainee";
import dayjs from "dayjs";
import { computeStatus } from "../../../../utilities/computeCurrencyStatus";
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
  }, []);

  useEffect(() => {
    computeStatus(
      currency,
      booking.status,
      booking.trainings?.start,
      setStatus
    );
  }, [booking]);

  return (
    <div className={"collapse collapse-arrow"}>
      <input type="checkbox" defaultChecked={status.open} />
      <h4 className={`collapse-title font-semibold text-${status.color}-600`}>
        {currency?.requirements?.name}
      </h4>
      <div className="collapse-content">
        <div className="flex">
          <div className="flex-1 flex-col">
            <p>{status.message}</p>
            <p>Next due: {dayjs(currency.expiry).format("DD-MMM-YY")}</p>
            {booking.status ? (
              <p>
                {BOOKING_STATUSES[booking.status]}:{" "}
                {dayjs(booking.trainings?.start).format("DD-MMM-YY")}
              </p>
            ) : null}
          </div>
          <Link
            className="btn btn-sm btn-outline"
            to={`book/${currency.requirement}/?selected=${booking.trainings?.start}`}
          >
            <button>{booking.status ? "Ammend booking" : "Book"}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard;
