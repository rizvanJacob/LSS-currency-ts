import axios from "axios";

async function putRequest(
  url: string,
  updatedData: object,
  setState?: React.Dispatch<React.SetStateAction<any>>
) {
  const fullUrl = import.meta.env.VITE_SERVER_URL + url;
  try {
    const token = localStorage.getItem("token");
    console.log("fire put request");
    const response = await axios.put(fullUrl, updatedData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response from put request", response);
    if (response.status === 200 && setState) {
      setState(response.data);
    }
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export default putRequest;
