import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectDb = async () => {
  prisma.$connect();
  console.log("connected to database via prisma");
};

export { prisma, connectDb };
