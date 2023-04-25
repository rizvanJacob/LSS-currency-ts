import { prisma } from "../config/database";
import { Request, Response } from "express";

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
    console.log("Complete training. Completed trainees: ");
    console.log(req.body);

    const completedTrainees = req.body;

    const updateStatuses = completedTrainees.map(
      (t: { trainee: number; training: number }) => {
        prisma.traineeToTraining.update({
          where: {
            trainee_training: {
              trainee: t.trainee,
              training: t.training,
            },
            status: 2,
          },
          data: {
            status: 3,
          },
        });
      }
    );

    await Promise.all(updateStatuses);

    res.send(200);
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
