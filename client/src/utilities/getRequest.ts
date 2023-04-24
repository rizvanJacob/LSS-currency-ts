import axios from "axios";

async function getRequest(
  url: string,
  setState: React.Dispatch<React.SetStateAction<any>>
) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    setState(response.data);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export default getRequest;
