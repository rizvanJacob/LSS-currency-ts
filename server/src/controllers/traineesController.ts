import { Request, Response } from "express";
import { prisma } from "../config/database";
import dayjs from "dayjs";

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
        categories: {
          select: {
            name: true,
            requirements: {
              select: {
                requirements: {
                  select: { id: true, name: true, hasSeniority: true },
                },
              },
            },
          },
        },
        currencies: {
          select: {
            id: true,
            requirement: true,
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

const create = async (req: Request, res: Response) => {
  try {
    const { callsign, category, user } = req.body;
    console.log("req.body", req.body)
    const newTrainee = await prisma.trainee.create({
      data: {
        callsign: callsign,
        category: Number(category),
        user: Number(user)
      }
    });
    res.status(200).json(newTrainee);
  } catch (err) {
    res.status(500).json({err})
  }
};

const updateBooking = async (req: Request, res: Response) => {
  const { id, trainingId } = req.params;

  try {
    const booking = await book(Number(id), Number(trainingId));
    res.status(200).json(booking);
  } catch (error) {
    res.status(500);
  }

  console.log(`trainee: ${id}, training: ${trainingId}`);
};

const book = async (traineeId: number, trainingId: number) => {
  const booking = await prisma.traineeToTraining.findFirst({
    where: { trainee: traineeId, training: trainingId },
  });

  // if (booking)
  //if traineeId + trainingId in traineesToTrainings, delete it
  //else:
  //if training is full, add to waitlist
  //else, book
};

const update = async (req: Request, res: Response) => {
  const trainee = req.body;
  console.log(trainee);

  const upsertCurrencies = trainee.currencies.map((c: any) => {
    const upsertTransaction = prisma.currency.upsert({
      where: { id: c.id || 0 },
      update: {
        expiry: c.expiry,
        updatedAt: dayjs().toDate(),
        seniority: c.seniority,
      },
      create: {
        expiry: c.expiry,
        seniority: c.seniority,
        trainee: trainee.id,
        requirement: c.requirement,
      },
    });
    return upsertTransaction;
  });

  const updateTrainee = prisma.currency.update({
    where: { id: trainee.id },
    data: { trainee },
  });

  try {
    await Promise.all(upsertCurrencies);
    await updateTrainee;
    res.status(200).send("updated");
  } catch (error) {
    res.status(500).send("unable to update");
  }
};

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

export {
  index,
  show,
  create,
  update,
  updateBooking,
  deleteController as delete,
};
