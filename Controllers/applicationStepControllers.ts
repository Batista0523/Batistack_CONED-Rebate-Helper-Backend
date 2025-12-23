import express, { Request, Response } from "express";
import {
  getAllApplications,
  getOneApplication,
  deleteApplication,
  createApplication,
  updateApplication,
} from "../Queries/applicationsSteps";


const Applications = express.Router();

Applications.get("/", async (_req: Request, res: Response) => {
  try {
    const all = await getAllApplications();
    res.status(200).json({ success: true, payload: all });
  } catch (err) {
    console.error("Error getting all applications:", err);
    res.status(500).json({
      success: false,
      error: "Internal error fetching all applications",
    });
  }
});

Applications.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid application id" });
    }

    const one = await getOneApplication(id);
    if (one) {
      return res.status(200).json({ success: true, payload: one });
    } else {
      return res
        .status(404)
        .json({ success: false, error: "Application not found" });
    }
  } catch (err) {
    console.error("Error getting one application:", err);
    return res.status(500).json({
      success: false,
      error: "Internal error fetching application",
    });
  }
});

Applications.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (!body.full_name) {
      return res
        .status(400)
        .json({ success: false, error: "full_name is required" });
    }

    const created = await createApplication(body);
    res.status(201).json({ success: true, payload: created });
  } catch (err) {
    console.error("Error creating application:", err);
    res.status(500).json({
      success: false,
      error: "Internal error creating application",
    });
  }
});

Applications.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid application id" });
    }

    const body = req.body;

    if (!body.full_name) {
      return res
        .status(400)
        .json({ success: false, error: "full_name is required" });
    }

    const updated = await updateApplication(id, body);
    if (updated) {
      res.status(200).json({ success: true, payload: updated });
    } else {
      res.status(404).json({ success: false, error: "Application not found" });
    }
  } catch (err) {
    console.error("Error updating application:", err);
    res.status(500).json({
      success: false,
      error: "Internal error updating application",
    });
  }
});

Applications.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid application id" });
    }

    const deleted = await deleteApplication(id);
    if (deleted) {
      res.status(200).json({ success: true, payload: deleted });
    } else {
      res.status(404).json({ success: false, error: "Application not found" });
    }
  } catch (err) {
    console.error("Error deleting application:", err);
    res.status(500).json({
      success: false,
      error: "Internal error deleting application",
    });
  }
});

export default Applications;
