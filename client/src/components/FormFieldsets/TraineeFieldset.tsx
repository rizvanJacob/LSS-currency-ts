import TraineeParticularsFieldset from "./TraineeParticularsFieldset";
import TraineeFieldSetRejectionMsg from "../misc/TraineeFieldSetRejectionMsg"
import CurrencyFieldset from "./CurrencyFieldset";
import { useEffect, useState } from "react";
import { Requirement, Trainee } from "../../@types/trainee";
import { User  } from "../../@types/user";
import dayjs from "dayjs";
import getRequest from "../../utilities/getRequest";
import ProgressBar from "../ProgressBar";
import { CancelTokenSource } from "axios";
import { Account } from "../../../../server/src/constants"

type Props = {
  user?: User;
  trainee: Trainee;
  setTrainee: React.Dispatch<React.SetStateAction<Trainee>>;
  setIsLoadingTrainee?: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingAdmin?: boolean;
  isLoadingGeneral?: boolean;
  forceCallsign?: string;
  forceCategory?: number | null;
};

const TraineeFieldset = ({
  user,
  trainee,
  setTrainee,
  setIsLoadingTrainee = () => {},
  isLoadingAdmin,
  isLoadingGeneral,
  forceCallsign = "",
  forceCategory = 0,
}: Props) => {
  console.log("trainee check here please", trainee);
  const [requirements, setRequirements] = useState<Requirement[]>(
    trainee.categories.requirements?.map((r) => r.requirements) || []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoadingParticulars, setIsLoadingParticulars] =
    useState<boolean>(true);
  const [initialCallsign, setInitialCallsign] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    setInitialCallsign(forceCallsign);

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
    if (forceCallsign) {
      setTrainee({ ...trainee, callsign: forceCallsign });
    }
    if (forceCategory) {
      setTrainee({ ...trainee, category: forceCategory });
    }
  }, [forceCallsign, forceCategory]);

  useEffect(() => {
    if (
      loadedCount && loadedCount === requirements.length &&
      !isLoadingParticulars &&
      !isLoadingAdmin
    ) {
      setIsLoadingTrainee(false);
    }
  }, [loadedCount, isLoadingParticulars, isLoadingAdmin]);

  console.log("check for user", user)
  //specifically for trainee admin with no trainees
  useEffect(() => {
    if ( 
        user?.accountType &&
        user?.authCategory &&
        !user?.trainee?.id && 
        !isLoadingAdmin && 
        !isLoadingGeneral
    ) {
        setIsLoadingTrainee(false);
      }
  }, [user, isLoadingAdmin, isLoadingGeneral]);

  console.log("loadedCount", loadedCount, "requirements.length", requirements.length);
  console.log("isLoadingParticulars", isLoadingParticulars);
  console.log("isLoadingAdmin", isLoadingAdmin);
  const handleTraineeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "category") {
      setTrainee({ ...trainee, [name]: parseInt(value) });
    } else {
      setTrainee({ ...trainee, [name]: value });
    }
  };

  const handleExpiryChange = (value: Date | null, id: number) => {
    console.log("expiry change");

    if (trainee.currencies.find((c) => c.requirement === Number(id))) {
      const updatedCurrencies = trainee.currencies.map((c) => {
        if (c.requirement === Number(id)) {
          c.expiry = value || new Date();
        }
        return c;
      });
      setTrainee({ ...trainee, currencies: updatedCurrencies });
    } else {
      const newCurrency = {
        requirement: Number(id),
        expiry: value || new Date()
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

  return trainee.id ? (
    <div className="flex flex-col items-center gap-2">
      <TraineeParticularsFieldset
        trainee={trainee}
        handleChange={handleTraineeChange}
        setIsLoadingParticulars={setIsLoadingParticulars}
        forceCallsign={initialCallsign}
        forceCategory={forceCategory}
      />
      {isLoading ? (
        <ProgressBar />
      ) : user && user.approved ? (
        <TraineeFieldSetRejectionMsg 
          requirements={requirements}
          setLoadedCount={setLoadedCount}
        />
      ) : (requirements.length ) ? (
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
  ) : (
    null
  );
};

export default TraineeFieldset;
