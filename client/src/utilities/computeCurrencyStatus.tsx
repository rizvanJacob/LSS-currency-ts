import { Trainee } from "../@types/trainee";
import dayjs from "dayjs";

export const computeOverallStatus = (
  trainees: Trainee[],
  setTrainees: React.Dispatch<React.SetStateAction<Trainee[]>>
) => {
  console.log(`trainee count: ${trainees.length}`);
  const updatedTrainees = trainees.map((t) => {
    t.currencies.forEach((c) => {
      const expired = dayjs().isAfter(dayjs(c.expiry), "day");
      const dueSoon = dayjs().add(3, "month").isAfter(dayjs(c.expiry), "day");
      if (expired) {
        t.status = "EXPIRED";
      } else if (dueSoon) {
        t.status = "Due soon";
      } else {
        t.status = "Current";
      }
    });
    return t;
  });
  setTrainees(updatedTrainees);
};
