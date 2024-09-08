import express from "express";
import { userController } from "./controller";

const userRouter = express.Router();

const { getUser, getUsers, createUser, loginUser, editUser, deleteUser } = userController;

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/editUser/:id", editUser);
userRouter.delete("/deleteUser/:id", deleteUser);

export default userRouter;
