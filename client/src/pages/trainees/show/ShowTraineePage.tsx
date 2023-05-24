import { useEffect, useState, useContext } from "react";
import { Trainee } from "../../../@types/trainee";
import getRequest from "../../../utilities/getRequest";
import { useParams } from "react-router-dom";
import CurrencyCard from "./components/CurrencyCard";
import { TitleContext } from "../../../App";
import ProgressBar from "../../../components/ProgressBar";

const ShowTraineePage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [trainee, setTrainee] = useState<Trainee | null>(null);
  const [fetchFlag, setFetchFlag] = useState<boolean>(false);
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);
  const [count, setCount]= useState(0);
  const incrementCount = () => {
    setCount(count + 1);
  }
  
  useEffect(() => {
    if (setTitle) setTitle("Trainee Currencies");
    getRequest(`/api/trainees/${id}`, setTrainee).then(() => {
      setFetchFlag(!fetchFlag);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (setTitle && trainee) setTitle(trainee?.callsign);
  }, [trainee]);

  const handleSelfComplete = (requirementId: number, newExpiry: Date) => {
    if (!trainee) return;
    setTrainee({
      ...trainee,
      currencies: trainee?.currencies.map((c) => {
        if (c.requirement === requirementId) {
          return { ...c, expiry: newExpiry };
        } else {
          return c;
        }
      }),
    });
  };

  return isLoading && count !== trainee?.categories?.requirements?.length ? (
    <ProgressBar />
  ) : (
    <div className="flex flex-col mx-auto items-stretch w-screen max-w-md p-3">
      <p className="text-lg">{trainee?.categories.name}</p>
      {trainee?.currencies.map((c) => {
        const requirement = trainee.categories.requirements?.find((r) => {
          return r.requirements.id === c.requirement;
        });
        if (requirement) {
          return (
            <CurrencyCard
              currency={c}
              key={c.id}
              selfComplete={requirement.requirements.selfComplete || false}
              handleSelfComplete={handleSelfComplete}
              incrementCount={incrementCount}
            />
          );
        }
      })}
    </div>
  );
};

export default ShowTraineePage;
