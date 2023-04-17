import { prisma } from "../config/database";
import { Response } from "express";


const usersController = {
    getAllUsers: async (err: any, res: Response) => {
        try {
            const allUsers = await prisma.user.findMany({})
            res.status(200).json(allUsers);
        } catch (err) {
            res.status(500).json({err});
        }
    }
}


export default usersController;