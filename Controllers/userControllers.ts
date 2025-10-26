
import express, { Request, Response } from "express";
import {
  getAllUsers,
  getOneUser,
  createRebateUser,
  authenticateRebateUser,
  updateRebateUserPassword,
  deleteUser,
} from "../Queries/user";

const RebateUsers = express.Router();

RebateUsers.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body || {};
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, error: "email and password are required" });
    const created = await createRebateUser({ name, email, password });
    res.status(201).json({ success: true, payload: created });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        error: (err as Error).message || "Error registering user",
      });
  }
});

RebateUsers.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, error: "email and password are required" });
    const user = await authenticateRebateUser(email, password);
    res.status(200).json({ success: true, payload: user });
  } catch (err) {
    res
      .status(401)
      .json({ success: false, error: "Invalid email or password" });
  }
});

RebateUsers.get("/", async (_req: Request, res: Response) => {
  try {
    const rows = await getAllUsers();
    res.status(200).json({ success: true, payload: rows });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Internal error getting users" });
  }
});

RebateUsers.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
      return res.status(400).json({ success: false, error: "Invalid user id" });
    const row = await getOneUser(id);
    if (!row)
      return res.status(404).json({ success: false, error: "User not found" });
    res.status(200).json({ success: true, payload: row });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Internal error getting user" });
  }
});

RebateUsers.put("/update-password", async (req: Request, res: Response) => {
  try {
    const { id, newPassword } = req.body || {};
    if (!id || !newPassword)
      return res
        .status(400)
        .json({ success: false, error: "id and newPassword are required" });
    await updateRebateUserPassword(Number(id), String(newPassword));
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Internal error updating password" });
  }
});

RebateUsers.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
      return res.status(400).json({ success: false, error: "Invalid user id" });
    const deleted = await deleteUser(id);
    if (!deleted)
      return res.status(404).json({ success: false, error: "User not found" });
    res.status(200).json({ success: true, payload: deleted });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Internal error deleting user" });
  }
});

export default RebateUsers;
