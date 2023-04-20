import { Request, Response } from "express";
import { prisma } from "../config/database";
import { accountTypes } from "./lookupController";

const index = async (req: Request, res: Response) => {
  try {
    const trainees = await prisma.trainee.findMany({
      include: {
        users: { select: { approved: true } },
        categories: { select: { name: true } },
        currencies: { select: { expiry: true } },
      },
    });
    res.status(200).json(trainees);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const trainee = await prisma.trainee.findUnique({
      where: { id: Number(id) },
      include: {
        users: {
          select: {
            approved: true,
          },
        },
        categories: { select: { name: true } },
        currencies: {
          select: {
            id: true,
            requirements: { select: { name: true } },
            seniority: true,
            expiry: true,
          },
        },
      },
    });
    if (trainee) {
      res.status(200).json(trainee);
    } else {
      res.status(404);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
const create = (req: Request, res: Response) => {};
const edit = (req: Request, res: Response) => {};

const deleteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const trainee = await prisma.trainee.findUnique({
      where: { id: Number(id) },
      select: { users: { select: { id: true, accountType: true } } },
    });
    const userId = trainee?.users.id;

    const deleteCurrencies = prisma.currency.deleteMany({
      where: {
        trainee: Number(id),
      },
    });
    const deleteTrainings = prisma.traineeToTraining.deleteMany({
      where: {
        trainee: Number(id),
      },
    });
    const deleteTrainee = prisma.trainee.delete({
      where: {
        id: Number(id),
      },
    });

    await prisma.$transaction([
      deleteCurrencies,
      deleteTrainings,
      deleteTrainee,
    ]);
    if (trainee?.users.accountType === 3) {
      await prisma.user.delete({ where: { id: Number(userId) } });
    }
    res.status(200);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { index, show, create, edit, deleteController as delete };
