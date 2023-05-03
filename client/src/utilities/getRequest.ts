import axios from "axios";

async function getRequest(
  url: string,
  setState: React.Dispatch<React.SetStateAction<any>>
) {
  const token = localStorage.getItem("token");
  const fullUrl = import.meta.env.VITE_SERVER_URL + url;
  try {
    const response = await axios.get(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setState(response.data);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export default getRequest;
