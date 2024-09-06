import { request, Request, response, Response } from "express";
import { compare } from "bcrypt";
import User from "../models/user";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

config();

class AuthController{
    async registerUser(req: Request, res: Response) {
        try{
            const {username} = req.body;
            const existingUser = await User.findOne({ username });
            if(existingUser){
                return res.status(400).json({ error: 'User already exists!' });
            }
            const newUser = await User.create(req.body);
            console.log(newUser);
            return res.status(201).json(newUser);
        }catch(error){
            return res.status(500).json({ message: 'Error al crear el usuario.' })
        }
    }
    async login(req: Request, res: Response){
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user){
                return res.status(400).json({ error: 'User does not exist!' });
            }
            const isPasswordValid = await compare(password, user.password);
            if (!isPasswordValid){
                return res.status(400).json({ error: 'Invalid Password!' });
            }

            const token = sign(
                {userId: user._id, email: user.email, isAdmin: user.is_admin}, process.env.JWT_SECRET!, {expiresIn: "1h"

            })
            return res.header("token", token).status(200).json({ message: "Login Successful"});
        } catch (error) {
            console.log(error);
        }
        res.send("Login");
    }
}

export const authController = new AuthController();