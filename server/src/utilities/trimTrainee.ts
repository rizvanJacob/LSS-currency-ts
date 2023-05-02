const trimRequirements = (trainee: any) => {
  const trimmedRequirements = trainee.categories.requirements.filter(
    (r: any) => {
      if (r.requirements.seniorExtension !== -1) return true;
      const traineeCurrency = trainee.currencies.find(
        (c: any) => c.requirement === r.requirements.id
      );
      return traineeCurrency?.seniority;
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
    return currencyInRequirements;
  });
  return trimmedCurrencies;
};

export { trimRequirements, trimCurrencies };
