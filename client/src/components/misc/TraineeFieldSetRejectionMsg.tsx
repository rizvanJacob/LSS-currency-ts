import { Requirement } from "../../@types/trainee";
type Props = {
    requirements: Requirement[];
    setLoadedCount: React.Dispatch<React.SetStateAction<number>>;
  };

const TraineeFieldSetRejectionMsg = ({requirements, setLoadedCount}: Props) => {
    setLoadedCount(requirements.length);
    return (
        <p className="w-64 break-normal">The currencies have been updated during the initialization of the user, please head to Trainees Page to perform currency updates</p>
    )
}

export default TraineeFieldSetRejectionMsg