import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

export function isAdmin(req: Request, res: Response, next: Function){
    const token = req.headers;
    try {
        if(token){
            const isTokenValid = verify(token["token"] as string, process.env.JWT_SECRET!);
            if(isTokenValid){
                next();
            }else{
                res.status(401).send("Unauthorized User!");
            }
        }

    } catch (error) {
        res.status(500).send(error)
    }
}