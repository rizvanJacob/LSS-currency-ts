import { Account } from "../../../../../server/src/constants";
import { useEffect, useState, useContext } from "react";
import { Trainee } from "../../../@types/trainee";
import getRequest from "../../../utilities/getRequest";
import { useParams, useNavigate } from "react-router-dom";
import CurrencyCard from "./components/CurrencyCard";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext } from "../../../App";
const ShowTraineePage = () => {
  const { id } = useParams();
  const [trainee, setTrainee] = useState<Trainee | null>(null);
  const [fetchFlag, setFetchFlag] = useState<boolean>(false);
  const currentUser = useContext<CurrentUser | null>(CurrentUserContext);
  const navigate = useNavigate();
  const EDIT_TRAINEE_ACCESS = [Account.Admin,Account.TraineeAdmin]

  useEffect(() => {
    getRequest(`/api/trainees/${id}`, setTrainee).then(() => {
      setFetchFlag(!fetchFlag);
    });
  }, []);

  return (
    <>
      {trainee ? (
        <div className="flex flex-col mx-auto items-stretch w-screen max-w-md p-3">
          <h1 className="text-3xl font-bold ">{trainee?.callsign}</h1>
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
        <progress className="progress w-56 mx-auto" />
      )}
    </>
  );
};

export default ShowTraineePage;
