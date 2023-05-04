import axios from "axios";
import { buildFullUrl } from "./stringManipulation";

async function getRequest(
  url: string,
  setState: React.Dispatch<React.SetStateAction<any>>
) {
  const token = localStorage.getItem("token");
  const source = axios.CancelToken.source();
  try {
    const response = await axios.get(buildFullUrl(url), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    });
    setState(response.data);
    return { response, source };
  } catch (err) {
    console.error(err);
  }
  return { source };
}

export default getRequest;
