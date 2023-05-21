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
      requirement.name = requirement.name.replace(/ *\([^)]*\) */g, "");
    }
  });
};

export const trimTrainingNames = (training: any) => {
  //check if requirement also completes another requirement
  if (training.requirements.alsoCompletes) {
    //remove string in () for requirements which have alsoCompletes
    training.requirements.name = training.requirements.name.replace(
      / *\([^)]*\) */g,
      ""
    );
  }
};

export const trimTrainingsForIndex = (allTrainings: any) => {
  allTrainings.forEach((training: any) => {
    if (training.requirements.alsoCompletes) {
      //remove string in () for requirements which have alsoCompletes
      training.requirements.name = training.requirements.name.replace(
        / *\([^)]*\) */g,
        ""
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
  const relatedRequirement = allTrainings[0].requirements.alsoCompletes
    ? { id: allTrainings[0].requirements.alsoCompletes }
    : await prisma.requirement.findFirst({
        where: { alsoCompletes: Number(allTrainings[0].requirement) },
        select: { id: true },
      });

  if (!relatedRequirement) {
    return allTrainings;
  }

  const relatedTrainings = await prisma.training.findMany({
    where: {
      requirement: relatedRequirement.id,
    },
    select: {
      id: true,
      createdAt: true,
      capacity: true,
      trainees: {
        select: {
          id: true,
        },
      },
    },
  });

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
