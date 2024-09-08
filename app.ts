import express, { Request, Response } from "express";
import router from "./routes";
import dbConnect from "./db/dbConnect";
import { config } from "dotenv";

config();

const PORT = Number(process.env.PORT) ?? 3000;
const HOST = process.env.HOST ?? "localhost";

const app = express();

app.use(express.json());

app.use("/api", router);

dbConnect();

app.listen(PORT, HOST, () => {
    console.log(`server is running on http://${HOST}:${PORT}`);
})

