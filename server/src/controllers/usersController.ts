import { Account } from "../constants";
import { prisma } from "../config/database";
import { Request, Response } from "express";
import dayjs from "dayjs";

const MAX_USERS = 100;

const usersController = {
  createUser: async (req: Request, res: Response, err: any) => {
    console.log(req.body);
    const {
      openId,
      accountType,
      displayName,
      authCategory,
      trainings,
      requirementsProvided,
    } = req.body;
    try {
      const numUsers = await prisma.user.count();
      console.log(`There are ${numUsers} records in the database`);
      if (numUsers < MAX_USERS) {
        try {
          await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.create({
              data: {
                openId: openId,
                accountType: Number(accountType),
                displayName: displayName,
                authCategory:
                  accountType === Account.TraineeAdmin
                    ? Number(authCategory)
                    : null,
              },
            });

            if (accountType === Account.Trainer) {
              await Promise.all(
                requirementsProvided.map(async (requirement: number) => {
                  await prisma.trainingProvided.create({
                    data: {
                      user: user.id,
                      requirement: Number(requirement),
                    },
                  });
                })
              );
            }
            res.status(200).json(user);
          });
        } catch (err) {
          res.status(500).json({ message: "Creation of user has failed." });
        }
      } else {
        res.status(400).json({ message: "Users limit reached" });
      }
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  getAllUsers: async (req: Request, res: Response, err: any) => {
    try {
      const allUsers = await prisma.user.findMany({
        orderBy: {
          id: "asc",
        },
        include: {
          accountTypes: {
            select: {
              name: true,
            },
          },
        },
      });
      res.status(200).json(allUsers);
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  getUserById: async (req: Request, res: Response, err: any) => {
    try {
      const id = parseInt(req.params.id);

      const userData = await prisma.user.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          displayName: true,
          accountType: true,
          approved: true,
          authCategory: true,
          trainee: {
            select: {
              callsign: true,
              category: true,
            },
          },
        },
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  updateUserById: async (req: Request, res: Response, err: any) => {
    try {
      const id = parseInt(req.params.id);
      console.log("request body", req.body);
      const { displayName, approved, accountType, authCategory, trainee } =
        req.body;
      const updatedData = await prisma.user.update({
        where: { id: id },
        data: {
          displayName,
          accountType,
          approved,
          authCategory,
          trainee: trainee
            ? {
                update: {
                  callsign: trainee?.callsign,
                  category: Number(trainee?.category),
                },
              }
            : undefined,
          updatedAt: dayjs().toDate(),
        },
        select: {
          id: true,
          displayName: true,
          accountType: true,
          approved: true,
          authCategory: true,
          trainee: {
            select: {
              callsign: true,
              category: true,
            },
          },
        },
      });
      console.log("Backendsendrequest", updatedData);
      res.status(200).json(updatedData);
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  deleteUserById: async (req: Request, res: Response, err: any) => {
    try {
      const userId = parseInt(req.params.id);
      const existingUser = await prisma.user.findUnique({
        where: { id: Number(userId) },
        select: {
          accountType: true,
        },
      });
      const existingTrainee = await prisma.trainee.findUnique({
        where: { user: Number(userId) },
      });

      await prisma.$transaction(async (prisma) => {
        if (existingTrainee) {
          await prisma.trainee.delete({
            where: { user: Number(userId) },
          });
        }
        if (existingUser?.accountType === Account.Trainer) {
          await prisma.trainingProvided.deleteMany({
            where: { user: Number(userId) },
          });
        }
        await prisma.user.delete({
          where: { id: userId },
        });
      });
      res.status(200).json({
        message: "User and corresponding relations deleted successfully",
      });
    } catch (err) {
      res.status(500).json({ err });
    }
  },
};

export default usersController;
