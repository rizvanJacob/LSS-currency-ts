import { Requirement } from "@prisma/client";

export const trimRequirementsForTraining = (requirements: Requirement[]) => {
  // get all requirements that are alsoCompleted by another requirement
  const secondaryRequirements = requirements.reduce((acc, requirement) => {
    if (requirement.alsoCompletes) {
      acc.push(requirement.alsoCompletes);
    }
    return acc;
  }, [] as number[]);
  console.log(secondaryRequirements);

  //sort secondaryRequirements in descending order
  secondaryRequirements.sort((a, b) => b - a);

  //splice requirements to remove requirements whose id is in secondaryRequirements
  secondaryRequirements.forEach((id) => {
    const index = requirements.findIndex((requirement) => {
      return requirement.id === id;
    });
    requirements.splice(index, 1);
  });

  //remove string in () for requirements which have alsoCompletes
  requirements.forEach((requirement) => {
    if (requirement.alsoCompletes) {
      requirement.name = requirement.name.replace(/ *\([^)]*\) */g, "");
    }
  });
};
