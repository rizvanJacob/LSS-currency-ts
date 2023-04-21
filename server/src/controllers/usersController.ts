import { prisma } from "../config/database";
import { Request, Response } from "express";
const usersController = {

    createUser: async (req: Request, res: Response, err: any) => {
        const { openId, accountType, displayName, authCategory } = req.body;
        console.log("req.body", req.body);
        try {
            const user = await prisma.user.create({
                data: {
                    openId: openId,
                    accountType: parseInt(accountType),
                    displayName: displayName,
                    authCategory: authCategory,
                },
            })
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({err})
        }
    },

    getAllUsers: async (req: Request, res: Response, err: any) => {
        try {
            const allUsers = await prisma.user.findMany({
                orderBy: {
                    id: "asc"
                },
                include: {
                    accountTypes: {
                        select: {
                            name: true
                        }
                    }
                }
            })
            res.status(200).json(allUsers);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    getUserById: async(req: Request, res: Response, err: any) => {
        try {
            const id = parseInt(req.params.id);

            const userData = await prisma.user.findUniqueOrThrow({
                where: { id },
                select: {
                    id: true,
                    displayName: true,
                    accountType: true,
                    approved: true,
                    authCategory: true,
                    trainee: {
                        select: {
                            callsign: true
                        }
                    }
                }
            });
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    updateUserById: async(req: Request, res: Response, err: any) => {
        try {
            const id = parseInt(req.params.id);
            console.log("request body", req.body);
            const {displayName, approved, accountType, authCategory, trainee} = req.body;
            const updatedData = await prisma.user.update({
                where: { id },
                data: { displayName, accountType, approved, authCategory,
                    trainee: {
                        update: {
                            callsign: trainee?.callsign
                        }
                    }
                },
                select: {
                    id: true,
                    displayName: true,
                    accountType: true,
                    approved: true,
                    authCategory: true,
                    trainee: {
                        select: {
                            callsign: true
                        }
                    }
                },
            });
            console.log("Backendsendrequest", updatedData);
            res.status(200).json(updatedData);
        } catch (err) {
            res.status(500).json({err})
        }
    },

    deleteUserById: async (req: Request, res: Response, err: any) => {
        try {
            const id = parseInt(req.params.id);
            await prisma.user.delete({
                where: { id },
            })
            res.status(200).json({message: "User deleted successfully"});
        } catch (err) {
            res.status(500).json({err})
        }
    }
}


export default usersController;