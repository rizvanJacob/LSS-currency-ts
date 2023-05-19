import dayjs from "dayjs";

const trimRequirements = (trainee: any) => {
  const trimmedRequirements = trainee.categories.requirements.filter(
    (r: any) => {
      const notRequiredForSenior = r.requirements.seniorExtension === -1;
      const traineeCurrency = trainee.currencies.find(
        (c: any) => c.requirement === r.requirements.id
      );
      const isSenior = traineeCurrency?.seniority;
      if (notRequiredForSenior && isSenior) return false;

      return true;
    }
  );
  return trimmedRequirements;
};

const trimCurrencies = (trainee: any) => {
  const trimmedCurrencies = trainee.currencies.filter((c: any) => {
    const currencyInRequirements = trainee.categories.requirements.find(
      (r: any) => {
        return c.requirement === r.requirements.id;
      }
    );

    const parentRequirement = trainee.categories.requirements.find((r: any) => {
      return c.requirement === r.requirements.alsoCompletes;
    })?.requirements;
    const parentCurrency = trainee.currencies.find((c: any) => {
      return c.requirement === parentRequirement?.id;
    });
    const hasDistictExpiry =
      !parentCurrency ||
      !dayjs(c.expiry).isSame(dayjs(parentCurrency.expiry), "day");

    return currencyInRequirements && hasDistictExpiry;
  });
  return trimmedCurrencies;
};

export { trimRequirements, trimCurrencies };
