import { Account } from "../../../../../server/src/constants";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext, TitleContext } from "../../../App";
import getRequest from "../../../utilities/getRequest";
import TraineesTable from "./components/TraineesTable";
import { Trainee, TraineeFilterOptions } from "../../../@types/trainee";
import { computeOverallStatus } from "../../../utilities/computeCurrencyStatus";
import deleteRequest from "../../../utilities/deleteRequest";
import ProgressBar from "../../../components/ProgressBar";
import TraineesFilterControls from "./components/TraineesFilterControls";
import { TRAINEE_AMEND_ACCESS } from "../TraineesRoutes";

const TraineesIndexPage = (): JSX.Element => {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [fetchFlag, setFetchFlag] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<TraineeFilterOptions>({
    category: 0,
  });
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (setTitle) setTitle("Trainees Index");
    getRequest("/api/trainees", setTrainees).then(() => {
      setFetchFlag(!fetchFlag);
    });
  }, []);

  useEffect(() => {
    computeOverallStatus(trainees, setTrainees);
  }, [fetchFlag]);

  const deleteTrainee = (id: number) => async () => {
    if (!TRAINEE_AMEND_ACCESS.includes(Number(currentUser?.accountType))) {
      return navigate(`/`);
    }
    deleteRequest(`/api/trainees/${id}`, id, setTrainees);
  };

  return (
    <>
      {trainees.length > 0 ? (
        <>
          <TraineesFilterControls
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            trainees={trainees}
          />
          <TraineesTable
            trainees={
              filterOptions.category
                ? trainees.filter((t) => t.category === filterOptions.category)
                : trainees
            }
            deleteTrainee={deleteTrainee}
          />
        </>
      ) : (
        <ProgressBar />
      )}
    </>
  );
};

export default TraineesIndexPage;
