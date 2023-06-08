import { Request, Response } from "express";
import { prisma } from "../config/database";
import { accountTypes } from "./lookupController";
import { UserInfo } from "os";

//Problem 1: write a function that will read all the entries in the "UserModel" table, including the name of the account type of the user. Respond to the HTTP request with a 200 status code and the data if successful. If no entries exist, respond with a status code of 400. If the function fails, respond with a status code of 500.
//RIZ: neither of you fulfilled the requirement to include the NAME of the account type of the user. Currently it shouws account type as 1, 2, 3, or 4. I want to see "Admin", "Trainee", etc.

export const alvinIndex = async (req: Request, res: Response) => {
  try {
    // Retrieve all entries from the "UserModel" table

    //RIZ: these two lines are querying the database twice. You can do it in one query using nested reads. In addition, the two queries happen sequentially, which slows down the entire process. Even if you had to use two queries, you can do them in parallel using Promise.all. You can read up on this on MDN docs.
    const users = await prisma.userModel.findMany();
    const accType = await prisma.accountType.findMany();

    if (!users.length) {
      //************
      //RIZ: the conditional in line 11 can be simplified to if(!users.length). The value 0 evaluates to false when used in a conditional. In this specific case, you could even use if !users, since the promise will be rejected (but it's ok if you don't really get this yet)
      //************

      // If no entries exist, respond with a status code of 400
      return res.status(400).send("No entries found.");
    }

    // Merge users and accType into a single array of objects

    //RIZ: Good use of map and find array methods, as well as the spread operator.
    const mergedData = users.map((user, index) => ({
      //RIZ: "index" can be dropped from the arguments list since you don't use it in the callback function
      user: {
        ...user,
        accountType:
          accType.find((type) => type.id === user.accountType)?.name || null,
      },
    }));

    // Respond with a 200 status code and the merged data if successful
    res.status(200).json(mergedData);
  } catch (error) {
    // If the function fails, respond with a status code of 500

    //************
    //RIZ: Nimalan's practice of being consistent with the response, in this case always sending back JSON, is good.
    //************
    res.status(500).send("Internal server error.");
  }
};

const nimalanIndex = async (req: Request, res: Response) => {
  // Nimalan's solution here
<<<<<<< HEAD
  const user = await prisma.userModel.findMany({
    include: {
      accountTypes: {
        select: {
          name: true,
        },
      },
    },
  });
=======
>>>>>>> e97788abd204b8f9b55dcc63d254d0a4b118d26f

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


  // const users = await prisma.userModel.findMany();
  // const account = await prisma.accountType.findMany();
  // function acctId(array: any) {
  //   return array.accountType; 
  // }
  // const newUsers = users.map(acctId);

  // let acct = "";
  // function type(newarray: any) {
  //   if (newarray === 1){
  //     return acct = "admin";
  //   } else if (newarray === 2 ){
  //     return acct = "Trainee Admin";
  //   }
  //   else if (newarray === 3 ){
  //     return acct = "Trainee";
  //   }
  //   else {
  //     return acct = "Trainer";
  //   }
  // }
  // const newtype = newUsers.map(type);

  

  // const updateUser = await prisma.userModel.updateMany({
  //   where: {
  //     accountType: 1
  //   },
  //   create: {
  //     accountTyper: accountTypes.name,
  //   },
  // })
//   let acct = "";
//   const result = account.filter(
//   (element, index) => {
//     if (element.id = 1){
//       acct = "admin";
//     } else if (element.id = 2 ){
//       acct = "trainee admin";
//      }
//      else if (element.id = 3 ){
//       acct = "trainee";
//      }
//      else {
//       acct = "trainer";
//      }
//     }
// );

  // const mergedData = users.map((user, index) => ({
  //   user: user,
  //   accountTypeName: newtype[index]
  // }));
  

//Problem 2: write a function that will create a new entry in the "Status" table. The request "req" will have a body of {"name": "xxx"}. Respond to the HTTP request with a 200 status code if successful. If unsuccessful, respond with a status code of 500.

export const alvinCreate = async (req: Request, res: Response) => {
  try {
    // Extract the name from the request body
    const { name } = req.body;

    //you should probably validate the name here, e.g.:
    // if (!name) return res.status(400).json({Error: 'Name is required'})

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
  const userStatus = await prisma.status.findMany();

  try {
    console.log("req.body", req.body);
    const { name, openId, accountType } = req.body;
    console.log(req.body);
    if (!name) {
      return res.status(400).json({Error: 'Name is required'})
    } else {
      const user = await prisma.status.create({
        data: {
          // openId: openId as string,
          // accountType: accountType as number,
          // displayName: name as string
          name: name
        },
      })
      //const users = await prisma.userModel.findMany();
      res.status(200).json('New entry created');
  }
} 
  catch (err) {
    res.status(500).json('Failed to create a new entry.');
  }

};

export default { alvinIndex, alvinCreate, nimalanIndex, nimalanCreate };
