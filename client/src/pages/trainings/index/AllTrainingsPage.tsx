import { Account } from "../../../../../server/src/constants"
import { useState, useEffect, useContext } from 'react';
import getRequest from "../../../utilities/getRequest";
import { Training } from "../../../@types/training";
import TrainingList from "./TrainingList"
import CreateTrainingForm from "../create/CreateTrainingButton";
import { SimpleLookup } from "../../../@types/lookup";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext } from "../../../App";

const TRAINING_INDEX_ACCESS = [1,2];

export default function AllTrainingsPage(): JSX.Element {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [trainingsProvided, setTrainingsProvided] = useState<any>();
    const currentUser = useContext<CurrentUser | null>(CurrentUserContext);

    if (TRAINING_INDEX_ACCESS.includes(Number(currentUser?.accountType))) {
        useEffect(() => {
            getRequest(`/api/trainings`, setTrainings);
            
        }, [])
    } else if (Number(currentUser?.accountType) === Account.Trainer) {
        useEffect(() => {
            getRequest(`/api/trainings/${Number(currentUser?.id)}/trainer`, setTrainings);
        }, [])
    }
    console.log(trainingsProvided);
    return (
        <>
            {trainings.length > 0 ? (
            <>
                <h1>Training Index</h1>
                <CreateTrainingForm />
                <TrainingList trainings = { trainings as Training[] } setTrainings = { setTrainings as React.Dispatch<React.SetStateAction<Training[]>>} />
            </>
            ) : (
            <>
                <h1>Fetching Trainings</h1>
                <p><progress /></p>
            </>
            )}
        
        </>
    )
}