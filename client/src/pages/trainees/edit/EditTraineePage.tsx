import { Account } from "../../../../../server/src/constants";
import { useState, useEffect, useContext } from "react";
import getRequest from "../../../utilities/getRequest";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import TraineeParticularsFieldset from "../../../components/FormFieldsets/TraineeParticularsFieldset";
import { Trainee } from "../../../@types/trainee";
import CurrencyFieldset from "../../../components/FormFieldsets/CurrencyFieldset";
import dayjs from "dayjs";
import putRequest from "../../../utilities/putRequest";
import { CurrentUser } from "../../../@types/currentUser";
import { CurrentUserContext } from "../../../App";
import ProgressBar from "../../../components/ProgressBar";

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
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [trainee, setTrainee] = useState<Trainee>(blankTrainee);
  const navigate = useNavigate();

  useEffect(() => {
    getRequest(`/api/trainees/${id}`, setTrainee).then(() => {
      setLoading(false);
    });
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const response = (await putRequest(
      `/api/trainees/${id}`,
      trainee
    )) as Response;
    setLoading(false);

    if (response.status === 200) {
      navigate("/trainees");
    } else {
      getRequest(`/api/trainees/${id}`, setTrainee);
      alert("Update unsuccessful. Please try again later");
    }
  };

  const handleTraineeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTrainee({ ...trainee, [name]: value });
  };

  const handleExpiryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, name, value } = event.target;
    console.log("expiry change");
    console.log(id, value);

    if (trainee.currencies.find((c) => c.requirement === Number(id))) {
      const updatedCurrencies = trainee.currencies.map((c) => {
        if (c.requirement === Number(id)) {
          c.expiry = dayjs(value).toDate();
        }
        return c;
      });
      // console.log(updatedCurrencies);
      setTrainee({ ...trainee, currencies: updatedCurrencies });
    } else {
      const newCurrency = {
        requirement: Number(id),
        expiry: dayjs(value).toDate(),
      };
      const updatedCurrencies = [...trainee.currencies, newCurrency];
      setTrainee({ ...trainee, currencies: updatedCurrencies });
    }
  };

  const handleSeniorityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, name, checked } = event.target;
    console.log(id, checked);
    if (trainee.currencies.find((c) => c.requirement === Number(id))) {
      console.log("update");
      const updatedCurrencies = trainee.currencies.map((c) => {
        if (c.requirement === Number(id)) {
          c.seniority = Boolean(checked);
        }
        return c;
      });
      setTrainee({ ...trainee, currencies: updatedCurrencies });
    } else {
      console.log("create");
      const newCurrency = {
        requirement: Number(id),
        expiry: dayjs().toDate(),
        seniority: !Boolean(checked),
      };
      const updatedCurrencies = [...trainee.currencies, newCurrency];
      setTrainee({ ...trainee, currencies: updatedCurrencies });
    }
  };

  return (
    <fieldset className="justify-center">
      <h1 className="text-3xl text-center font-bold mb-8">
        Edit Trainee Profile
      </h1>
      <div className="flex justify-center">
        {!loading ? (
          <Formik initialValues={trainee} onSubmit={handleSubmit}>
            {({ isSubmitting, isValidating, isValid }) => (
              <Form className="space-y-6 text-center m-auto">
                <div className="flex justify-center">
                  <TraineeParticularsFieldset
                    trainee={trainee}
                    handleChange={handleTraineeChange}
                  />
                </div>
                {trainee.categories.requirements?.map((r) => {
                  const { requirements } = r;
                  const currency = trainee.currencies.find(
                    (c) => c.requirement === requirements.id
                  );
                  return (
                    <CurrencyFieldset
                      key={r.requirements.id}
                      requirement={requirements}
                      currency={currency}
                      handleExpiryChange={handleExpiryChange}
                      handleSeniorityChange={handleSeniorityChange}
                    />
                  );
                })}
                <div className="flex justify-center">
                  <button className="btn btn-primary" type="submit">
                    Update Trainee
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <ProgressBar />
        )}
      </div>
    </fieldset>
  );
};

export default EditTraineePage;
