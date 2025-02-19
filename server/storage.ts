import { users, transactions, type User, type InsertUser, type Transaction, type InsertTransaction } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserBalance(id: number, newBalance: string): Promise<User>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getUserTransactions(userId: number): Promise<Transaction[]>;
  toggleLock(userId: number): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private transactions: Map<number, Transaction>;
  private currentUserId: number;
  private currentTransactionId: number;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.currentUserId = 1;
    this.currentTransactionId = 1;

    // Add demo user
    this.createUser({
      username: "demo",
      password: "password123",
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      balance: "1000", // Give demo balance as string
      isLocked: false 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserBalance(id: number, newBalance: string): Promise<User> {
    const user = await this.getUser(id);
    if (!user) throw new Error("User not found");

    const updatedUser = { ...user, balance: newBalance };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const newTransaction: Transaction = {
      ...transaction,
      id,
      timestamp: new Date(),
    };
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }

  async getUserTransactions(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (tx) => tx.fromUserId === userId || tx.toUserId === userId
    );
  }

  async toggleLock(userId: number): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");

    const updatedUser = { ...user, isLocked: !user.isLocked };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
}

export const storage = new MemStorage();