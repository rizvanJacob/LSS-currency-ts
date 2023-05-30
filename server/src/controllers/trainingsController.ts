import dayjs from "dayjs";
import { prisma } from "../config/database";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import {
  findRelatedTraining,
  mapTrainingsForBookingCalendar,
  mapTrainingsForIndex,
  transformTrainingForShow,
} from "../utilities/trimTraining";

const trainingsController = {
  getAllTrainings: async (req: Request, res: Response, err: any) => {
    console.log("trainings index");
    const { requirement, checkin, user } = req.query;
    try {
      const allTrainings = await prisma.training.findMany({
        where: {
          ...(requirement
            ? {
                requirement: Number(requirement),
                start: { gte: dayjs().toDate() },
                complete: false,
              }
            : {}),
          ...(checkin && user
            ? {
                trainees: {
                  some: { trainees: { user: Number(user) }, status: 1 },
                },
              }
            : {}),
        },
        orderBy: {
          start: "desc",
        },
        include: checkin
          ? {
              requirements: {
                select: {
                  name: true,
                  alsoCompletes: true,
                },
              },
            }
          : {
              requirements: {
                select: {
                  name: true,
                  alsoCompletes: true,
                },
              },
              trainees: {
                where: {
                  status: {
                    not: 4,
                  },
                },
                include: {
                  trainees: true,
                },
              },
            },
      });
      console.log(`Count of trainings: ${allTrainings.length}`);

      if (!requirement && !checkin && !user) {
        console.log("trim trainings for Index");
        const trainings = mapTrainingsForIndex(allTrainings);
        return res.status(200).json(trainings);
      } else if (requirement) {
        console.log("trim trainings for booking calendar");
        const trainings = await mapTrainingsForBookingCalendar(allTrainings);
        return res.status(200).json(trainings);
      }
      // const trainings = trimTrainingsForBookingCalendar(allTrainings);
      // return res.status(200).json(trainings);

      res.status(200).json(allTrainings);
    } catch (err) {
      console.log(err);
      res.status(500).json({ err });
    }
  },

  showTraining: async (req: Request, res: Response, err: any) => {
    try {
      const id = parseInt(req.params.trainingId);
      console.log("show training", id);
      const training = await prisma.training.findUnique({
        where: { id },
        select: {
          id: true,
          start: true,
          end: true,
          capacity: true,
          complete: true,
          instruction: true,
          requirement: true,
          passphrase: true,
          requirements: {
            select: {
              name: true,
              alsoCompletes: true,
            },
          },
          trainees: {
            select: {
              trainees: {
                select: {
                  callsign: true,
                  categories: {
                    select: {
                      name: true,
                    },
                  },
                  currencies: {
                    select: {
                      expiry: true,
                    },
                  },
                },
              },
            },
          },
          createdAt: true,
        },
      });

      const jsonUser = req.headers.authorization;
      if (jsonUser && training) {
        const user = JSON.parse(jsonUser);
        const { accountType } = user;
        if (![1, 4].includes(accountType)) {
          training.passphrase = "";
        }
      }

      const transformedTraining = await transformTrainingForShow(training);
      console.log(transformedTraining);
      res.status(200).json(transformedTraining);
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  updateTraining: async (req: Request, res: Response, err: any) => {
    try {
      const id = parseInt(req.params.trainingId);
      const { start, end, capacity, instruction, passphrase } = req.body;
      const updatedTraining = await prisma.training.update({
        where: { id },
        data: {
          start,
          end,
          capacity,
          instruction,
          updatedAt: dayjs().toDate(),
          passphrase,
        },
        select: {
          id: true,
          start: true,
          end: true,
          capacity: true,
          instruction: true,
          requirement: true,
          passphrase: true,
          requirements: {
            select: {
              alsoCompletes: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      if (updatedTraining.requirements.alsoCompletes) {
        const relatedTraining = await findRelatedTraining(
          { id: updatedTraining.requirements.alsoCompletes },
          updatedTraining
        );
        if (relatedTraining) {
          await prisma.training.update({
            where: { id: relatedTraining.id },
            data: {
              start: updatedTraining.start,
              end: updatedTraining.end,
              instruction: updatedTraining.instruction,
              updatedAt: updatedTraining.updatedAt,
              passphrase: updatedTraining.passphrase,
            },
          });
        }
      }

      res.status(200).json(updatedTraining);
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  completeTraining: async (req: Request, res: Response) => {
    const { trainingId } = req.params;
    const completedTrainees = req.body as number[];

    const updateCompletedStatuses = prisma.traineeToTraining.updateMany({
      where: {
        training: Number(trainingId),
        trainee: { in: completedTrainees },
        status: 2,
      },
      data: {
        status: 3,
        updatedAt: dayjs().toDate(),
      },
    });

    const updateAbsentStatuses = prisma.traineeToTraining.updateMany({
      where: {
        training: Number(trainingId),
        trainee: {
          notIn: completedTrainees,
        },
        status: 2,
      },
      data: {
        status: 5,
        updatedAt: dayjs().toDate(),
      },
    });

    const updateTraineeCurrencies = completedTrainees.map((t) =>
      updateCurrencyByTraining(t, Number(trainingId))
    );

    const updateTraining = prisma.training.update({
      where: { id: Number(trainingId) },
      data: { complete: true, updatedAt: dayjs().toDate() },
    });

    try {
      await Promise.all([
        updateCompletedStatuses,
        updateAbsentStatuses,
        updateTraineeCurrencies,
        updateTraining,
      ]);
      res.send(200);
    } catch (error) {
      res.send(500).json(error);
    }
  },

  deleteTraining: async (req: Request, res: Response, err: any) => {
    try {
      const id = parseInt(req.params.trainingId);

      const [, training] = await prisma.$transaction([
        prisma.traineeToTraining.deleteMany({
          where: { training: id },
        }),
        prisma.training.delete({
          where: { id },
          include: {
            requirements: {
              select: {
                alsoCompletes: true,
              },
            },
          },
        }),
      ]);

      if (training.requirements.alsoCompletes) {
        const relatedTraining = await findRelatedTraining(
          { id: training.requirements.alsoCompletes },
          training
        );
        if (relatedTraining) {
          await prisma.$transaction([
            prisma.traineeToTraining.deleteMany({
              where: { training: relatedTraining.id },
            }),
            prisma.training.delete({
              where: { id: relatedTraining.id },
            }),
          ]);
        }
      }
      res
        .status(200)
        .json({ message: "Training and Bookings deleted successfully" });
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  createTraining: async (req: Request, res: Response, err: any) => {
    try {
      const { start, end, capacity, instruction, requirement, passphrase } =
        req.body;
      const newTrainingData: Prisma.TrainingCreateInput[] = [
        {
          start: start,
          end: end,
          capacity: parseInt(capacity),
          instruction: instruction,
          requirements: {
            connect: {
              id: parseInt(requirement),
            },
          },
          complete: false,
          passphrase: passphrase,
        },
      ];
      const primaryRequirement = await prisma.requirement.findUnique({
        where: { id: parseInt(requirement) },
        select: { alsoCompletes: true },
      });
      if (!primaryRequirement) {
        return res.status(400).json({ message: "No such requirement" });
      }
      const { alsoCompletes } = primaryRequirement;
      if (alsoCompletes) {
        newTrainingData.push({
          start: start,
          end: end,
          capacity: 0,
          instruction: instruction,
          requirements: {
            connect: {
              id: alsoCompletes,
            },
          },
          complete: false,
          passphrase: passphrase,
        });
      }
      const newTrainings = await Promise.all(
        newTrainingData.map(async (t) => {
          return await prisma.training.create({
            data: t,
          });
        })
      );
      console.log(newTrainings);
      res.status(200).json(newTrainings);
    } catch (err) {
      res.status(500).json({ err });
    }
  },
};
export default trainingsController;

const updateCurrencyByTraining = async (
  traineeId: number,
  trainingId: number
) => {
  const getRequirement = prisma.requirement.findFirst({
    where: {
      trainings: {
        some: {
          id: trainingId,
        },
      },
    },
  });

  const getTrainee = prisma.trainee.findUnique({
    where: { id: traineeId },
    select: {
      currencies: {
        where: {
          requirements: {
            trainings: {
              some: {
                id: trainingId,
              },
            },
          },
        },
        select: { seniority: true, expiry: true },
      },
    },
  });

  const getTraining = prisma.training.findUnique({
    where: { id: Number(trainingId) },
    select: { end: true },
  });

  try {
    const [requirement, trainee, training] = await Promise.all([
      getRequirement,
      getTrainee,
      getTraining,
    ]);
    const currency = trainee?.currencies[0];
    const extension =
      (currency?.seniority
        ? requirement?.seniorExtension
        : requirement?.extensionPeriod) || 0;

    if (currency && requirement && training) {
      const newExpiry = getNextExpiry(
        currency?.expiry,
        training?.end,
        requirement?.rehackPeriod,
        extension,
        true
      );
      console.log(`extend refresh ${requirement.name} expiry to ${newExpiry}}`);

      if (requirement.alsoCompletes) {
        await updateCurrencyByRequirement(
          traineeId,
          requirement.alsoCompletes,
          training.end
        );
      }

      return prisma.currency.update({
        where: {
          trainee_requirement: {
            trainee: traineeId,
            requirement: requirement.id,
          },
        },
        data: { expiry: newExpiry.toDate(), updatedAt: dayjs().toDate() },
      });
    } else {
      return null;
    }
  } catch (error) {}
};

const updateCurrencyByRequirement = async (
  traineeId: number,
  requirementId: number,
  completedOn: Date
) => {
  const getRequirement = prisma.requirement.findUnique({
    where: { id: requirementId },
  });

  const getTrainee = prisma.trainee.findUnique({
    where: { id: traineeId },
    select: {
      currencies: {
        where: {
          requirement: requirementId,
        },
        select: { seniority: true, expiry: true },
      },
    },
  });

  try {
    const [requirement, trainee] = await Promise.all([
      getRequirement,
      getTrainee,
    ]);
    const currency = trainee?.currencies[0];
    const extension =
      (currency?.seniority
        ? requirement?.seniorExtension
        : requirement?.extensionPeriod) || 0;

    if (currency && requirement) {
      const newExpiry = getNextExpiry(
        currency?.expiry,
        completedOn,
        requirement?.rehackPeriod,
        extension,
        requirement.refreshToMonthEnd
      );
      console.log(`extend ${requirement.name} expiry to ${newExpiry}`);

      return prisma.currency.update({
        where: {
          trainee_requirement: {
            trainee: traineeId,
            requirement: requirement.id,
          },
        },
        data: { expiry: newExpiry.toDate(), updatedAt: dayjs().toDate() },
      });
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export function getNextExpiry(
  expiry: Date,
  lastAttended: Date,
  reattemptPeriod: number,
  validityExtension: number,
  refreshToEndOfMonth: boolean
) {
  const isBeforeExpiry = !dayjs(lastAttended).isAfter(dayjs(expiry), "day");
  const reattemptWindowStart = dayjs(expiry).subtract(
    reattemptPeriod,
    "months"
  );
  const isAfterWindowStart = !reattemptWindowStart.isAfter(
    dayjs(expiry),
    "day"
  );
  const isWithinReattemptWindow = isBeforeExpiry && isAfterWindowStart;

  if (isWithinReattemptWindow) {
    if (refreshToEndOfMonth) {
      return dayjs(expiry).add(validityExtension, "month").endOf("month");
    } else {
      return dayjs(expiry).add(validityExtension, "month");
    }
  } else {
    return dayjs(lastAttended).add(validityExtension, "month");
  }
}
