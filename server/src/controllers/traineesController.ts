import { Request, Response } from "express";
import { prisma } from "../config/database";

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
            requirements: { select: { name: true } },
            seniority: true,
            expiry: true,
          },
        },
      },
    });
    res.status(200).json(trainee);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
const create = (req: Request, res: Response) => {};
const edit = (req: Request, res: Response) => {};
const deleteTrainee = (req: Request, res: Response) => {};

export { index, show, create, edit, deleteTrainee as delete };
