import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CurrentUser } from "../../../@types/@types.currentUser";

export default function EditUserForm(): JSX.Element {
    const { id } = useParams();
    const [user, setUser] = useState<CurrentUser>({});
    const navigate = useNavigate();

    const handleFormSubmit = () => {
        
    }
return (
    <fieldset>
      <h1>Update User Form</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Formik
          initialValues={user}
          onSubmit={handleFormSubmit}
          >
          {({ isSubmitting, isValidating, isValid }) => (
            <Form>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="id">ID:</label>
                <Field
                  type="text"
                  id="id"
                  name="id"
                  value={user.id || ''}
                />
                <ErrorMessage name="id" />
              </div>
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button
                  type="submit"
                  disabled={isSubmitting || isValidating || !isValid}
                  style={{ backgroundColor: '#00A0A0' }}>
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