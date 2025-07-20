import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProgressUpdateSchema, updateProgressUpdateSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Setup multer for image uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use('/uploads', express.static(uploadDir));

  // Get all progress updates
  app.get("/api/progress-updates", async (req, res) => {
    try {
      const updates = await storage.getProgressUpdates();
      res.json(updates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress updates" });
    }
  });

  // Get single progress update
  app.get("/api/progress-updates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const update = await storage.getProgressUpdate(id);
      
      if (!update) {
        return res.status(404).json({ message: "Progress update not found" });
      }
      
      res.json(update);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress update" });
    }
  });

  // Create new progress update
  app.post("/api/progress-updates", async (req, res) => {
    try {
      const validatedData = insertProgressUpdateSchema.parse(req.body);
      const update = await storage.createProgressUpdate(validatedData);
      res.status(201).json(update);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create progress update" });
      }
    }
  });

  // Update progress update
  app.patch("/api/progress-updates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateProgressUpdateSchema.parse(req.body);
      const update = await storage.updateProgressUpdate(id, validatedData);
      
      if (!update) {
        return res.status(404).json({ message: "Progress update not found" });
      }
      
      res.json(update);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to update progress update" });
      }
    }
  });

  // Delete progress update
  app.delete("/api/progress-updates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProgressUpdate(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Progress update not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete progress update" });
    }
  });

  // Upload image for progress updates
  app.post("/api/upload-image", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }
      
      const imageUrl = `/uploads/${req.file.filename}`;
      res.json({ imageUrl });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload image" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Name, email, and message are required" });
      }
      
      // In a real application, you would send an email or save to database
      console.log('Contact form submission:', { name, email, message });
      
      res.json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
