import { Request, Response } from "express";
import { prisma } from "../config/database";

export const alvinIndex = async (req: Request, res: Response) => {
  try {
    // throw new Error('internal server error'); test for status code of 500
    // Retrieve all entries from the "UserModel" table
    const users = await prisma.userModel.findMany();

    // if (users.length >= 1) test for status code of 500
    if (users.length === 0) {
      // If no entries exist, respond with a status code of 400
      return res.status(400).send("No entries found.");
    }

    // Respond with a 200 status code and the data if successful
    res.status(200).json(users);
  } catch (error) {
    // If the function fails, respond with a status code of 500
    res.status(500).send("Internal server error.");
  }
};

const nimalanIndex = async (req: Request, res: Response) => {
  // Nimalan's solution here
  
  try {
    const users = await prisma.userModel.findMany();
    if (users.length === 0){
      res.status(400).json({Error: "No entries found"});
    } else if (users.length > 0) {
      res.status(200).json(users);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({Error: "Server error."});
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

const nimalanCreate = async (req: Request, res: Response) => {
  // Nimalan's solution here
};
