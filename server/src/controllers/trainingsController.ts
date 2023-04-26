import dayjs from "dayjs";
import { prisma } from "../config/database";
import e, { Request, Response } from "express";
import exp from "constants";
import { isUndefined } from "util";

const trainingsController = {
  getAllTrainings: async (req: Request, res: Response, err: any) => {
    const { requirement, checkin, user } = req.query;
    try {
      const allTrainings = await prisma.training.findMany({
        where: {
          ...(requirement ? { requirement: Number(requirement) } : {}),
          ...(checkin && user
            ? {
                trainees: {
                  some: { trainees: { user: Number(user) }, status: 1 },
                },
              }
            : {}),
        },
        orderBy: {
          requirement: "asc",
        },
        include: checkin
          ? {}
          : {
              requirements: {
                select: {
                  name: true,
                },
              },
              trainees: {
                include: {
                  trainees: true,
                },
              },
            },
      });
      res.status(200).json(allTrainings);
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  getAllTrainingsByTrainer: async (req: Request, res: Response, err: any) => {
    const { userId } = req.params;
    try {
      const trainingsProvided = await prisma.trainingProvided.findMany({
        where: { user: Number(userId) },
      });

      const requirements = trainingsProvided.map((trainingProvided) => {
        return Number(trainingProvided.requirement);
      });

      const trainingsByTrainer = await prisma.training.findMany({
        where: {
          requirement: {
            in: requirements,
          },
        },
        orderBy: {
          requirement: "asc",
        },
        select: {
          id: true,
          start: true,
          end: true,
          capacity: true,
          complete: true,
          instruction: true,
          requirement: true,
          requirements: {
            select: {
              name: true,
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
        },
      });
      res.status(200).json(trainingsByTrainer);
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  showTraining: async (req: Request, res: Response, err: any) => {
    try {
      const id = parseInt(req.params.id);
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
          requirements: {
            select: {
              name: true,
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
        },
      });
      // console.log(training);
      res.status(200).json(training);
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  updateTraining: async (req: Request, res: Response, err: any) => {
    try {
      const id = parseInt(req.params.id);
      const { requirement, start, end, capacity, instruction } = req.body;
      const updatedTraining = await prisma.training.update({
        where: { id },
        data: {
          start,
          end,
          capacity,
          instruction,
          requirement,
          updatedAt: dayjs().toDate(),
        },
        select: {
          id: true,
          start: true,
          end: true,
          capacity: true,
          instruction: true,
          requirement: true,
        },
      });
      res.status(200).json(updatedTraining);
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  completeTraining: async (req: Request, res: Response) => {
    const { id: trainingId } = req.params;
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
      updateCurrency(t, Number(trainingId))
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
      const id = parseInt(req.params.id);
      await prisma.training.delete({
        where: { id },
      });
      res.status(200).json({ message: "Training deleted successfully" });
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  createTraining: async (req: Request, res: Response, err: any) => {
    try {
      const { start, end, capacity, instruction, requirement } = req.body;
      const newTraining = await prisma.training.create({
        data: {
          start: start,
          end: end,
          capacity: parseInt(capacity),
          instruction: instruction,
          requirement: parseInt(requirement),
          complete: false,
        },
      });
      res.status(200).json(newTraining);
    } catch (err) {
      res.status(500).json({ err });
    }
  },
};
export default trainingsController;

const updateCurrency = async (traineeId: number, trainingId: number) => {
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

    if (
      currency?.expiry !== undefined &&
      training?.end !== undefined &&
      requirement?.rehackPeriod !== undefined &&
      extension !== undefined
    ) {
      const newExpiry = getNextExpiry(
        currency?.expiry,
        training?.end,
        requirement?.rehackPeriod,
        extension,
        true
      );

      return prisma.currency.update({
        where: {
          trainee_requirement: {
            trainee: traineeId,
            requirement: requirement.id,
          },
        },
        data: { expiry: newExpiry.toDate(), updatedAt: dayjs().toDate() },
      });
    }
  } catch (error) {}
};

function getNextExpiry(
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
