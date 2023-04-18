import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const Decode = () => {
  const [payload, setPayload] = useState<string>("");
  useEffect(() => {
    const token = localStorage.getItem("token") as string;
    const decoded = jwt_decode(token);
    console.log(decoded);
    setPayload(token);
  }, []);
  return <h1>{payload}</h1>;
};

export default Decode;
