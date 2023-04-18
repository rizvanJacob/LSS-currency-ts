import { prisma } from "../config/database";
import { Request, Response } from "express";

const categories = async (req: Request, res: Response) => {
  try {
    const data = await prisma.category.findMany();
    const categories = [""];
    data.forEach((d) => {
      categories.push(d.name);
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500);
  }
};

const statuses = async (req: Request, res: Response) => {};
const requirements = async (req: Request, res: Response) => {};
const accountTypes = async (req: Request, res: Response) => {};

export { categories, statuses, requirements, accountTypes };
