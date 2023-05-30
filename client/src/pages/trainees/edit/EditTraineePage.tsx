import { useState, useEffect, useContext } from "react";
import getRequest from "../../../utilities/getRequest";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { Trainee } from "../../../@types/trainee";
import putRequest from "../../../utilities/putRequest";
import ProgressBar from "../../../components/ProgressBar";
import LoadingPage from "../../../components/LoadingPage";
import { TitleContext } from "../../../App";
import TraineeFieldset from "../../../components/FormFieldsets/TraineeFieldset";
import { traineeSchema } from "../../../yupSchemas/traineeSchema";
import * as Yup from 'yup';

const blankTrainee = {
  callsign: "",
  category: 0,
  id: 0,
  categories: { name: "" },
  user: 0,
  users: { approved: false },
  currencies: [],
};


const EditTraineePage = () => {
  const [loadingTrainee, setIsLoadingTrainee] = useState(true);
  const { id } = useParams();
  const [trainee, setTrainee] = useState<Trainee>(blankTrainee);
  const navigate = useNavigate();
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  useEffect(() => {
    getRequest(`/api/trainees/${id}/?noTrim=true`, setTrainee).then(() => {
      if (setTitle) setTitle(trainee.callsign);
    });
  }, [loadingTrainee]);

  const handleSubmit = async () => {
    setIsLoadingTrainee(true);
    const response = (await putRequest(
      `/api/trainees/${id}`,
      trainee
    )) as Response;
    setIsLoadingTrainee(false);

    if (response.status === 200) {
      navigate("/trainees");
    } else {
      getRequest(`/api/trainees/${id}`, setTrainee);
      alert("Update unsuccessful. Please try again later");
    }
  };
  console.log("loading trainee", loadingTrainee);
  return (
    <fieldset className="justify-center">
      <div className="flex justify-center">
        {loadingTrainee && <LoadingPage/>}
          <Formik
            initialValues={trainee}
            enableReinitialize
            validationSchema={traineeSchema(trainee)}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValidating, isValid}) => (
              <Form className="space-y-6 text-center m-auto py-6">
                <TraineeFieldset
                  trainee={trainee}
                  setTrainee={setTrainee}
                  setIsLoadingTrainee={setIsLoadingTrainee}
                />
                <button
                  disabled={isSubmitting || isValidating || !isValid}
                  className="btn btn-primary"
                  type="submit"
                >
                  Update Trainee
                </button>
              </Form>
            )}
          </Formik>
      </div>
    </fieldset>
  );
};

export default EditTraineePage;
