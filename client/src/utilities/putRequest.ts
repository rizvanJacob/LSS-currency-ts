import axios from "axios";
import { buildFullUrl } from "./stringManipulation";

async function putRequest(
  url: string,
  updatedData: object,
  setState?: React.Dispatch<React.SetStateAction<any>>
) {
  try {
    const token = localStorage.getItem("token");
    console.log("fire put request");
    const response = await axios.put(buildFullUrl(url), updatedData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("PUT RESPONSE", response);
    console.log("res status:", !!response.status);
    console.log("setState func:", !!setState);
    /*  if (response.status === 200 && setState) {
      console.log("updating state");
      setState(response.data);
    } */ //deleted to resolve trainee state change in edituserform. useeffect for trainee runs after navigating to /users due to dependency in useeffect hook
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export default putRequest;
