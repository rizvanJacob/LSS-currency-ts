import { Request, Response } from "express";
import { prisma } from "../config/database";
import { accountTypes } from "./lookupController";
import { UserInfo } from "os";

//Problem 1: write a function that will read all the entries in the "UserModel" table, including the name of the account type of the user. Respond to the HTTP request with a 200 status code and the data if successful. If no entries exist, respond with a status code of 400. If the function fails, respond with a status code of 500.
//RIZ: neither of you fulfilled the requirement to include the NAME of the account type of the user. Currently it shouws account type as 1, 2, 3, or 4. I want to see "Admin", "Trainee", etc.

export const alvinIndex: async (req: Request, res: Response) => {
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

const nimalanIndex = async (req: Request, res: Response) => {
  // Nimalan's solution here

  const user = await prisma.userModel.findMany({
    include: {
      accountTypes: {
        select: {
          name: true,
        },
      },
    },
  });

  try {
    //RIZ: see my comment to Alvin's code on line 13. In addition, you could return res... on line 38 to prevent the rest of the code from running, and avoid the need for the else statement on line 39.
    if (!user.length) {
      res.status(400).json({ Error: "No entries found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Server error." });
  }
};

const rizIndex = async (req: Request, res: Response) => {
  try {
    //one thing we can do to make this more readable is to store the query (the {} within the findMany) in another module and import it.
    const users = await prisma.userModel.findMany({
      include: {
        accountTypes: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!users.length) {
      return res.status(400).json({ Error: "No entries found" });
    }

    const mappedUsers = users.map((user) => {
      const { accountTypes, accountType, ...userLessAccountTypes } = user;
      return { ...userLessAccountTypes, accountType: accountTypes.name };
    });

    res.status(200).json(mappedUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Server error." });
  }
};

//Problem 2: write a function that will create a new entry in the "Status" table. The request "req" will have a body of {"name": "xxx"}. Respond to the HTTP request with a 200 status code if successful. If unsuccessful, respond with a status code of 500.

export const alvinCreate: async (req: Request, res: Response) => {
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

const nimalanCreate = async (req: Request, res: Response) => {
  // Nimalan's solution here

  //RIZ: you read the status table from the database here, but it's never used in your code. Meaning its wasted resources and can be removed.
  const userStatus = await prisma.status.findMany();

  try {
    console.log("req.body", req.body);

    //RIZ: why are you getting the openId and accountType here when it is not used in the rest of the function?
    const { name, openId, accountType } = req.body;
    console.log(req.body);

    //RIZ: good job validating that there is a name here. I hope you didn't just copy it off my comments to Alvin...
    if (!name) {
      return res.status(400).json({ Error: "Name is required" });
    } else {
      //RIZ: good job using the create method. Why did you store the created user as "user"? It's not used anywhere else in the function.
      const user = await prisma.status.create({
        data: {
          // openId: openId as string,
          // accountType: accountType as number,
          // displayName: name as string
          name: name, // note that you didn't have to say "as string" because HTTP body is always a string
        },
      });
      //const users = await prisma.userModel.findMany()

      //RIZ: typically, we may return the created object back to the client, so they can see info such as the created time, or the id (since you opted to store the created user in line 148).
      res.status(200).json("New entry created");
    }
  } catch (err) {
    res.status(500).json("Failed to create a new entry.");
  }
};

export default {
  alvinIndex,
  alvinCreate,
  nimalanIndex,
  nimalanCreate,
  rizIndex,
};
