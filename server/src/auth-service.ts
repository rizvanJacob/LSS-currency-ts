import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

type User = {
  id: number;
  displayName: string;
  category: number;
  authCategory?: number;
  accountType: number;
  approved: boolean;
  trainee?: {
    id: number;
  };
};

export const loggedInUser = (req: Request, res: Response) => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization?.split(" ")[1].toString();
        if (!token) {
            console.log("Missing token");
            return;
        };

        const verifiedUser = jwt.verify(
            token as string,
            process.env.JWT_SECRET as string
        ) as User;
        
        return verifiedUser;
    } catch (err) {
        console.error(err);
    }
}