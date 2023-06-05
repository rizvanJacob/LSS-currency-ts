import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { buildFullUrl } from "../../utilities/stringManipulation";
import { UPDATED } from "../../App";
type AuthURLs = {
  login: string;
  checkin: string;
};

const HomePage = (): JSX.Element => {
  const [authUrls, setAuthUrls] = useState<AuthURLs>({
    login: "",
    checkin: "",
  });
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") as string;
  const state = searchParams.get("state") as string;
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getAuthUrls = async () => {
      const res = await fetch(buildFullUrl(`/api`), {
        signal: signal,
      });
      const data = await res.json();
      setAuthUrls(data);
      console.log("server updated at: ", data.updated);
    };
    getAuthUrls();

    console.log("client updated at: ", UPDATED);

    if (state === "login") {
      navigate("/loginCallback", { state: { code } });
    } else if (state === "checkin") {
      navigate("/checkinCallback", { state: { code } });
    }

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="flex flex-col mx-auto items-center justify-evenly gap-4 h-screen pt-4">
      <h1 className="badge badge-lg badge-primary badge-outline">AviAid</h1>
      <a className="btn btn-primary btn-wide" href={authUrls.login}>
        LOGIN
      </a>
      <a className="btn btn-primary btn-wide" href={authUrls.checkin}>
        CHECK IN
      </a>
      <div className="flex-1"> </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        This website is best viewed with the current browser version of Chrome.
        Some features may not display correctly on other browsers.
      </footer>
    </div>
  );
};

export default HomePage;
