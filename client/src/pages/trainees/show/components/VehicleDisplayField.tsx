import { useEffect, useState } from "react";
import { decryptString } from "../../../../utilities/cryptoUtils";
import { Field, Form, Formik } from "formik";
import Edit from "../../../../assets/icons/editIcon.svg";
import ConfirmIcon from "../../../../assets/icons/ConfirmIcon";
import postRequest from "../../../../utilities/postRequest";
import putRequest from "../../../../utilities/putRequest";
import { AxiosResponse } from "axios";

type Props = {
  inputVehicle: string;
  traineeId: number;
};

const VehicleDisplayField = ({ inputVehicle, traineeId }: Props) => {
  const [encryptedVehicle, setEncryptedVehicle] =
    useState<string>(inputVehicle);
  const [vehicle, setVehicle] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  useEffect(() => {
    decryptString(encryptedVehicle)
      .then((result) => {
        setVehicle(result);
      })
      .catch((e) => {
        const error = e as Error;

        console.log("unable to decrypt");
        console.log(error.message);
      });
  }, [encryptedVehicle]);

  const handleFormSubmit = async () => {
    if (edit) setEdit(!edit);
    const axiosResponse = await putRequest(
      `/api/trainees/${traineeId}/vehicle`,
      {
        vehicle,
      }
    );
    const response = axiosResponse as AxiosResponse;
    if (response.status === 200) {
      setEncryptedVehicle(response.data.vehicle);
    }
  };

  if (!encryptedVehicle) return null;
  return (
    <div className="collapse collapse-arrow">
      <input type="checkbox" />
      <div className="collapse-title">My Vehicle</div>
      <div className="collapse-content">
        <Formik initialValues={{ vehicle }} onSubmit={handleFormSubmit}>
          {({ isSubmitting, isValidating, isValid, handleSubmit }) => (
            <Form>
              <div className="flex flex-row items-center justify-between py-1">
                <Field
                  className="input input-bordered input-primary input-sm w-full max-w-xs"
                  type="text"
                  id="vehicle"
                  name="vehicle"
                  value={vehicle || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setVehicle(e.target.value)
                  }
                  disabled={!edit}
                />

                <label className="swap">
                  <input
                    type="checkbox"
                    checked={!edit}
                    onClick={() => {
                      if (edit) {
                        handleSubmit();
                      }
                      setEdit(!edit);
                    }}
                  />
                  <div className="swap-on btn btn-square btn-secondary btn-sm">
                    <img src={Edit} alt="edit" />
                  </div>
                  <div className="swap-off btn btn-square btn-secondary btn-sm text-primary">
                    <ConfirmIcon className="w-5 h-5" />
                  </div>
                </label>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VehicleDisplayField;
