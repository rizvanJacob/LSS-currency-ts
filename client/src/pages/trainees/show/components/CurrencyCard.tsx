import { useEffect, useState } from "react";
import { Currency } from "../../../../@types/trainee";
import dayjs from "dayjs";
import { computeStatus } from "../../../../utilities/computeCurrencyStatus";

type Prop = {
  currency: Currency;
};

const CurrencyCard = ({ currency }: Prop) => {
  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    computeStatus(currency, setStatus);
  }, []);
  return (
    <details>
      <summary>
        <span>{currency?.requirements?.name}</span>
      </summary>
      <p>{status}</p>
      <p>Next due: {dayjs(currency.expiry).format("DD-MMM-YY")}</p>
      <button>Book</button>
    </details>
  );
};

export default CurrencyCard;
