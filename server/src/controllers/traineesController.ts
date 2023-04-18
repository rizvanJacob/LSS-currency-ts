import { Request, Response } from "express";
import { prisma } from "../config/database";

const index = async (req: Request, res: Response) => {
  try {
    const trainees = await prisma.trainee.findMany();
    res.status(200).json(trainees);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
const show = (req: Request, res: Response) => {};
const create = (req: Request, res: Response) => {};
const edit = (req: Request, res: Response) => {};
const deleteTrainee = (req: Request, res: Response) => {};

export { index, show, create, edit, deleteTrainee as delete };
