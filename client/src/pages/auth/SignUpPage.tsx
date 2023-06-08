import { Account } from "../../../../server/src/constants";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getRequest from "../../utilities/getRequest";
import postRequest from "../../utilities/postRequest";
import { Field, Form, Formik, ErrorMessage } from "formik";

import AdminFieldSet from "../../components/FormFieldsets/AdminFieldset";
import TraineeAdminFieldset from "../../components/FormFieldsets/TraineeAdminFieldset";
import TraineeParticularsFieldset from "../../components/FormFieldsets/TraineeParticularsFieldset";
import TrainerFieldset from "../../components/FormFieldsets/TrainerFieldset";

import { SimpleLookup } from "../../@types/lookup";
import { User } from "../../@types/user";
import { NewTrainee } from "../../@types/trainee";
import { signUpPageSchema } from "../../yupSchemas/signUpPageSchema";

const blankUser = {
  displayName: "",
  accountType: 0,
  id: 0,
  approved: false,
};

const blankTrainee = {
  callsign: "",
  category: 0,
  user: 0,
};

const SignUpPage = (): JSX.Element => {
  const location = useLocation();
  const [categories, setCategories] = useState<SimpleLookup[] | null>(null);
  const [accountTypes, setAccountTypes] = useState<SimpleLookup[] | null>(null);
  const [user, setUser] = useState<User>({
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
    getRequest("/api/lookup/categories", setCategories);
  }, []);

  const handleSubmit = async () => {
    if (user.openId) {
      if (
        (Number(user.accountType === Account.Admin) && includeTrainee) ||
        (Number(user.accountType) === Account.TraineeAdmin && includeTrainee) ||
        Number(user.accountType) === Account.Trainee
      ) {
        const userResponsePromise = postRequest(
          "/api/users",
          {
            ...user,
            displayName:
              Number(user.accountType) === Account.Trainee
                ? trainee.callsign
                : user.displayName,
          },
          setUser
        );
        const traineeResponsePromise = userResponsePromise.then(
          (userResponse) => {
            return postRequest(
              "/api/trainees",
              { ...trainee, 
                callsign: 
                  user.accountType === Account.Admin
                    ? user.displayName
                    : trainee.callsign,
                user: Number(userResponse?.data.id) },
              setTrainee
            );
          }
        );
        await Promise.all([userResponsePromise, traineeResponsePromise]);
      } else if (Number(user.accountType) === Account.Trainer) {
        postRequest(
          "/api/users",
          { ...user, requirementsProvided: requirementsProvided },
          setUser
        );
      } else {
        postRequest("/api/users", user, setUser);
      }
      alert("Please wait for your account to be approved");
      navigate("/", { replace: true });
    } else {
      alert("You do not have a valid token from Singpass, please log in again");
      navigate("/", { replace: true });
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: name === "accountType" ? Number(value) : value,
    });
  };
  
  const handleTraineeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "category") {
      setTrainee({ ...trainee, [name]: Number(value) });
    } else {
      setTrainee({ ...trainee, [name]: value });
    }
  };

  useEffect(() => {
    if (includeTrainee && user.accountType === Account.Admin) {
      setTrainee({
        callsign: user.displayName as string,
        category: trainee.category as number,
      });
    } else if (includeTrainee && user.accountType === Account.TraineeAdmin) {
      setTrainee({
        callsign: user.displayName as string,
        category: Number(user.authCategory) as number,
      });
    } else {
      setTrainee({ callsign: "", category: 0});
    }
  }, [includeTrainee, user])

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold mb-8">Request for an account</h1>
      <div className="flex items-center justify-center">
        <Formik
          initialValues={{ ...user, ...trainee }}
          onSubmit={handleSubmit}
          enableReinitialize
          validationSchema={signUpPageSchema(user, includeTrainee)}
        >
          {({ isSubmitting, isValidating, isValid}) => (
            <Form className="space-y-6">
              <div className="flex items-center justify-center">
                <fieldset>
                  <label className="w-1/4">Account Type:</label>
                  <div className="w-4/4">
                    <Field
                      as="select"
                      name="accountType"
                      value={user.accountType}
                      onChange={handleUserChange}
                      className="input-select select select-primary w-full max-w-xs"
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
                  </div>
                </fieldset>
              </div>
              {user.accountType == Account.Admin && (
                <div>
                  <AdminFieldSet user={user} handleChange={handleUserChange} />
                  <label className="w-1/4">Include Trainee account:</label>
                  <div className="w-4/4">
                    <Field
                      name="includeTrainee"
                      type="checkbox"
                      checked={includeTrainee}
                      className="checkbox"
                      onChange={() => setIncludeTrainee(!includeTrainee)}
                    />
                  </div>
                  {includeTrainee && (
                    <Field
                      as="select"
                      type="number"
                      id="category"
                      name="category"
                      className="input-select select select-primary w-full max-w-xs"
                      onChange = {handleTraineeChange}
                    >
                      <option value="">Select a category:</option>
                        {categories?.map((c) => {
                          return (
                            <option value={Number(c.id)} key={Number(c.id)}>
                              {c.name}
                            </option>
                          );
                        })}
                    </Field>
                  )}
                  <div className="error-message text-error">
                    <ErrorMessage name="category" />
                  </div>
                </div>
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
              <div className="flex justify-center">
                <button 
                  type="submit"
                  disabled={isSubmitting || isValidating || !isValid}
                  className="btn btn-info "
                >
                    Request Account
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
