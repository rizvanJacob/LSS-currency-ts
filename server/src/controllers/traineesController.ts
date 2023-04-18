import { Request, Response } from "express";

const index = (req: Request, res: Response) => {};
const show = (req: Request, res: Response) => {};
const create = (req: Request, res: Response) => {};
const edit = (req: Request, res: Response) => {};
const deleteTrainee = (req: Request, res: Response) => {};

export { index, show, create, edit, deleteTrainee as delete };
