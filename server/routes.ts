import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse, optimizeCode, scoreCode } from "./lib/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/user/me", async (req, res) => {
    try {
      // For demo purposes, return a mock user
      // In production, this would verify the user's session
      const user = await storage.getUserByUsername("alexmorgan");
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user information" });
    }
  });

  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { content, conversationId } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: "Content is required" });
      }
      
      // Get user (demo - in production this would use session data)
      const userId = 1;
      
      // Save user message to storage if needed
      const messageId = Date.now().toString();
      
      // Generate AI response
      const aiResponse = await generateChatResponse(content);
      
      // Save AI response to storage if needed
      
      res.json({
        id: messageId,
        content: aiResponse,
        conversationId: conversationId || Date.now(),
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ message: "Failed to process chat request" });
    }
  });

  // Code optimization endpoint
  app.post("/api/code/optimize", async (req, res) => {
    try {
      const { code, language } = req.body;
      
      if (!code || !language) {
        return res.status(400).json({ message: "Code and language are required" });
      }
      
      // Call the OpenAI service to optimize code
      const result = await optimizeCode(code, language);
      
      res.json(result);
    } catch (error) {
      console.error("Code optimization error:", error);
      res.status(500).json({ message: "Failed to optimize code" });
    }
  });

  // Code scoring endpoint
  app.post("/api/code/score", async (req, res) => {
    try {
      const { code, language } = req.body;
      
      if (!code || !language) {
        return res.status(400).json({ message: "Code and language are required" });
      }
      
      // Call the OpenAI service to score code
      const result = await scoreCode(code, language);
      
      res.json(result);
    } catch (error) {
      console.error("Code scoring error:", error);
      res.status(500).json({ message: "Failed to score code" });
    }
  });

  // Code snippets endpoints
  app.post("/api/code/snippets", async (req, res) => {
    try {
      const snippet = req.body;
      
      // Validate required fields
      if (!snippet.title || !snippet.code || !snippet.language) {
        return res.status(400).json({ message: "Title, code, and language are required" });
      }
      
      // Create new code snippet
      const newSnippet = await storage.createCodeSnippet(snippet);
      
      res.status(201).json(newSnippet);
    } catch (error) {
      console.error("Error creating code snippet:", error);
      res.status(500).json({ message: "Failed to create code snippet" });
    }
  });

  app.get("/api/code/snippets", async (req, res) => {
    try {
      // Get user ID (demo - in production this would use session data)
      const userId = 1;
      
      // Get snippets for the user
      const snippets = await storage.getCodeSnippetsByUserId(userId);
      
      res.json(snippets);
    } catch (error) {
      console.error("Error fetching code snippets:", error);
      res.status(500).json({ message: "Failed to fetch code snippets" });
    }
  });

  // Bookmarks endpoints
  app.post("/api/bookmarks", async (req, res) => {
    try {
      const bookmark = req.body;
      
      // Validate required fields
      if (!bookmark.title || !bookmark.content) {
        return res.status(400).json({ message: "Title and content are required" });
      }
      
      // Create new bookmark
      const newBookmark = await storage.createBookmark(bookmark);
      
      res.status(201).json(newBookmark);
    } catch (error) {
      console.error("Error creating bookmark:", error);
      res.status(500).json({ message: "Failed to create bookmark" });
    }
  });

  app.get("/api/bookmarks", async (req, res) => {
    try {
      // Get user ID (demo - in production this would use session data)
      const userId = 1;
      
      // Get bookmarks for the user
      const bookmarks = await storage.getBookmarksByUserId(userId);
      
      res.json(bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      res.status(500).json({ message: "Failed to fetch bookmarks" });
    }
  });

  app.delete("/api/bookmarks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid bookmark ID" });
      }
      
      // Delete bookmark
      await storage.deleteBookmark(id);
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      res.status(500).json({ message: "Failed to delete bookmark" });
    }
  });

  // User profile update endpoints
  app.put("/api/user/profile", async (req, res) => {
    try {
      const { displayName, username } = req.body;
      
      // Get user ID (demo - in production this would use session data)
      const userId = 1;
      
      // Update user profile
      const updatedUser = await storage.updateUser(userId, { displayName, username });
      
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Failed to update user profile" });
    }
  });

  app.put("/api/user/password", async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current and new passwords are required" });
      }
      
      // Get user ID (demo - in production this would use session data)
      const userId = 1;
      
      // In a real app, you would verify the current password first
      // Then update with the new password
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Update password
      await storage.updateUser(userId, { password: newPassword });
      
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Failed to update password" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
