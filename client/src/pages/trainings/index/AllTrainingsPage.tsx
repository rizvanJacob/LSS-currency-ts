import { Account } from "../../../../../server/src/constants";
import { useState, useEffect, useContext } from 'react';
import getRequest from "../../../utilities/getRequest";
import { Training } from "../../../@types/training";
import TrainingList from "./TrainingList"
import CreateTrainingButton from "../create/CreateTrainingButton";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext } from "../../../App";
export default function AllTrainingsPage(): JSX.Element {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const currentUser = useContext<CurrentUser | null>(CurrentUserContext);

    useEffect(() => {
        getRequest(`/api/trainings`, setTrainings);
    }, [])
    
    return (
        <>
            {trainings.length > 0 ? (
            <>
                <h1>Training Index</h1>
                {currentUser?.accountType === Account.Trainer ? <CreateTrainingButton /> : <></>}
                <TrainingList trainings = { trainings as Training[] } setTrainings = { setTrainings as React.Dispatch<React.SetStateAction<Training[]>>} />
            </>
            ) : (
            <>
                <h1>Fetching Trainings</h1>
                <p><progress /></p>
            </>
            )}
        </>
      ) : (
        <>
          <h1>Fetching Trainings</h1>
          <p>
            <progress className="progress w-56" />
          </p>
        </>
      )}
    </>
  );
}
