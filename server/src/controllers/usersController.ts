import { prisma } from "../config/database";
import { Request, Response } from "express";

const usersController = {
    getAllUsers: async (err: any, res: Response) => {
        try {
            const allUsers = await prisma.user.findMany({})
            res.status(200).json(allUsers);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    getUserById: async(req: Request, res: Response, err: any) => {
        try {
            const { openId } = req.params;

            const userData = await prisma.user.findUniqueOrThrow({
                where: { openId },
                select: {
                    openId: true,
                    displayName: true,
                    accountType: true,
                },
            });
            console.log(userData);
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json({err});
        }
    }
}


export default usersController;