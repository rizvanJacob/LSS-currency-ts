import TraineeParticularsFieldset from "./TraineeParticularsFieldset";
import CurrencyFieldset from "./CurrencyFieldset";
import { useEffect, useState } from "react";
import { Requirement, Trainee } from "../../@types/trainee";
import dayjs from "dayjs";
import getRequest from "../../utilities/getRequest";
import ProgressBar from "../ProgressBar";
import { CancelTokenSource } from "axios";

type Props = {
  trainee: Trainee;
  setTrainee: React.Dispatch<React.SetStateAction<Trainee>>;
  setIsLoadingTrainee?: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingAdmin: boolean;
};

const TraineeFieldset = ({
  trainee,
  setTrainee,
  setIsLoadingTrainee = () => {},
  isLoadingAdmin,
}: Props) => {
  console.log("trainee check here please", trainee);
  const [requirements, setRequirements] = useState<Requirement[]>(
    trainee.categories.requirements?.map((r) => r.requirements) || []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoadingParticulars, setIsLoadingParticulars] =
    useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    let cancelToken: CancelTokenSource;
    getRequest(
      `/api/lookup/requirements/?category=${trainee.category}`,
      setRequirements
    ).then(({ source }) => {
      cancelToken = source;
      setIsLoading(false);
    });
    return () => {
      cancelToken?.cancel();
    };
  }, [trainee.category]);

  useEffect(() => {
    if (
      loadedCount === requirements.length &&
      !isLoadingParticulars &&
      !isLoadingAdmin
    ) {
      setIsLoadingTrainee(false);
    }
  }, [loadedCount, isLoadingParticulars, isLoadingAdmin]);

  const handleTraineeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "category") {
      setTrainee({ ...trainee, [name]: parseInt(value) });
    } else {
      setTrainee({ ...trainee, [name]: value });
    }
  };

  const handleExpiryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, name, value } = event.target;
    console.log("expiry change");

    if (trainee.currencies.find((c) => c.requirement === Number(id))) {
      const updatedCurrencies = trainee.currencies.map((c) => {
        if (c.requirement === Number(id)) {
          c.expiry = dayjs(value).toDate();
        }
        return c;
      });
      setTrainee({ ...trainee, currencies: updatedCurrencies });
    } else {
      const newCurrency = {
        requirement: Number(id),
        expiry: dayjs(value).toDate(),
      };
      const updatedCurrencies = [...trainee.currencies, newCurrency];
      setTrainee({ ...trainee, currencies: updatedCurrencies });
    }
  };

  const handleSeniorityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, checked } = event.target;
    console.log(id, checked);
    if (trainee.currencies.find((c) => c.requirement === Number(id))) {
      console.log("update");
      const updatedCurrencies = trainee.currencies.map((c) => {
        if (c.requirement === Number(id)) {
          c.seniority = Boolean(checked);
        }
        return c;
      });
      setTrainee({ ...trainee, currencies: updatedCurrencies });
    } else {
      console.log("create");
      const newCurrency = {
        requirement: Number(id),
        expiry: dayjs().toDate(),
        seniority: !Boolean(checked),
      };
      const updatedCurrencies = [...trainee.currencies, newCurrency];
      setTrainee({ ...trainee, currencies: updatedCurrencies });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <TraineeParticularsFieldset
        trainee={trainee}
        handleChange={handleTraineeChange}
        setIsLoadingParticulars={setIsLoadingParticulars}
      />
      {isLoading ? (
        <ProgressBar />
      ) : requirements.length ? (
        requirements.map((r) => {
          const currency = trainee.currencies.find(
            (c) => c.requirement === r.id
          );
          return (
            <CurrencyFieldset
              key={r.id}
              requirement={r}
              currency={currency}
              handleExpiryChange={handleExpiryChange}
              handleSeniorityChange={handleSeniorityChange}
              incrementCount={() => setLoadedCount((prev) => prev + 1)}
            />
          );
        })
      ) : (
        <p>There are no requirements in this category</p>
      )}
    </div>
  );
};

export default TraineeFieldset;
