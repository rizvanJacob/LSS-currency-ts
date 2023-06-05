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

      let currencyMap: { [key: string]: number } = {};
      currency.forEach((c) => {
        const formattedExpiry = dayjs(c.expiry).format("MMM YYYY");
        if (!currencyMap[formattedExpiry]) {
          currencyMap[formattedExpiry] = 1;
        } else {
          currencyMap[formattedExpiry]++;
        }
      });

      let currentDate = dayjs().startOf("month");
      const maxChart = currentDate.add(12, "month");
      const monthsBetween = [];

      while (
        currentDate.isBefore(maxChart) ||
        currentDate.isSame(maxChart, "month")
      ) {
        const formattedMonth = currentDate.format("MMM YYYY");
        const monthData = currencyMap[formattedMonth];
        if (monthData !== 0) {
          monthsBetween.push(formattedMonth);
        } else {
          monthsBetween.push(formattedMonth);
          currencyMap[formattedMonth] = 0;
        }
        currentDate = currentDate.add(1, "month");
      }

      const filteredCurrencyMap = monthsBetween.reduce(
        (obj: { [key: string]: number }, key: string) => {
          if (currencyMap[key]) {
            obj[key] = currencyMap[key];
          } else {
            obj[key] = 0;
          }
          return obj;
        },
        {}
      );

      const obtainHistoricalTotalExpired = (
        monthsBetween: string[],
        obj: { [key: string]: number }
      ) => {
        const historicalCurrency = Object.entries(obj).filter(
          ([key]) => !monthsBetween.includes(key)
        );

        const totalExpired = historicalCurrency.reduce((accum, value) => {
          return accum + value[1];
        }, 0);

        return totalExpired;
      };

      const totalExpired = obtainHistoricalTotalExpired(
        monthsBetween,
        currencyMap
      );

      console.log(
        "Response data sent to analytics currency chart",
        filteredCurrencyMap
      );
      res.status(200).json({ filteredCurrencyMap, totalExpired });
    } catch (err) {
      res.status(500);
    }
  },
};

export default analyticsController;
