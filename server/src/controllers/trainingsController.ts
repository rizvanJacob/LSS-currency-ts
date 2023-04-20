import { prisma } from "../config/database";
import { Request, Response } from "express";

const trainingsController = {
    getAllTrainings: async (err: any, res: Response) => {
        try {
            const allTrainings = await prisma.training.findMany({
                orderBy: {
                    id: "asc"
                },
                include: 
                    {
                        requirements: {
                            select: {
                                name: true,
                            },
                        },
                        trainees: {
                            include: {
                                trainees: true
                            }
                        }
                    }, 
            })
            res.status(200).json(allTrainings);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    showTraining: async (req: Request, res: Response, err: any) => {
        try {
            const id = parseInt(req.params.id);
            const training = await prisma.training.findUnique({
                where: {id},
                select: {
                    id: true,
                    start: true,
                    end: true,
                    capacity: true,
                    complete: true,
                    instruction: true,
                    requirements: {
                        select: {
                            name: true
                        }
                    },
                    trainees: {
                        select: {
                            trainees: {
                                select: {
                                    callsign: true,
                                    categories: {
                                        select: {
                                            name: true
                                        }
                                    },
                                    currencies: {
                                        select: {
                                            expiry: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            console.log(training);
            res.status(200).json(training);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    updateTraining: async (req: Request, res: Response, err: any) => {
        try {
            const id = parseInt(req.params.id);
            const {name, start, end, capacity, instruction } = req.body;
            const updatedTraining = await prisma.training.update({
                where: {id},
                data: { start, end, capacity, instruction, requirements: {
                    update: {
                        name: name
                    }
                } },
                select: {
                    id: true,
                    start: true,
                    end: true,
                    capacity: true,
                    instruction: true,
                    requirements: {
                        select: {
                            name: true
                        }
                    }
                }
            })
            res.status(200).json(updatedTraining);
        } catch (err) {
            res.status(500).json({err});
        }
    },

    deleteTraining: async (req: Request, res: Response, err: any) => {
        try {
            const id = parseInt(req.params.id);
            await prisma.training.delete({
                where: {id},
            })
            res.status(200).json({message: "Training deleted successfully"});
        } catch (err) {
            res.status(500).json({err});
        }
    }
}
export default trainingsController;