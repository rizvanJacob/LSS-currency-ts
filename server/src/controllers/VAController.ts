import { Request, Response } from "express";
import { prisma } from "../config/database";

export default{
  alvinIndex: async (req: Request, res: Response) => {
    try {
      // Retrieve all entries from the "UserModel" table
      const users = await prisma.userModel.findMany({
        include: {
          accountTypes: true,
        },
      });
    
      if (!users) {
        // If no entries exist, respond with a status code of 400
        return res.status(400).send("No entries found.");
      }
    
      // Respond with a 200 status code and the merged data if successful
      res.status(200).json(users);
    } catch (error) {
      // If the function fails, respond with a status code of 500
      res.status(500).send("Internal server error.");
    }  
  },

  alvinCreate: async (req: Request, res: Response) => {
    try {
      // Extract the name from the request body
      const { name } = req.body;

      // if no name exist, respond with a status code of 400
      if (!name) {
        return res.status(400).json({Error: 'Name is required'});
      } 

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
  },
};
