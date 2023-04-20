import axios from "axios";

async function putRequest(
  url: string,
  updatedData: object,
  setState?: React.Dispatch<React.SetStateAction<any>>
) {
  try {
    console.log("fire put request");
    const response = await axios.put(url, updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
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
