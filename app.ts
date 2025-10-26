import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Clients from "./Controllers/clientInfoControllers";
import RebateUsers from "./Controllers/userControllers";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/client",Clients)
app.use("/rebate_users",RebateUsers)
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Rebate Helper");
});

export default app;
