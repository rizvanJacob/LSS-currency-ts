import { prisma } from "../config/database";
import { Request, Response } from "express";

const trainingsController = {
    getAllTrainings: async (err: any, res: Response) => {
        try {
            const allTrainings = await prisma.training.findMany({
                include: 
                    {
                        requirements: {
                            select: {
                                name: true,
                            },
                        },
                    }, 
            })
            console.log(allTrainings);
            res.status(200).json(allTrainings);
        } catch (err) {
            res.status(500).json({err});
        }
    },
}
export default trainingsController;