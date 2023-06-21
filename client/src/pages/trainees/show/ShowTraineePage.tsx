import { useEffect, useState, useContext, useRef } from "react";
import { Trainee } from "../../../@types/trainee";
import getRequest from "../../../utilities/getRequest";
import { useParams } from "react-router-dom";
import CurrencyCard from "./components/CurrencyCard";
import { TitleContext } from "../../../App";
import LoadingPage from "../../../components/LoadingPage";

const ShowTraineePage = () => {
  const { id } = useParams();
  console.log("id", id);
  const [isLoading, setIsLoading] = useState(true);
  const [trainee, setTrainee] = useState<Trainee | null>(null);
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);
  const [loadedCount, setLoadedCount] = useState<number>(0);

  useEffect(() => {
    if (setTitle) setTitle("Trainee Currencies");
    getRequest(`/api/trainees/${id}`, setTrainee);
  }, []);

  useEffect(() => {
    if (setTitle && trainee) setTitle(trainee?.callsign);
  }, [trainee]);

  useEffect(() => {
    if (loadedCount === trainee?.currencies.length) {
      setIsLoading(false);
    }
  }, [loadedCount]);

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

  return Number(id) !== 0 && trainee?.currencies.length !== 0 ? (
    <div className="flex flex-col mx-auto items-stretch w-screen max-w-md p-3">
      {isLoading && <LoadingPage />}
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
              incrementCount={() => {
                setLoadedCount((prev) => prev + 1);
              }}
            />
          );
        }
      })}
    </div>
  ) : (
    <div>No currencies to show!</div>
  );
};

export default ShowTraineePage;
