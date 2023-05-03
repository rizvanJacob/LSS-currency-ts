import axios from "axios";

async function postRequest(
  url: string,
  data: object,
  setState: React.Dispatch<React.SetStateAction<any>>
) {
  const token = localStorage.getItem("token");
  const fullUrl = import.meta.env.VITE_SERVER_URL + url;
  try {
    console.log("data fed into postrequest", data);
    const response = await axios.post(fullUrl, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      setState(response.data);
    }
    console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export default postRequest;
