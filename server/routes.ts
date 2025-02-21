import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTransactionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await storage.getUserByUsername(username);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.isLocked) {
      return res.status(403).json({ message: "Wallet is locked" });
    }

    return res.json(user);
  });

  app.post("/api/register", async (req, res) => {
    const parsed = insertUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const existing = await storage.getUserByUsername(parsed.data.username);
    if (existing) {
      return res.status(409).json({ message: "Username taken" });
    }

    const user = await storage.createUser(parsed.data);
    return res.json(user);
  });

  app.post("/api/send", async (req, res) => {
    const { fromUserId, recipientUsername, amount } = req.body;

    if (!fromUserId || !recipientUsername || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const sender = await storage.getUser(fromUserId);
    const recipient = await storage.getUserByUsername(recipientUsername);

    if (!sender || !recipient) {
      return res.status(404).json({ message: "User not found" });
    }

    if (parseFloat(sender.balance) < parseFloat(amount)) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const transaction = await storage.createTransaction({
      fromUserId: sender.id,
      toUserId: recipient.id,
      amount: amount.toString(),
      status: "completed"
    });

    await storage.updateUserBalance(
      sender.id, 
      (parseFloat(sender.balance) - parseFloat(amount)).toString()
    );

    await storage.updateUserBalance(
      recipient.id, 
      (parseFloat(recipient.balance) + parseFloat(amount)).toString()
    );

    return res.json(transaction);
  });

  app.get("/api/transactions/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const transactions = await storage.getUserTransactions(userId);
    return res.json(transactions);
  });

  app.post("/api/toggle-lock/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await storage.toggleLock(userId);
    return res.json(user);
  });

  const httpServer = createServer(app);
  return httpServer;
}