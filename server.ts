import express, { Request, Response } from "express";
import {usersRouter, adminRouter, authRouter} from "./routes";
import dbConnect from "./db/dbConnect";
import { config } from "dotenv";

config();

const PORT = Number(process.env.PORT) ?? 3000;
const HOST = process.env.HOST!;

const app = express();

app.use(express.json());

app.use("/user", usersRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

dbConnect();

app.listen(PORT, HOST, () => {
    console.log(`server is running on http://${HOST}:${PORT}`);
})

