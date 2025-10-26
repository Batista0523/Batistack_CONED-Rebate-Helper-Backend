import express, { Request, Response } from "express";
import {
  getAllClient,
  getOneClient,
  createClient,
  updateClient,
  deleteClient,
} from "../Queries/clientInfo";

const Clients = express.Router();

Clients.get("/", async (_req: Request, res: Response) => {
  try {
    const allClient = await getAllClient();
    res.status(200).json({ success: true, payload: allClient });
  } catch (err) {
    console.error("Error getting all client:", err);
    res.status(500).json({ success: false, error: "Internal error fetching all client" });
  }
});

Clients.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid client id" });
    }

    const oneClient = await getOneClient(id);
    if (oneClient) {
      return res.status(200).json({ success: true, payload: oneClient });
    } else {
      return res.status(404).json({ success: false, error: "Client not found" });
    }
  } catch (err) {
    console.error("Error getting one client:", err);
    return res.status(500).json({ success: false, error: "Internal error fetching client" });
  }
});

Clients.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body?.full_name) {
      return res.status(400).json({ success: false, error: "full_name is required" });
    }

    const createdClient = await createClient(body);
    res.status(201).json({ success: true, payload: createdClient });
  } catch (err) {
    console.error("Error creating client:", err);
    res.status(500).json({ success: false, error: "Internal error creating client" });
  }
});

Clients.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid client id" });
    }

    const body = req.body;
    if (!body?.full_name) {
      return res.status(400).json({ success: false, error: "full_name is required" });
    }

    const updatedClient = await updateClient(id, body);
    if (updatedClient) {
      res.status(200).json({ success: true, payload: updatedClient });
    } else {
      res.status(404).json({ success: false, error: "Client not found" });
    }
  } catch (err) {
    console.error("Error updating client:", err);
    res.status(500).json({ success: false, error: "Internal error updating client" });
  }
});

Clients.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid client id" });
    }

    const deletedClient = await deleteClient(id);
    if (deletedClient) {
      res.status(200).json({ success: true, payload: deletedClient });
    } else {
      res.status(404).json({ success: false, error: "Client not found" });
    }
  } catch (err) {
    console.error("Error deleting client:", err);
    res.status(500).json({ success: false, error: "Internal error deleting client" });
  }
});

export default Clients;
