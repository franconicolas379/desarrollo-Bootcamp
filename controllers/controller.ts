import { Request, Response } from "express";
import User from "../models/user";

class UserController{
    async createUser(req: Request, res: Response) {
        try{
            const newUser = User.create(req.body);
            console.log(newUser);
            return res.status(201).json(newUser);
        }catch(error){
            console.log(error);
        }
        
    }
}

export const userController = new UserController();