import { useState } from "react";
import { Training } from "../../../@types/training";
import { useNavigate } from "react-router-dom";

type Prop = {
  training: Training;
  token: string;
  user: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CheckinToTraining = ({ training, token, user, setIsLoading }: Prop) => {
  const [passphrase, setPassphrase] = useState("");
  const navigate = useNavigate();

  const handleCheckin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch(
      `/api/trainees/checkin/?user=${user}&training=${training.id}&checkin=true`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ passphrase }),
      }
    );
    const data = await response.json();
    setIsLoading(false);
    if (response.status === 200) {
      alert(data.message);
      navigate("/");
    } else if (response.status === 400) {
      alert(data.message);
    } else {
      console.log(data);
    }
  };

  return (
    <>
      <h2>{training.requirements.name}</h2>
      <form onSubmit={handleCheckin}>
        <input
          type="password"
          name="passphrase"
          placeholder="Enter the passphrase"
          value={passphrase}
          required
          onChange={(e) => {
            setPassphrase(e.target.value);
          }}
        />
        <button>Check In</button>;
      </form>
    </>
  );
};

export default CheckinToTraining;
