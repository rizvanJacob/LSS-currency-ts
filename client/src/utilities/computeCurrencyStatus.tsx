import { Trainee, Currency, CurrencyStatus } from "../@types/trainee";
import dayjs from "dayjs";

const MONTHS_TO_DUE_SOON = 2;

const STATUSES = {
  current: {
    message: "Current",
    className: "badge badge-outline badge-success",
    open: false,
  },
  dueSoonBooked: {
    message: "Due Soon, Booked",
    className: "badge badge-outline badge-success",
    open: false,
  },
  dueSoon: {
    message: "Due Soon",
    className: "badge badge-outline badge-warning",
    open: true,
  },
  expired: {
    message: "Expired",
    className: "badge badge-outline badge-error",
    open: true,
  },
};

export const computeOverallStatus = (
  trainees: Trainee[],
  setTrainees: React.Dispatch<React.SetStateAction<Trainee[]>>
) => {
  console.log(trainees);
  const updatedTrainees = trainees.map((t) => {
    const overallStatus = t.currencies.reduce(
      (status: CurrencyStatus, thisCurrency: Currency) => {
        if (isExpired(thisCurrency.expiry)) {
          return STATUSES.expired;
        }
        if (isDueSoon(thisCurrency.expiry)) {
          if (status === STATUSES.dueSoon) return status;
          const isBookedBeforeExpiry = t.trainings?.find((training) => {
            return (
              training.trainings?.requirement === thisCurrency.requirement &&
              training.status === 1 &&
              bookingIsBeforeExpiry(
                thisCurrency.expiry,
                training.trainings?.start
              )
            );
          });
          if (isBookedBeforeExpiry) return STATUSES.dueSoonBooked;
          return STATUSES.dueSoon;
        }
        return status;
      },
      STATUSES.current
    );
    t.status = overallStatus;
    return t;
  });
  setTrainees(updatedTrainees);
};

const isExpired = (expiry: Date) => {
  return dayjs().isAfter(dayjs(expiry), "day");
};

const isDueSoon = (expiry: Date) => {
  return dayjs().add(MONTHS_TO_DUE_SOON, "month").isAfter(dayjs(expiry), "day");
};

const bookingIsBeforeExpiry = (
  expiry: Date,
  bookingStart: Date | undefined
) => {
  if (!bookingStart) return false;
  return !dayjs(bookingStart).isAfter(dayjs(expiry), "day");
};

export const computeStatus = (
  currency: Currency,
  bookedStatus: number,
  bookedDate: Date | undefined,
  setStatus: React.Dispatch<React.SetStateAction<CurrencyStatus>>
) => {
  const expired = dayjs().isAfter(dayjs(currency.expiry), "day");
  const dueSoon = dayjs()
    .add(3, "month")
    .isAfter(dayjs(currency.expiry), "day");
  if (expired) {
    setStatus(STATUSES.expired);
  } else if (dueSoon) {
    if (
      bookedStatus === 1 &&
      bookingIsBeforeExpiry(currency.expiry, bookedDate)
    ) {
      setStatus(STATUSES.dueSoonBooked);
    } else {
      setStatus(STATUSES.dueSoon);
    }
  } else {
    setStatus(STATUSES.current);
  }
};
