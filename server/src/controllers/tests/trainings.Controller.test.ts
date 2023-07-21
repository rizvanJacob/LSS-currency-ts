import { getNextExpiry } from "../trainingsController";
import dayjs from "dayjs";

describe("getNextExpiry", () => {
  it("should return expiry date at the end of the month if within reattempt window and refreshToEndOfMonth is true", () => {
    const expiry = dayjs().toDate();
    const lastAttended = dayjs().subtract(1, "day").toDate();
    const reattemptPeriod = 1;
    const validityExtension = 1;
    const refreshToEndOfMonth = true;

    const nextExpiry = getNextExpiry(
      expiry,
      lastAttended,
      reattemptPeriod,
      validityExtension,
      refreshToEndOfMonth
    );

    expect(
      nextExpiry.isSame(
        dayjs().add(validityExtension, "month").endOf("month"),
        "day"
      )
    ).toBeTruthy();
  });

  it("should return expiry date if within reattempt window and refreshToEndOfMonth is false", () => {
    const expiry = dayjs().toDate();
    const lastAttended = dayjs().subtract(1, "day").toDate();
    const reattemptPeriod = 1;
    const validityExtension = 1;
    const refreshToEndOfMonth = false;

    const nextExpiry = getNextExpiry(
      expiry,
      lastAttended,
      reattemptPeriod,
      validityExtension,
      refreshToEndOfMonth
    );

    expect(
      nextExpiry.isSame(dayjs().add(validityExtension, "month"), "day")
    ).toBeTruthy();
  });

  it("should return last attended date plus validity extension if not within reattempt window", () => {
    const expiry = dayjs().subtract(1, "month").toDate();
    const lastAttended = dayjs().toDate();
    const reattemptPeriod = 1;
    const validityExtension = 1;
    const refreshToEndOfMonth = false;

    const nextExpiry = getNextExpiry(
      expiry,
      lastAttended,
      reattemptPeriod,
      validityExtension,
      refreshToEndOfMonth
    );

    expect(
      nextExpiry.isSame(
        dayjs(lastAttended).add(validityExtension, "month"),
        "day"
      )
    ).toBeTruthy();
  });
});
