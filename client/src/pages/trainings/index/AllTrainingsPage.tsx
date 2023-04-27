import { Account } from "../../../../../server/src/constants";
import { useState, useEffect, useContext } from "react";
import getRequest from "../../../utilities/getRequest";
import { Training } from "../../../@types/training";
import TrainingList from "./TrainingList";
import CreateTrainingButton from "../create/CreateTrainingButton";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext } from "../../../App";
import ProgressBar from "../../../components/ProgressBar";
export default function AllTrainingsPage(): JSX.Element {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);

  useEffect(() => {
    getRequest(`/api/trainings`, setTrainings);
  }, []);

  return trainings.length > 0 ? (
    <div className="p-4 space-y-4">
      {trainings.length > 0 ? (
        <>
          <h1 className="text-lg font-bold text-black">Training Index</h1>
          {currentUser?.accountType === Account.Trainer ||
          currentUser?.accountType === Account.Admin ? (
            <CreateTrainingButton />
          ) : (
            <></>
          )}
          <TrainingList
            trainings={trainings as Training[]}
            setTrainings={
              setTrainings as React.Dispatch<React.SetStateAction<Training[]>>
            }
          />
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <>
      <div className="p-4">
        <h1 className="text-lg font-bold">Fetching Trainings</h1>
        <ProgressBar />
      </div>
    </>
  );
}
