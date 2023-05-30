import { prisma } from "../config/database";
import { Request, Response } from "express";
import { Account } from "../constants";
import dayjs from "dayjs";

const analyticsController = {
  currencyChart: async (req: Request, res: Response, err: any) => {
    try {
      const { requirementId } = req.params;
      const currency = await prisma.currency.findMany({
        where: {
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

      const currencyMap: { [key: string]: number } = {};
      currency.forEach((c) => {
        const formattedExpiry = dayjs(c.expiry).format("MMM YYYY");
        if (!currencyMap[formattedExpiry]) {
          currencyMap[formattedExpiry] = 1;
        } else {
          currencyMap[formattedExpiry]++;
        }
      });
      console.log(
        "Response data sent to analytics currency chart",
        currencyMap
      );
      res.status(200).json(currencyMap);
    } catch (err) {
      res.status(500);
    }
  },
};

export default analyticsController;
