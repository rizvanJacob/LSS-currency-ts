import { Trainee, Currency, CurrencyStatus } from "../@types/trainee";
import dayjs from "dayjs";

const MONTHS_TO_DUE_SOON = 3;

const STATUSES = {
  current: { message: "Current", color: "green", open: false },
  dueSoonBooked: { message: "Due Soon, Booked", color: "green", open: false },
  dueSoon: { message: "Due Soon", color: "orange", open: true },
  expired: { message: "EXPIRED", color: "red", open: true },
};

export const computeOverallStatus = (
  trainees: Trainee[],
  setTrainees: React.Dispatch<React.SetStateAction<Trainee[]>>
) => {
  console.log(`trainee count: ${trainees.length}`);
  const updatedTrainees = trainees.map((t) => {
    t.currencies.forEach((c) => {
      if (isExpired(c.expiry)) {
        t.status = STATUSES.expired;
      } else if (isDueSoon(c.expiry)) {
        t.status = STATUSES.dueSoon;
      } else {
        t.status = STATUSES.current;
      }
    });
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
    const isBookedBeforeExpiry = !dayjs(bookedDate).isAfter(
      dayjs(currency.expiry),
      "day"
    );
    if (bookedStatus === 1 && isBookedBeforeExpiry) {
      setStatus(STATUSES.dueSoonBooked);
    } else {
      setStatus(STATUSES.dueSoon);
    }
  } else {
    setStatus(STATUSES.current);
  }
};
