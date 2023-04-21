import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { User } from "../../../@types/user";
import { SimpleLookup } from "../../../@types/lookup";
import getRequest from "../../../utilities/getRequest";
import putRequest from "../../../utilities/putRequest";

export default function EditUserForm(): JSX.Element {
  const { id } = useParams();
  const [accountTypes, setAccountTypes] = useState<SimpleLookup[] | null>(null);
  const [categoryTypes, setCategoryTypes] = useState<SimpleLookup[] | null>(null);
  const [user, setUser] = useState<User>({
    id: 0,
    displayName: "",
    accountType: 3,
    approved: false,
    authCategory: 0,
    trainee: {
      callsign: ""
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    getRequest(`/api/lookup/accountTypes`, setAccountTypes);
    getRequest(`/api/lookup/categories`, setCategoryTypes);
    getRequest(`/api/users/${id}`, setUser);
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
      } else {
        return {
          ...user,
          [name]: parsedValue
        }
      }
    });
  };

  return (
    <fieldset>
      <h1>Update User Form</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Formik initialValues={user} onSubmit={handleFormSubmit}>
          {({ isSubmitting, isValidating, isValid }) => (
            <Form>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label>Display Name:</label>
                <Field
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={user?.displayName || ""}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="displayName" />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label>Account Type:</label>
                <Field
                  as="select"
                  type="number"
                  id="accountType"
                  name="accountType"
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

              {user.accountType === 2 && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label>Authorization Category:</label>
                  <Field
                    as="select"
                    type="number"
                    id="authCategory"
                    name="authCategory"
                    value={user?.authCategory || ""}
                    onChange={handleInputChange}
                  >
                    {categoryTypes?.map((type) => {
                      return (
                        <option value={type.id} key={type.id}>
                          {type.name}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage name="authCategory" />
                </div>
              )}
              {user.accountType === 3 && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label>Callsign:</label>
                  <Field
                    type="text"
                    id="callsign"
                    name="callsign"
                    value={user?.trainee?.callsign || ""}
                    onChange={handleInputChange}
                  />
                  <ErrorMessage name="callsign" />
                </div>
              )}
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
