import { prisma } from "../config/database";
import { Request, Response } from "express";
import { Account } from "../constants";

const analyticsController = {
  currencyChart: async (req: Request, res: Response, err: any) => {
    const { categoryId, requirementId } = req.params;
    try {
      const currency = await prisma.currency.findMany({
        where: {
          trainees: {
            category: Number(categoryId),
          },
          requirement: Number(requirementId),
        },
        select: {
          requirement: true,
          expiry: true,
          trainees: {
            select: {
              category: true,
            },
          },
        },
      });
      res.status(200).json(currency);
    } catch (err) {
      res.status(500);
    }
  },
};

export default analyticsController;
