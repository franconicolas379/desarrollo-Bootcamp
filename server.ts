import express, { application, Request, Response } from "express";
import {usersRouter, adminRouter, authRouter} from "./routes";
import dbConnect from "./db/dbConnect";
import { config } from "dotenv";

config();

const PORT = Number(process.env.PORT) ?? 3000;
const HOST = process.env.HOST ?? "localhost";

application.use("/user", usersRouter);
application.use("/admin", adminRouter);
application.use("/auth", authRouter);

application.use(express.json());

application.listen(PORT, HOST, () => {
    console.log(`server is running on http://${HOST}:${PORT}`);
})

application.get("/", (req: Request, res: Response) => {
    res.send("Pagina de Inicio");
})

dbConnect();

application.get("/Admin", (req: Request, res: Response) => {
    res.send("Admin Page");
})
