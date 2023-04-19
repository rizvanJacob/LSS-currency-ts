import { useEffect, useState } from "react";
import { Trainee } from "../../../@types/trainee";
import getRequest from "../../../utilities/getRequest";
import { useParams } from "react-router-dom";

const ShowTraineePage = () => {
  const { id } = useParams();
  const [trainee, setTrainee] = useState<Trainee | null>(null);

  useEffect(() => {
    getRequest(`/api/trainees/${id}`, setTrainee);
  }, []);

  return <>{JSON.stringify(trainee)}</>;
};

export default ShowTraineePage;
