import { Account } from "../../../../../server/src/constants";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { User } from "../../../@types/user";
import { Requirement } from "../../../@types/lookup";
import { SimpleLookup } from "../../../@types/lookup";
import getRequest from "../../../utilities/getRequest";
import putRequest from "../../../utilities/putRequest";
import * as Yup from "yup";

export default function EditUserForm(): JSX.Element {
  const { id } = useParams();
  const [accountTypes, setAccountTypes] = useState<SimpleLookup[]>([]);
  const [categoryTypes, setCategoryTypes] = useState<SimpleLookup[]>([]);
  const [requirements, setRequirements] = useState<Requirement[]>(
    []
  );
  const [user, setUser] = useState<User>({  
    id: 0,
    displayName: "",
    accountType: 0,
    approved: false,
    authCategory: 0,
    categories: {
      name: ""
    },
    trainee: {
      callsign: "",
      category: 0
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    getRequest(`/api/users/${id}`, setUser);
  }, [id]);
  
  useEffect(() => {
    getRequest(`/api/lookup/accountTypes`, setAccountTypes);
    getRequest(`/api/lookup/categories`, setCategoryTypes);
    getRequest("/api/lookup/requirements", setRequirements);
  }, []);



  console.log(user.accountType === Account.Trainee);
  console.log(user)
  const schema = (user.accountType !== 0) && Yup.object().shape({
    accountType: Yup.number().default(user.accountType).required("Account Type is required"),
    displayName: Yup.string().default(user.displayName).required("Display Name is required"),
    approved: Yup.boolean().default(user.approved),
    authCategory: Yup.number().default(user.authCategory),
    categories: Yup.object().default(user.categories),
    trainee: Yup.object().default(user.trainee),
    category: Yup.number().when("accountType", (accountType) =>
      (Number(accountType) === Account.Trainee)
        ? Yup.number().default(user.category).required("Category is required")
        : Yup.number().nullable().default(user.category)
    ),
    callsign: Yup.string().when("accountType", (accountType) =>
      (Number(accountType) === Account.Trainee) 
        ? Yup.string().default(user.trainee?.callsign).required("Callsign is required")
        : Yup.string().nullable().default(user.trainee?.callsign)
    ),
});

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
    const parsedValue = (name === "authCategory" || name === "accountType") ? parseInt(value) : value;
    setUser(user => {
      if (name === "callsign") {
        return {
          ...user,
          trainee: {
            ...user.trainee,
            callsign: parsedValue.toString()
          }
        }
      } else if (name === "category") {
        return {
          ...user,
          trainee: {
            ...user.trainee,
            category: categoryTypes?.find((type) => (parsedValue === type.name))?.id ?? 0,
          },
        }
      } else {
        return {
          ...user,
          [name]: parsedValue
        }
      }
    });
  };

/*   const changeRequirementsProvided = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    if (requirements.includes(value)) {
      setRequirements(requirements.filter((r) => r !== value));
      setUser({
      ...user,
      trainings: user.trainings?.filter((t) => t.requirement !== value)
    });
    } else {
      setRequirements([...requirements, value]);
      setUser({
      ...user,
      trainings: [
        ...(user.trainings ?? []),
        { requirement: value }
      ]
    });
    }
  }; */

  return (
    <fieldset>
      <h1>Update User Form</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Formik initialValues={user} validationSchema={schema} onSubmit={handleFormSubmit}>
          {({ isSubmitting, isValidating, isValid }) => (
            <Form>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label htmlFor="displayName">Display Name:</label>
                <Field
                  type="text"
                  id="displayName"
                  name="displayName"
                  placeholder="Enter your name"
                  value={user?.displayName || ""}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="displayName" />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label htmlFor="accountType">Account Type:</label>
                <Field
                  as="select"
                  type="number"
                  id="accountType"
                  name="accountType"
                  disabled
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
                <ErrorMessage name="accountType" />
              </div>

              {user.accountType === Account.TraineeAdmin && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="authCategory">Authorization Category:</label>
                  <Field
                    as="select"
                    type="number"
                    id="authCategory"
                    name="authCategory"
                    disabled={user.accountType !== Account.TraineeAdmin}
                    value={user?.authCategory || ""}
                    onChange={handleInputChange}
                  >
                    {categoryTypes.map((type) => (
                      <option value={type.id} key={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="authCategory" />
                </div>
              )}
              {user.accountType === Account.Trainee && (
                <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="callsign">Callsign:</label>
                  <Field
                    type="text"
                    id="callsign"
                    name="callsign"
                    placeholder="Enter your callsign"
                    disabled={user.accountType !== Account.Trainee}
                    value={user?.trainee?.callsign || ""}
                    onChange={handleInputChange}
                  />
                  <ErrorMessage name="callsign" />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="category">Category:</label>
                  <Field
                    as="select"
                    type="text"
                    id="category"
                    name="category"
                    disabled={user.accountType !== Account.Trainee}
                    value={categoryTypes.find((type) => (user?.trainee?.category === type.id))?.name || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a category</option>
                    {categoryTypes.map((type) => (
                        <option value={type.name} key={type.id}>
                          {type.name}
                        </option>
                    ))}  
                  </Field>
                  <ErrorMessage name="category" />
                </div>
                </>
              )}
{/*               {user.accountType === Account.Trainer && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="requirements">Training Provided:</label>
                    {requirements?.map((r) => {
                      return (
                        <label key={r.id}>
                          <Field
                            type="checkbox"
                            name="requirements"
                            value={r.id}
                            checked={requirements.includes(r.id)}
                            onChange={changeRequirementsProvided}
                          />
                          {r.name}
                        </label>
                      );
                    })}
                  <ErrorMessage name="requirementsProvided" />
                </div>
              )} */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <label>Account Status:</label>
                <a>{user?.approved ? "Approved" : "Not Approved"}</a>
              </div>
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                {!user?.approved ? (
                  <button
                    type="submit"
                    disabled={isSubmitting || isValidating || !isValid}
                    style={{ backgroundColor: "#00A0A0" }}
                  >
                    Update User and Approve
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || isValidating || !isValid}
                    style={{ backgroundColor: "#00A0A0" }}
                  >
                    Update User
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </fieldset>
  );
}
