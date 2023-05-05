import { Account } from "../../../../../server/src/constants";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { User } from "../../../@types/user";
import { Requirement } from "../../../@types/lookup";
import { SimpleLookup } from "../../../@types/lookup";
import getRequest from "../../../utilities/getRequest";
import putRequest from "../../../utilities/putRequest";
import * as Yup from "yup";
import { TitleContext } from "../../../App";
import { userSchema } from "../../../yupSchemas/userSchema"
import AdminFieldSet from "../../../components/FormFieldsets/AdminFieldset";

export default function EditUserForm(): JSX.Element {
  const { id } = useParams();
  const [accountTypes, setAccountTypes] = useState<SimpleLookup[]>([]);
  const [categoryTypes, setCategoryTypes] = useState<SimpleLookup[]>([]);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
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
  const navigate = useNavigate();
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  useEffect(() => {
    getRequest(`/api/users/${id}`, setUser);
  }, [id]);

  useEffect(() => {
    if (setTitle) setTitle("Update User");
    getRequest(`/api/lookup/accountTypes`, setAccountTypes);
    getRequest(`/api/lookup/categories`, setCategoryTypes);
    getRequest("/api/lookup/requirements", setRequirements);
  }, []);

  const handleFormSubmit = async () => {
    if (!user.approved) {
      const updatedUser = { ...user, approved: !user.approved };
      setUser(updatedUser);
      await putRequest(`/api/users/${id}`, updatedUser, setUser);
    } else {
      await putRequest(`/api/users/${id}`, user, setUser);
    }
    navigate(`/users`);
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

  return (
    <fieldset>
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-center">
          <Formik
            initialValues={user}
            validationSchema={userSchema(user)}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting, isValidating, isValid }) => (
              <Form className="space-y-6 py-4">
                {/* <AdminFieldSet user={user} handleChange={handleInputChange} /> */} 
                <div className="flex items-center">
                  <label htmlFor="displayName" className="w-2/4">
                    Display Name:
                  </label>
                  <div className="w-3/4">
                    <Field
                      type="text"
                      id="displayName"
                      name="displayName"
                      placeholder="Enter your name"
                      className="input-text input input-bordered input-primary w-full max-w-xs"
                      value={user?.displayName || ""}
                      onChange={handleInputChange}
                    />
                    <div className="error-message text-error">
                      <ErrorMessage name="displayName" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <label htmlFor="accountType" className="w-2/4">
                    Account Type:
                  </label>
                  <div className="w-3/4">
                    <Field
                      as="select"
                      type="number"
                      id="accountType"
                      name="accountType"
                      disabled
                      className="input-select select select-primary w-full max-w-xs"
                      value={user?.accountType || ""}
                      onChange={handleInputChange}
                    >
                      {accountTypes?.map((type) => {
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

                {user.accountType === Account.TraineeAdmin && (
                  <div className="flex items-center">
                    <label htmlFor="authCategory" className="w-2/4">
                      Authorization Category:
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
                {user.accountType === Account.Trainee && (
                  <>
                    <div className="flex items-center">
                      <label htmlFor="callsign" className="w-2/4">
                        Callsign:
                      </label>
                      <div className="w-3/4">
                        <Field
                          type="text"
                          id="callsign"
                          name="callsign"
                          placeholder="Enter your callsign"
                          disabled={user.accountType !== Account.Trainee}
                          value={user?.trainee?.callsign || ""}
                          onChange={handleInputChange}
                          className="input-text input input-bordered input-primary w-full max-w-xs"
                        />
                        <div className="error-message text-error">
                          <ErrorMessage name="callsign" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="category" className="w-2/4">
                        Category:
                      </label>
                      <div className="w-3/4">
                        <Field
                          as="select"
                          type="text"
                          id="category"
                          name="category"
                          disabled={user.accountType !== Account.Trainee}
                          value={
                            categoryTypes.find(
                              (type) => user?.trainee?.category === type.id
                            )?.name || ""
                          }
                          onChange={handleInputChange}
                          className="input-select select select-primary w-full max-w-xs"
                        >
                          {categoryTypes.map((type) => (
                            <option value={type.name} key={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </Field>
                        <div className="error-message text-error">
                          <ErrorMessage name="category" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex justify-center">
                  {!user?.approved ? (
                    <button
                      type="submit"
                      disabled={isSubmitting || isValidating || !isValid}
                      className="btn btn-info "
                    >
                      Update User and Approve
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || isValidating || !isValid}
                      className="btn btn-info"
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
