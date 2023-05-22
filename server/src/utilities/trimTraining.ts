import { Requirement } from "@prisma/client";
import { prisma } from "../config/database";
import dayjs from "dayjs";

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
      requirement.name = removeBracketedText(requirement.name);
    }
  });
};

export const trimTrainingsProvided = (trainingsProvided: any) => {
  //get requirements that are completed by another requirement
  const secondaryRequirements = trainingsProvided.reduce(
    (acc: number[], training: any) => {
      if (training.requirements.alsoCompletes) {
        acc.push(training.requirements.alsoCompletes);
      }
      return acc;
    },
    [] as number[]
  );

  //sort secondaryRequirements in descending order
  secondaryRequirements.sort((a: number, b: number) => b - a);

  //splice trainingsProvided to requirements which are in secondaryRequirements
  secondaryRequirements.forEach((id: number) => {
    const index = trainingsProvided.findIndex((training: any) => {
      return training.requirement === id;
    });
    trainingsProvided.splice(index, 1);
  });

  //remove string in () for requirements which have alsoCompletes
  trainingsProvided.forEach((training: any) => {
    if (training.requirements.alsoCompletes) {
      training.requirements.name = removeBracketedText(
        training.requirements.name
      );
    }
  });
};

export const trimTrainingNames = (training: any) => {
  //check if requirement also completes another requirement
  if (training.requirements.alsoCompletes) {
    training.requirements.name = removeBracketedText(
      training.requirements.name
    );
  }
};

export const mapTrainingsForIndex = (allTrainings: any) => {
  allTrainings.forEach((training: any) => {
    if (training.requirements.alsoCompletes) {
      //remove string in () for requirements which have alsoCompletes
      training.requirements.name = removeBracketedText(
        training.requirements.name
      );

      //create alsoCompletes key for requirements which have alsoCompletes, with a value of the trainingId which is also completed
      const secondaryTraining = allTrainings.find((t: any) => {
        return (
          t.requirement === training.requirements.alsoCompletes &&
          dayjs(t.createdAt).isSame(dayjs(training.createdAt), "second")
        );
      });

      //add trainees and training id of secondary training into the primary training object
      if (secondaryTraining) {
        training.alsoCompletes = secondaryTraining.id;
        training.trainees.push(...secondaryTraining.trainees);
      }
    }
  });

  // get all requirements that are alsoCompleted by another requirement
  const secondaryRequirements = allTrainings.reduce(
    (acc: number[], training: any) => {
      if (
        training.requirements.alsoCompletes &&
        !acc.includes(training.requirements.alsoCompletes)
      ) {
        acc.push(training.requirements.alsoCompletes);
      }
      return acc;
    },
    []
  );
  //remove all trainings which have a requirement that is also completed by another requirement
  const filteredTrainings = allTrainings.filter((training: any) => {
    return !secondaryRequirements.includes(training.requirement);
  });

  // console.log(allTrainings);
  return filteredTrainings;
};

export const mapTrainingsForBookingCalendar = async (allTrainings: any) => {
  const relatedRequirement = await findRelatedRequirement(allTrainings[0]);
  if (!relatedRequirement) {
    return allTrainings;
  }

  const relatedTrainings = await findRelatedTrainings(relatedRequirement);

  const trainings = allTrainings.map((training: any) => {
    //find the related training
    const relatedTraining = relatedTrainings.find((t: any) => {
      return dayjs(t.createdAt).isSame(dayjs(training.createdAt), "second");
    });
    if (relatedTraining) {
      //take related training's capacity if training doesn't have a capacity
      if (!training.capacity) {
        training.capacity = relatedTraining.capacity;
      }

      //add related training's trainees to training's trainees
      training.trainees.push(...relatedTraining.trainees);
    }
    return training;
  });

  return trainings;
};

export const transformTrainingForBooking = async (training: any) => {
  const relatedRequirement = await findRelatedRequirement(training);
  if (!relatedRequirement) {
    return training;
  }

  const relatedTraining = await findRelatedTraining(
    relatedRequirement,
    training
  );
  if (!relatedTraining) {
    return training;
  }

  //take related training's capacity if training doesn't have a capacity
  if (!training.capacity) {
    training.capacity = relatedTraining.capacity;
  }

  //add related training's trainees to training's trainees
  training.trainees.push(...relatedTraining.trainees);

  return training;
};

export const transformTrainingForShow = async (training: any) => {
  const relatedRequirement = await findRelatedRequirement(training);
  if (!relatedRequirement) {
    return training;
  }

  const relatedTraining = await findRelatedTraining(
    relatedRequirement,
    training
  );
  if (!relatedTraining) {
    return training;
  }

  let returnTraining: any = {};
  if (training.capacity) {
    returnTraining = mergeTrainings(training, relatedTraining);
  } else {
    returnTraining = mergeTrainings(relatedTraining, training);
  }
  returnTraining.requirements.name = removeBracketedText(
    returnTraining.requirements.name
  );

  console.log(returnTraining);
  return returnTraining;
};

const mergeTrainings = (primaryTraining: any, secondaryTraining: any) => {
  let mergedTraining: any = primaryTraining;

  mergedTraining.relatedTraining = secondaryTraining.id;
  mergedTraining.requirementName = keepTextInBrackets(
    primaryTraining.requirements.name
  );
  mergedTraining.relatedRequirementName = keepTextInBrackets(
    secondaryTraining.requirements.name
  );
  mergedTraining.trainees.push(...secondaryTraining.trainees);

  return mergedTraining;
};

const findRelatedRequirement = async (training: any) => {
  const relatedRequirement = training.requirements.alsoCompletes
    ? { id: training.requirements.alsoCompletes }
    : await prisma.requirement.findFirst({
        where: { alsoCompletes: Number(training.requirement) },
        select: { id: true },
      });

  return relatedRequirement;
};

const findRelatedTrainings = async (relatedRequirement: { id: any }) => {
  const relatedTrainings = await prisma.training.findMany({
    where: {
      requirement: relatedRequirement.id,
    },
    select: relatedTrainingSelection,
  });
  return relatedTrainings;
};

export const findRelatedTraining = async (
  relatedRequirement: { id: any },
  training: any
) => {
  const relatedTraining = await prisma.training.findFirst({
    where: {
      requirement: relatedRequirement.id,
      createdAt: training.createdAt,
    },
    select: relatedTrainingSelection,
  });
  return relatedTraining;
};

const relatedTrainingSelection = {
  id: true,
  createdAt: true,
  capacity: true,
  trainees: {
    select: {
      trainee: true,
      status: true,
    },
  },
  requirements: {
    select: {
      name: true,
    },
  },
};

const removeBracketedText = (text: string) => {
  return text.replace(/ *\([^)]*\) */g, "");
};

const keepTextInBrackets = (text: string) => {
  return text.replace(/.*\(|\).*/g, "");
};
