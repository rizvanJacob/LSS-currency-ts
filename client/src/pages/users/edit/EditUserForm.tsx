import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { UserProps } from "../../../@types/UserProps";
import getRequest from "../../../utilities/getRequest";
import putRequest from "../../../utilities/putRequest";

export default function EditUserForm(): JSX.Element {
  const { id } = useParams();
  const [user, setUser] = useState<UserProps>({
    id: 0,
    displayName: "",
    accountType: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getRequest(`/api/users/${id}`, setUser);
  }, []);

  const handleFormSubmit = async () => {
    await putRequest(`/api/users/${id}`, user, setUser);
    navigate(`/users`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <fieldset>
      <h1>Update User Form</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Formik initialValues={user} onSubmit={handleFormSubmit}>
          {({ isSubmitting, isValidating, isValid }) => (
            <Form>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label htmlFor="displayName">Display Name:</label>
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
                <label htmlFor="accountType">Account Type:</label>
                <Field
                  type="number"
                  id="accountType"
                  name="accountType"
                  value={user?.accountType || ""}
                  onChange={handleInputChange}
                />
                <ErrorMessage name="accountType" />
              </div>
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <button
                  type="submit"
                  disabled={isSubmitting || isValidating || !isValid}
                  style={{ backgroundColor: "#00A0A0" }}
                >
                  Update User
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </fieldset>
  );
}
