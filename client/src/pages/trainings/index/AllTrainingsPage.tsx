import { Account } from "../../../../../server/src/constants";
import { useState, useEffect, useContext } from "react";
import getRequest from "../../../utilities/getRequest";
import { Training } from "../../../@types/training";
import TrainingList from "./TrainingList";
import CreateTrainingButton from "../create/CreateTrainingButton";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext, TitleContext } from "../../../App";
import ProgressBar from "../../../components/ProgressBar";

export default function AllTrainingsPage(): JSX.Element {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  useEffect(() => {
    if (setTitle) setTitle("Trainings Index");
    getRequest(`/api/trainings`, setTrainings);
  }, []);

  return trainings.length > 0 ? (
    <div className="p-4 space-y-4">
      {trainings.length > 0 ? (
        <>
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
    <ProgressBar />
  );
}
