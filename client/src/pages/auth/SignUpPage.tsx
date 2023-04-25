import { Account } from "../../../../server/src/constants"
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getRequest from "../../utilities/getRequest";
import postRequest from "../../utilities/postRequest";
import { Field, Form, Formik } from "formik";

import AdminFieldSet from "../../components/FormFieldsets/AdminFieldset";
import TraineeAdminFieldset from "../../components/FormFieldsets/TraineeAdminFieldset";
import TraineeParticularsFieldset from "../../components/FormFieldsets/TraineeParticularsFieldset";
import TrainerFieldset from "../../components/FormFieldsets/TrainerFieldset";

import { SimpleLookup } from "../../@types/lookup";
import { NewUser } from "../../@types/user";
import { NewTrainee } from "../../@types/trainee";

const blankUser = {
  displayName: "",
  accountType: 0,
};

const blankTrainee = {
  callsign: "",
  category: 0,
  user: 0,

};

const SignUpPage = (): JSX.Element => {
  const location = useLocation();
  const [accountTypes, setAccountTypes] = useState<SimpleLookup[] | null>(null);
  const [user, setUser] = useState<NewUser>({
    ...blankUser,
    openId: location.state?.openId,
    requirementsProvided: [],
  });
  const [trainee, setTrainee] = useState<NewTrainee>(blankTrainee);
  const [includeTrainee, setIncludeTrainee] = useState<boolean>(false);
  const [requirementsProvided, setRequirementsProvided] = useState<number[]>(
    []
  );
  const navigate = useNavigate();
  useEffect(() => {
    getRequest("/api/lookup/accountTypes", setAccountTypes);
  }, []);

  const handleSubmit = async () => {
    if (user.openId) {
      if ((Number(user.accountType) === Account.TraineeAdmin && includeTrainee) || Number(user.accountType) === Account.Trainee) {
        const userResponsePromise = postRequest("/api/users", {...user, displayName: (Number(user.accountType) === Account.Trainee) ? trainee.callsign : user.displayName}, setUser);
        const traineeResponsePromise = userResponsePromise.then(userResponse => {
          return postRequest("/api/trainees", {...trainee, user: Number(userResponse?.data.id)}, setTrainee);
        });
        await Promise.all([userResponsePromise, traineeResponsePromise]);
      } else if (Number(user.accountType) === Account.Trainer) {
        postRequest("/api/users", {...user, requirementsProvided: requirementsProvided}, setUser)
      } else {
        postRequest("/api/users", user, setUser);
      }
      alert("Please wait for your account to be approved");
      navigate("/", { replace: true });
    } else {
      alert("You do not have a valid token from Singpass, please log in again")
      navigate("/", { replace: true });
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: (name==="accountType") ? Number(value) : value });
  };

  const handleTraineeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setTrainee({ ...trainee, [name]: (name === "category") ? Number(value) : value });
  };

  return (
    <>
      <h1>Request for an account</h1>
      <Formik initialValues={user as any} onSubmit={handleSubmit}>
        {({ isSubmitting, isValidating, isValid }) => (
          <Form>
            <fieldset>
              <legend>Account Type:</legend>
              <Field
                as="select"
                name="accountType"
                value={user.accountType}
                onChange={handleUserChange}
              >
                <option value="">Select an Account Type</option>
                {accountTypes?.map((t) => {
                  return (
                    <option value={t.id} key={t.id}>
                      {t.name}
                    </option>
                  );
                })}
              </Field>
            </fieldset>
            {user.accountType == Account.Admin && (
              <AdminFieldSet user={user} handleChange={handleUserChange} />
            )}
            {user.accountType == Account.TraineeAdmin && (
              <TraineeAdminFieldset
                user={user}
                handleChange={handleUserChange}
                setTrainee={setTrainee}
                includeTrainee={includeTrainee}
                setIncludeTrainee={setIncludeTrainee}
              />
            )}
            {user.accountType == Account.Trainee && (
              <TraineeParticularsFieldset
                trainee={trainee}
                handleChange={handleTraineeChange}
              />
            )}
            {user.accountType == Account.Trainer && (
              <TrainerFieldset
                user={user}
                setUser={setUser}
                handleChange={handleUserChange}
                requirementsProvided={requirementsProvided}
                setRequirementsProvided={setRequirementsProvided}
              />
            )}

            <button>Request Account</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpPage;
