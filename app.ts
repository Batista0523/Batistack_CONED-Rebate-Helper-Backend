import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import RebateUsers from "./Controllers/userControllers";
import ApplicationSteps from "./Controllers/applicationStepControllers";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use("/rebate_users", RebateUsers);
app.use("/applications", ApplicationSteps);


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Rebate Helper");
});

export default app;
