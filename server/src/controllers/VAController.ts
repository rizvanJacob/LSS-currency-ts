import { Request, Response } from "express";
import { prisma } from "../config/database";

export const alvinIndex = async (req: Request, res: Response) => {
  try {
    // Retrieve all entries from the "UserModel" table
    const users = await prisma.userModel.findMany();
    const accType = await prisma.accountType.findMany();
  
    if (!users.length) {
      // If no entries exist, respond with a status code of 400
      return res.status(400).send("No entries found.");
    }
  
    // Merge users and accType into a single array of objects
    const mergedData = users.map((user, index) => ({
      user: {
        ...user,
        accountType: accType.find((type) => type.id === user.accountType)?.name || null,
      },
    }));
  
    // Respond with a 200 status code and the merged data if successful
    res.status(200).json(mergedData);
  } catch (error) {
    // If the function fails, respond with a status code of 500
    res.status(500).send("Internal server error.");
  }  
};

export const alvinCreate = async (req: Request, res: Response) => {
  try {
    // Extract the name from the request body
    const { name } = req.body;

    // Create a new entry in the "Status" table
    await prisma.status.create({
      data: {
        name: name,
      },
    });

    // Respond with a 200 status code if successful
    res.sendStatus(200);
  } catch (error) {
    // If unsuccessful, respond with a status code of 500
    res.status(500).send("Internal server error.");
  }
};
