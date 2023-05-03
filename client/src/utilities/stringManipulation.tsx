const toTitleCase = (str: string | undefined) => {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else return undefined;
};

const buildFullUrl = (url: string) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  if (serverUrl) {
    return serverUrl + url;
  } else {
    return url;
  }
};

export { toTitleCase, buildFullUrl };
