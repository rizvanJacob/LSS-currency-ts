import axios from "axios";
async function deleteRequest(
  url: string,
  id: number,
  setState: React.Dispatch<React.SetStateAction<any>>
) {
  const token = localStorage.getItem("token");
  console.log("fire delete request");
  const fullUrl = import.meta.env.VITE_SERVER_URL + url;
  try {
    await axios.delete(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setState((prevState: { [key: string]: any }[]) =>
      prevState.filter((state: any) => state.id !== id)
    );
  } catch (err) {
    console.error(err);
  }
}

export default deleteRequest;
