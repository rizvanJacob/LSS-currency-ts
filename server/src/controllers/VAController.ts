import { Request, Response } from "express";
import { prisma } from "../config/database";

//Problem 1: write a function that will read all the entries in the "UserModel" table, including the name of the account type of the user. Respond to the HTTP request with a 200 status code and the data if successful. If no entries exist, respond with a status code of 400. If the function fails, respond with a status code of 500.
const alvinIndex = async (req: Request, res: Response) => {
  // Alvin's solution here
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

//Problem 2: write a function that will create a new entry in the "Status" table. The request "req" will have a body of {"name": "xxx"}. Respond to the HTTP request with a 200 status code if successful. If unsuccessful, respond with a status code of 500.
const alvinCreate = async (req: Request, res: Response) => {
  // Alvin's solution here
};

const nimalanCreate = async (req: Request, res: Response) => {
  // Nimalan's solution here
};
  

export default { alvinIndex, nimalanIndex, alvinCreate, nimalanCreate };
