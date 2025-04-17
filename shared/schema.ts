import { pgTable, text, serial, integer, boolean, timestamp, json, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  role: text("role").default("developer"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  avatarUrl: true,
  role: true,
});

// Chat messages schema
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  isAi: boolean("is_ai").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  conversationId: integer("conversation_id").notNull(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  userId: true,
  content: true,
  isAi: true,
  conversationId: true,
});

// Conversations schema
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  lastModified: timestamp("last_modified").defaultNow(),
});

export const insertConversationSchema = createInsertSchema(conversations).pick({
  userId: true,
  title: true,
});

// Categories schema for library organization
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  parentId: integer("parent_id"),
  order: integer("order").default(0),
  color: text("color"),
  icon: text("icon"),
  createdAt: timestamp("created_at").defaultNow(),
  lastModified: timestamp("last_modified").defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  userId: true,
  name: true,
  description: true,
  parentId: true,
  order: true,
  color: true,
  icon: true,
});

// Bookmarks schema
export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  conversationId: integer("conversation_id"),
  messageId: integer("message_id"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  tags: text("tags").array(),
  category: text("category").default("General"), // Legacy field 
  categoryId: integer("category_id"), // Reference to categories table
  notes: text("notes"),
  contentType: text("content_type").default("chat"),
  starred: boolean("starred").default(false),
  url: text("url"),
  isTemplate: boolean("is_template").default(false),
  version: integer("version").default(1),
  executionCount: integer("execution_count").default(0),
  lastExecutedAt: timestamp("last_executed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  lastModified: timestamp("last_modified").defaultNow(),
});

export const insertBookmarkSchema = createInsertSchema(bookmarks).pick({
  userId: true,
  conversationId: true,
  messageId: true,
  title: true,
  content: true,
  tags: true,
  category: true, // Legacy field
  categoryId: true, // New field
  notes: true,
  contentType: true,
  starred: true,
  url: true,
  isTemplate: true,
  version: true,
  executionCount: true,
  lastExecutedAt: true,
});

// Code snippets schema
export const codeSnippets = pgTable("code_snippets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  code: text("code").notNull(),
  language: text("language").notNull(),
  score: integer("score"),
  feedback: json("feedback"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCodeSnippetSchema = createInsertSchema(codeSnippets).pick({
  userId: true,
  title: true,
  code: true,
  language: true,
  score: true,
  feedback: true,
});

// User goals schema for dashboard
export const userGoals = pgTable("user_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(), // 'performance', 'readability', 'best_practices', 'error_handling'
  targetValue: integer("target_value").notNull(),
  currentValue: integer("current_value").notNull().default(0),
  deadline: text("deadline"), // Stored as ISO string
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserGoalSchema = createInsertSchema(userGoals).pick({
  userId: true,
  title: true,
  description: true,
  category: true,
  targetValue: true,
  currentValue: true,
  deadline: true,
  completed: true,
});

// Activity logs for dashboard analytics
export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  actionType: text("action_type").notNull(), // 'chat', 'optimize', 'score', etc.
  language: text("language"), // programming language if applicable
  metadata: json("metadata"), // additional data about the activity
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertActivityLogSchema = createInsertSchema(activityLogs).pick({
  userId: true,
  actionType: true,
  language: true,
  metadata: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;

export type CodeSnippet = typeof codeSnippets.$inferSelect;
export type InsertCodeSnippet = z.infer<typeof insertCodeSnippetSchema>;

export type UserGoal = typeof userGoals.$inferSelect;
export type InsertUserGoal = z.infer<typeof insertUserGoalSchema>;

export type ActivityLog = typeof activityLogs.$inferSelect;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
