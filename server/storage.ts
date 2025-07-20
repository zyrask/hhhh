import { users, progressUpdates, type User, type InsertUser, type ProgressUpdate, type InsertProgressUpdate, type UpdateProgressUpdate } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Progress Updates
  getProgressUpdates(): Promise<ProgressUpdate[]>;
  getProgressUpdate(id: number): Promise<ProgressUpdate | undefined>;
  createProgressUpdate(update: InsertProgressUpdate): Promise<ProgressUpdate>;
  updateProgressUpdate(id: number, update: UpdateProgressUpdate): Promise<ProgressUpdate | undefined>;
  deleteProgressUpdate(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private progressUpdates: Map<number, ProgressUpdate>;
  private currentUserId: number;
  private currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.progressUpdates = new Map();
    this.currentUserId = 1;
    this.currentProgressId = 1;
    
    // Initialize with some default progress updates
    this.initializeProgressUpdates();
  }

  private initializeProgressUpdates() {
    const defaultUpdates: InsertProgressUpdate[] = [
      {
        title: "Game Mechanics Development",
        description: "We've been working hard on the core game mechanics and player interaction systems. The foundation is solid and we're making great progress on the gameplay features.",
        date: "December 2024",
        status: "Latest Update",
        tags: ["Game Design", "Programming", "Testing"],
        imageUrl: null
      },
      {
        title: "Concept & Planning Phase",
        description: "Initial brainstorming and planning phase completed. We've outlined the core concepts, game flow, and technical requirements for the project.",
        date: "November 2024",
        status: "Previous Update",
        tags: ["Planning", "Concept Art", "Documentation"],
        imageUrl: null
      }
    ];

    defaultUpdates.forEach(update => {
      this.createProgressUpdate(update);
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProgressUpdates(): Promise<ProgressUpdate[]> {
    return Array.from(this.progressUpdates.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getProgressUpdate(id: number): Promise<ProgressUpdate | undefined> {
    return this.progressUpdates.get(id);
  }

  async createProgressUpdate(insertUpdate: InsertProgressUpdate): Promise<ProgressUpdate> {
    const id = this.currentProgressId++;
    const now = new Date();
    const update: ProgressUpdate = {
      ...insertUpdate,
      id,
      status: insertUpdate.status || "Latest Update",
      tags: Array.isArray(insertUpdate.tags) ? insertUpdate.tags : [],
      imageUrl: insertUpdate.imageUrl || null,
      createdAt: now,
      updatedAt: now,
    };
    this.progressUpdates.set(id, update);
    return update;
  }

  async updateProgressUpdate(id: number, updateData: UpdateProgressUpdate): Promise<ProgressUpdate | undefined> {
    const existing = this.progressUpdates.get(id);
    if (!existing) return undefined;

    const updated: ProgressUpdate = {
      ...existing,
      ...updateData,
      tags: updateData.tags ? Array.isArray(updateData.tags) ? updateData.tags : [] : existing.tags,
      updatedAt: new Date(),
    };
    this.progressUpdates.set(id, updated);
    return updated;
  }

  async deleteProgressUpdate(id: number): Promise<boolean> {
    return this.progressUpdates.delete(id);
  }
}

export const storage = new MemStorage();
