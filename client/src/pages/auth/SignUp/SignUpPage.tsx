import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getRequest from "../../../utilities/getRequest";
import { SimpleLookup } from "../../../@types/lookup";
import { User } from "../../../@types/user";
import { Field, Form, Formik } from "formik";
import AdminFieldSet from "./FormComponents/AdminFieldset";
import TraineeAdminFieldset from "./FormComponents/TraineeAdminFieldset";
import TraineeFieldset from "./FormComponents/TraineeFieldset";
import { NewTrainee } from "../../../@types/trainee";

const SignUpPage = (): JSX.Element => {
  const location = useLocation();
  const [accountTypes, setAccountTypes] = useState<SimpleLookup[] | null>(null);
  const [user, setUser] = useState<User>({
    id: 0,
    displayName: "",
    accountType: 0,
    approved: false,
  });
  const [trainee, setTrainee] = useState<NewTrainee>({
    callsign: "",
    category: 0,
  });

  useEffect(() => {
    getRequest("/api/lookup/accountTypes", setAccountTypes);
  }, []);

  const handleSubmit = () => {
    console.log("submit form");
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleTraineeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setTrainee({ ...trainee, [name]: value });
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
            {user.accountType == 1 && (
              <AdminFieldSet user={user} handleChange={handleUserChange} />
            )}
            {user.accountType == 2 && (
              <TraineeAdminFieldset
                user={user}
                handleChange={handleUserChange}
                setTrainee={setTrainee}
              />
            )}
            {user.accountType == 3 && (
              <TraineeFieldset
                trainee={trainee}
                handleChange={handleTraineeChange}
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
