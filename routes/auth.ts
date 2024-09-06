import express, { Request, Response } from "express";
import { authController } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/register", authController.registerUser);

authRouter.post("/login", authController.login);

export default authRouter;