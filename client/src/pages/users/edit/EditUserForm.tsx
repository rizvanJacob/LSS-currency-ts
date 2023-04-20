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
  const [user, setUser] = useState<User>({
    id: 0,
    displayName: "",
    accountType: 0,
    approved: false,
    openId: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getRequest(`/api/users/${id}`, setUser);
    getRequest(`/api/lookup/accountTypes`, setAccountTypes);
  }, []);


  const handleFormSubmit = async () => {
    await putRequest(`/api/users/${id}`, user, setUser);
    navigate(`/users`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleToggleApprovedStatus = async () => {
    const updatedUser = { ...user, approved: !user.approved };
    console.log("handleToggle", updatedUser);
    setUser(updatedUser);
    await putRequest(`/api/users/${id}`, updatedUser, setUser);
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
                    )
                  })}
                </Field>
                <ErrorMessage name="accountType" />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label>Account Status:</label>
                <a>{user?.approved ? "Approved" : "Not Approved"}</a>
                {!user?.approved && (
                  <button
                    type="button"
                    id="approved"
                    name="approved"
                    onClick={handleToggleApprovedStatus}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    ✔️
                  </button>
                )}
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
