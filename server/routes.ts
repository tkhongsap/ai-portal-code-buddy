import type { Express, Request, Response, NextFunction } from "express";
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

  // Get conversations
  app.get("/api/conversations", async (req, res) => {
    try {
      // Get user ID (demo - in production this would use session data)
      const userId = 1;
      
      // Get conversations for the user
      const conversations = await storage.getConversationsByUserId(userId);
      
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ message: "Failed to fetch conversations" });
    }
  });

  // Create a new conversation
  app.post("/api/conversations", async (req, res) => {
    try {
      const { title } = req.body;
      
      // Get user ID (demo - in production this would use session data)
      const userId = 1;
      
      // Create new conversation
      const newConversation = await storage.createConversation({
        userId,
        title: title || "New Conversation"
      });
      
      res.status(201).json(newConversation);
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ message: "Failed to create conversation" });
    }
  });

  // Get messages for a conversation
  app.get("/api/conversations/:conversationId/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.conversationId);
      
      if (isNaN(conversationId)) {
        return res.status(400).json({ message: "Invalid conversation ID" });
      }
      
      // Get messages for the conversation
      const messages = await storage.getChatMessagesByConversationId(conversationId);
      
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
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
      
      // Determine conversation ID or create a new conversation
      let actualConversationId = conversationId;
      if (!actualConversationId) {
        const newConversation = await storage.createConversation({
          userId,
          title: content.length > 30 ? content.substring(0, 30) + "..." : content
        });
        actualConversationId = newConversation.id;
      }
      
      // Save user message to storage
      await storage.createChatMessage({
        userId,
        conversationId: actualConversationId,
        content: content,
        isAi: false
      });
      
      // Generate AI response
      const aiResponse = await generateChatResponse(content);
      
      // Save AI response to storage
      const aiMessage = await storage.createChatMessage({
        userId,
        conversationId: actualConversationId,
        content: aiResponse,
        isAi: true
      });
      
      // Update conversation's last modified time
      if (actualConversationId) {
        const conversation = await storage.getConversation(actualConversationId);
        if (conversation) {
          await storage.updateConversation(actualConversationId, {
            lastModified: new Date()
          });
        }
      }
      
      res.json({
        id: aiMessage.id.toString(),
        content: aiResponse,
        conversationId: actualConversationId,
        timestamp: aiMessage.createdAt ? aiMessage.createdAt.toISOString() : new Date().toISOString()
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

  // Dashboard endpoints
  
  // Get dashboard activity stats
  app.get("/api/dashboard/activity", async (req, res) => {
    try {
      // Get user ID (demo - in production this would use session data)
      const userId = 1;
      
      // Get timeframe from query params
      const { timeframe } = req.query;
      
      // Get activity stats
      const stats = await storage.getActivityStats(
        userId, 
        typeof timeframe === 'string' ? timeframe : undefined
      );
      
      // Get recent activities
      const recentActivities = await storage.getActivityLogsByUserId(userId, 10);
      
      // Prepare dashboard data
      const response = {
        stats,
        recentActivities
      };
      
      res.json(response);
    } catch (error) {
      console.error("Error fetching dashboard activity:", error);
      res.status(500).json({ message: "Failed to fetch dashboard activity data" });
    }
  });
  
  // Get dashboard language stats
  app.get("/api/dashboard/languages", async (req, res) => {
    try {
      // Get user ID (demo - in production this would use session data)
      const userId = 1;
      
      // Get timeframe from query params
      const { timeframe } = req.query;
      
      // Get activity stats with language breakdown
      const stats = await storage.getActivityStats(
        userId, 
        typeof timeframe === 'string' ? timeframe : undefined
      );
      
      res.json({ 
        languageDistribution: stats.activitiesByLanguage
      });
    } catch (error) {
      console.error("Error fetching language stats:", error);
      res.status(500).json({ message: "Failed to fetch language statistics" });
    }
  });
  
  // User goals endpoints
  app.get("/api/goals", async (req, res) => {
    try {
      // Get user ID (demo - in production this would use session data)
      const userId = 1;
      
      // Get goals for the user
      const goals = await storage.getUserGoalsByUserId(userId);
      
      res.json(goals);
    } catch (error) {
      console.error("Error fetching user goals:", error);
      res.status(500).json({ message: "Failed to fetch user goals" });
    }
  });
  
  app.post("/api/goals", async (req, res) => {
    try {
      const goal = req.body;
      
      // Get user ID (demo - in production this would use session data)
      const userId = 1;
      
      // Validate required fields
      if (!goal.title || !goal.category || goal.targetValue === undefined) {
        return res.status(400).json({ message: "Title, category, and targetValue are required" });
      }
      
      // Create new goal
      const newGoal = await storage.createUserGoal({
        ...goal,
        userId,
      });
      
      res.status(201).json(newGoal);
    } catch (error) {
      console.error("Error creating user goal:", error);
      res.status(500).json({ message: "Failed to create user goal" });
    }
  });
  
  app.put("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid goal ID" });
      }
      
      const goalData = req.body;
      
      // Get user ID (demo - in production this would use session data)
      const userId = 1;
      
      // Get the goal
      const goal = await storage.getUserGoal(id);
      
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      
      // Verify the goal belongs to the user
      if (goal.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to update this goal" });
      }
      
      // Update the goal
      const updatedGoal = await storage.updateUserGoal(id, goalData);
      
      res.json(updatedGoal);
    } catch (error) {
      console.error("Error updating user goal:", error);
      res.status(500).json({ message: "Failed to update user goal" });
    }
  });
  
  app.delete("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid goal ID" });
      }
      
      // Get user ID (demo - in production this would use session data)
      const userId = 1;
      
      // Get the goal
      const goal = await storage.getUserGoal(id);
      
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      
      // Verify the goal belongs to the user
      if (goal.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to delete this goal" });
      }
      
      // Delete the goal
      await storage.deleteUserGoal(id);
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting user goal:", error);
      res.status(500).json({ message: "Failed to delete user goal" });
    }
  });
  
  // Export dashboard data endpoint
  app.get("/api/dashboard/export", async (req, res) => {
    try {
      // Get user ID (demo - in production this would use session data)
      const userId = 1;
      
      // Get timeframe from query params
      const { timeframe } = req.query;
      
      // Get activity stats
      const stats = await storage.getActivityStats(
        userId, 
        typeof timeframe === 'string' ? timeframe : undefined
      );
      
      // Get user goals
      const goals = await storage.getUserGoalsByUserId(userId);
      
      // Get recent activities 
      const activities = await storage.getActivityLogsByUserId(userId, 100);
      
      // Prepare export data
      const exportData = {
        timestamp: new Date().toISOString(),
        user: { id: userId },
        stats,
        goals,
        activities
      };
      
      // Set headers for file download
      res.setHeader('Content-Disposition', 'attachment; filename=dashboard-export.json');
      res.setHeader('Content-Type', 'application/json');
      
      res.json(exportData);
    } catch (error) {
      console.error("Error exporting dashboard data:", error);
      res.status(500).json({ message: "Failed to export dashboard data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
