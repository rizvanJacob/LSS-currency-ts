import { useEffect, useState } from "react";
import { Currency } from "../../../../@types/trainee";
import dayjs from "dayjs";
import { computeStatus } from "../../../../utilities/computeCurrencyStatus";
import { Link } from "react-router-dom";

type Prop = {
  currency: Currency;
};

const CurrencyCard = ({ currency }: Prop) => {
  const [status, setStatus] = useState<{ message: string; color: string }>({
    message: "",
    color: "",
  });
  useEffect(() => {
    computeStatus(currency, setStatus);
  }, []);
  return (
    <details>
      <summary>
        <span>{currency?.requirements?.name}</span>
      </summary>
      <p>{status.message}</p>
      <p>Next due: {dayjs(currency.expiry).format("DD-MMM-YY")}</p>
      <Link to={`book/${currency.requirement}`}>
        <button>Book</button>
      </Link>
    </details>
  );
};

export default CurrencyCard;
