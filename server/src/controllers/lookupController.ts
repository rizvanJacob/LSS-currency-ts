import { prisma } from "../config/database";
import { Request, Response } from "express";
import { trimRequirementsForTraining } from "../utilities/trimTraining";

const categories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500);
  }
};

const statuses = async (req: Request, res: Response) => {
  const statuses = await prisma.status.findMany({});

  res.status(200).json(statuses);
};

const requirements = async (req: Request, res: Response) => {
  const { category, forTraining } = req.query;

  try {
    const requirements = await prisma.requirement.findMany({
      where: category
        ? {
            categories: {
              some: {
                category: Number(category),
              },
            },
          }
        : {},
      orderBy: {
        name: "asc",
      },
    });
    if (forTraining) {
      trimRequirementsForTraining(requirements);
    }
    res.status(200).json(requirements);
  } catch (error) {
    res.send(500);
  }
};

const accountTypes = async (req: Request, res: Response) => {
  try {
    const accountTypes = await prisma.accountType.findMany({
      orderBy: {
        name: "asc",
      },
    });
    res.status(200).json(accountTypes);
  } catch (error) {
    res.status(500);
  }
};

const trainingsProvided = async (req: Request, res: Response) => {
  try {
    const trainingsProvided = await prisma.trainingProvided.findMany({
      select: {
        id: true,
        user: true,
        requirement: true,
        requirements: {
          select: {
            name: true,
            alsoCompletes: true,
          },
        },
      },
    });
    res.status(200).json(trainingsProvided);
  } catch (error) {
    res.status(500);
  }
};

const categoryToRequirement = async (req: Request, res: Response) => {
  try {
    const categoryToRequirement = await prisma.categoryToRequirement.findMany({
      orderBy: {
        requirements: {
          name: "asc",
        },
      },
      select: {
        category: true,
        categories: {
          select: {
            name: true,
          },
        },
        requirement: true,
        requirements: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log(categoryToRequirement);
    res.status(200).json(categoryToRequirement);
  } catch (err) {
    res.status(500);
  }
};
export {
  categories,
  statuses,
  requirements,
  accountTypes,
  trainingsProvided,
  categoryToRequirement,
};
