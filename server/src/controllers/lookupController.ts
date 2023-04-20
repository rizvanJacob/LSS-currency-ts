import { prisma } from "../config/database";
import { Request, Response } from "express";

const categories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
       orderBy: {
        name: "asc"
      }
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500);
  }
};

const statuses = async (req: Request, res: Response) => {};

const requirements = async (req: Request, res: Response) => {
  try {
    const requirements = await prisma.requirement.findMany({
      orderBy: {
        name: "asc"
      }
    });
    res.status(200).json(requirements);
  } catch (error) {
    res.send(500);
  }
};

const accountTypes = async (req: Request, res: Response) => {
  try {
    const accountTypes = await prisma.accountType.findMany({
       orderBy: {
        name: "asc"
      }
    });
    res.status(200).json(accountTypes);
  } catch (error) {
    res.status(500);
  }
};

export { categories, statuses, requirements, accountTypes };
