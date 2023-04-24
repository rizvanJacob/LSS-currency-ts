const toTitleCase = (str: string | undefined) => {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else return undefined;
};

export { toTitleCase };
