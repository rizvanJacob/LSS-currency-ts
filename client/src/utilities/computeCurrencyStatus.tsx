import { Trainee, Currency } from "../@types/trainee";
import dayjs from "dayjs";

const MONTHS_TO_DUE_SOON = 3;

const STATUS_MESSAGES = {
  current: "Current",
  dueSoon: "Due Soon",
  expired: "Expired",
};

export const computeOverallStatus = (
  trainees: Trainee[],
  setTrainees: React.Dispatch<React.SetStateAction<Trainee[]>>
) => {
  console.log(`trainee count: ${trainees.length}`);
  const updatedTrainees = trainees.map((t) => {
    t.currencies.forEach((c) => {
      if (isExpired(c.expiry)) {
        t.status = STATUS_MESSAGES.expired;
      } else if (isDueSoon(c.expiry)) {
        t.status = STATUS_MESSAGES.dueSoon;
      } else {
        t.status = STATUS_MESSAGES.current;
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
  setStatus: React.Dispatch<React.SetStateAction<string>>
) => {
  const expired = dayjs().isAfter(dayjs(currency.expiry), "day");
  const dueSoon = dayjs()
    .add(3, "month")
    .isAfter(dayjs(currency.expiry), "day");
  if (expired) {
    setStatus(STATUS_MESSAGES.expired);
  } else if (dueSoon) {
    setStatus(STATUS_MESSAGES.dueSoon);
  } else {
    setStatus(STATUS_MESSAGES.current);
  }
};
