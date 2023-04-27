import { useEffect, useState, useContext } from "react";
import { Trainee } from "../../../@types/trainee";
import getRequest from "../../../utilities/getRequest";
import { useParams } from "react-router-dom";
import CurrencyCard from "./components/CurrencyCard";
import { TitleContext } from "../../../App";
import ProgressBar from "../../../components/ProgressBar";

const ShowTraineePage = () => {
  const { id } = useParams();
  const [trainee, setTrainee] = useState<Trainee | null>(null);
  const [fetchFlag, setFetchFlag] = useState<boolean>(false);
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  useEffect(() => {
    if (setTitle) setTitle("Trainee Currencies");
    getRequest(`/api/trainees/${id}`, setTrainee).then(() => {
      setFetchFlag(!fetchFlag);
    });
  }, []);

  useEffect(() => {
    if (setTitle && trainee) setTitle(trainee?.callsign);
  }, [trainee]);

  return (
    <>
      {trainee ? (
        <div className="flex flex-col mx-auto items-stretch w-screen max-w-md p-3">
          <p className="text-lg">{trainee?.categories.name}</p>
          {trainee?.currencies.map((c) => {
            if (
              trainee.categories.requirements?.find((r) => {
                return r.requirements.id === c.requirement;
              })
            ) {
              return <CurrencyCard currency={c} key={c.id} />;
            }
          })}
        </div>
      ) : (
        <ProgressBar />
      )}
    </>
  );
};

export default ShowTraineePage;
