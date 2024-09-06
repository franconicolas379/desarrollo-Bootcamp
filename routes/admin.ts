import express from "express";
import { isAdmin } from "../middlewares/index";

const adminRouter =  express.Router();

adminRouter.get("/dashboard", isAdmin, (req, res) => {
   res.send("dashboard page");
});

export default adminRouter;