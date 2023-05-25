import { Account } from "../../../../../server/src/constants";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { User } from "../../../@types/user";
import { SimpleLookup } from "../../../@types/lookup";
import { Trainee } from "../../../@types/trainee";
import getRequest from "../../../utilities/getRequest";
import putRequest from "../../../utilities/putRequest";
import { TitleContext } from "../../../App";
import { userSchema } from "../../../yupSchemas/userSchema";
import AdminFieldSet from "../../../components/FormFieldsets/AdminFieldset";
import TraineeFieldSet from "../../../components/FormFieldsets/TraineeFieldset";
import TrainerFieldSet from "../../../components/FormFieldsets/TrainerFieldset";
import ProgressBar from "../../../components/ProgressBar";
import LoadingPage from "../../../components/LoadingPage";

export default function EditUserForm(): JSX.Element {
  const { id } = useParams();
  const [accountTypes, setAccountTypes] = useState<SimpleLookup[]>([]);
  const [categoryTypes, setCategoryTypes] = useState<SimpleLookup[]>([]);
  const [requirementsProvided, setRequirementsProvided] = useState<number[]>(
    []
  );
  const [user, setUser] = useState<User>({
    id: 0,
    displayName: "",
    accountType: 0,
    approved: false,
    authCategory: 0,
    categories: {
      name: "",
    },
    trainee: {
      callsign: "",
      category: 0,
    },
  });

  const blankTrainee = {
    callsign: "",
    category: 0,
    id: 0,
    categories: { name: "" },
    user: 0,
    users: { approved: false },
    currencies: [],
  };

  const [trainee, setTrainee] = useState<Trainee>(blankTrainee);
  const navigate = useNavigate();
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRequest(`/api/users/${id}`, setUser);
  }, [id]);

  useEffect(() => {
    if (user && user.trainee && user.trainee.id) {
      getRequest(`/api/trainees/${Number(user.trainee.id)}`, setTrainee);
    }
  }, [user?.trainee?.id]);

  useEffect(() => {
    if (setTitle) setTitle("Update User");
    getRequest(`/api/lookup/accountTypes`, setAccountTypes);
    getRequest(`/api/lookup/categories`, setCategoryTypes);
  }, []);

  useEffect(() => {
    if (
      user.accountType === Account.Admin ||
      user.accountType === Account.TraineeAdmin
    ) {
      if (!isLoadingAdmin) {
        setIsLoading(false);
      }
    }
  }, [isLoadingAdmin]);

  const handleFormSubmit = async () => {
    console.log("submit form");
    if (!user.approved) {
      if (user.accountType === Account.Trainee) {
        await putRequest(`/api/trainees/${trainee.id}`, trainee, setTrainee);
      }
      const updatedUser = { ...user, approved: !user.approved };
      console.log("update and approve user");
      await putRequest(`/api/users/${id}`, updatedUser, setUser);
    } else {
      if (user.accountType === Account.Trainee) {
        await putRequest(`/api/trainees/${trainee.id}`, trainee, setTrainee);
      }
      await putRequest(`/api/users/${id}`, user, setUser);
    }
    navigate("/users");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const parsedValue =
      name === "authCategory" || name === "accountType"
        ? parseInt(value)
        : value;
    setUser((user) => {
      if (name === "callsign") {
        return {
          ...user,
          trainee: {
            ...user.trainee,
            callsign: parsedValue.toString(),
          },
        };
      } else if (name === "category") {
        return {
          ...user,
          trainee: {
            ...user.trainee,
            category:
              categoryTypes?.find((type) => parsedValue === type.name)?.id ?? 0,
          },
        };
      } else {
        return {
          ...user,
          [name]: parsedValue,
        };
      }
    });
  };

  console.log("isLoading", isLoading);
  return (
    <fieldset>
      {isLoading && <LoadingPage />}
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-center">
          <Formik
            initialValues={user}
            validationSchema={userSchema(user)}
            enableReinitialize
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting, isValidating, isValid }) => (
              <Form className="space-y-6 py-4">
                <div className="flex items-center justify-center">
                  <label htmlFor="accountType" className="w-2/4">
                    Account Type:
                  </label>
                  <div className="w-3/4">
                    <Field
                      as="select"
                      type="number"
                      id="accountType"
                      name="accountType"
                      disabled={[1, 4].includes(user?.accountType)}
                      className="input-select select select-primary w-full max-w-xs"
                      value={user?.accountType || ""}
                      onChange={handleInputChange}
                    >
                      {accountTypes?.map((type) => {
                        if ([1, 4].includes(type.id)) return null;
                        return (
                          <option value={type.id} key={type.id}>
                            {type.name}
                          </option>
                        );
                      })}
                    </Field>
                    <div className="error-message text-error">
                      <ErrorMessage name="accountType" />
                    </div>
                  </div>
                </div>
                {user.accountType !== Account.Trainer && (
                  <AdminFieldSet
                    user={user}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(e);
                      if (Number(e.target.value) !== Account.TraineeAdmin) {
                        setUser({ ...user, authCategory: undefined });
                      } else {
                        setUser({ ...user, authCategory: trainee.category });
                      }
                    }}
                    setIsLoadingAdmin={setIsLoadingAdmin}
                  />
                )}
                {user.accountType === Account.TraineeAdmin && (
                  <div className="flex items-center justify-center flex-col">
                    <label htmlFor="authCategory" className="w-4/4">
                      Authorized Category:
                    </label>
                    <div className="w-3/4">
                      <Field
                        as="select"
                        type="number"
                        id="authCategory"
                        name="authCategory"
                        disabled={user.accountType !== Account.TraineeAdmin}
                        value={user?.authCategory || ""}
                        onChange={handleInputChange}
                        className="input-select select select-primary w-full max-w-xs"
                      >
                        <option value={0}>Select an option</option>
                        {categoryTypes.map((type) => (
                          <option value={type.id} key={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </Field>
                      <div className="error-message text-error">
                        <ErrorMessage name="authCategory" />
                      </div>
                    </div>
                  </div>
                )}
                {trainee.id && user?.trainee?.id ? (
                  <>
                    <TraineeFieldSet
                      trainee={trainee}
                      setTrainee={setTrainee}
                      setIsLoadingTrainee={setIsLoading}
                      isLoadingAdmin={isLoadingAdmin}
                    />
                  </>
                ) : user.accountType === Account.Trainee ? (
                  <ProgressBar />
                ) : null}
                {user.accountType === Account.Trainer && (
                  <>
                    <TrainerFieldSet
                      user={user}
                      setUser={setUser}
                      handleChange={handleInputChange}
                      requirementsProvided={requirementsProvided}
                      setRequirementsProvided={setRequirementsProvided}
                      setIsLoading={setIsLoading}
                    />
                  </>
                )}
                <div className="flex justify-center">
                  {!user?.approved ? (
                    <button
                      type="submit"
                      disabled={isSubmitting || isValidating || !isValid}
                      className="btn btn-info btn-block "
                    >
                      Update User and Approve
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || isValidating || !isValid}
                      className="btn btn-info btn-block"
                    >
                      Update User
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </fieldset>
  );
}
