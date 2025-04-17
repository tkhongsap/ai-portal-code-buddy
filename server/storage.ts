import { 
  users, 
  type User, 
  type InsertUser,
  chatMessages,
  type ChatMessage,
  type InsertChatMessage,
  conversations,
  type Conversation,
  type InsertConversation,
  categories,
  type Category,
  type InsertCategory,
  bookmarks,
  type Bookmark,
  type InsertBookmark,
  codeSnippets,
  type CodeSnippet,
  type InsertCodeSnippet,
  userGoals,
  type UserGoal,
  type InsertUserGoal,
  activityLogs,
  type ActivityLog,
  type InsertActivityLog
} from "@shared/schema";

// Modify the interface with any CRUD methods you need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User>;
  
  // Chat methods
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessagesByConversationId(conversationId: number): Promise<ChatMessage[]>;
  
  // Conversation methods
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  getConversationsByUserId(userId: number): Promise<Conversation[]>;
  getConversation(id: number): Promise<Conversation | undefined>;
  updateConversation(id: number, conversationData: Partial<Conversation>): Promise<Conversation>;
  
  // Category methods
  createCategory(category: InsertCategory): Promise<Category>;
  getCategoriesByUserId(userId: number): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  updateCategory(id: number, categoryData: Partial<Category>): Promise<Category>;
  deleteCategory(id: number): Promise<void>;
  
  // Bookmark methods
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  getBookmarksByUserId(userId: number): Promise<Bookmark[]>;
  getBookmarksByCategory(userId: number, category: string): Promise<Bookmark[]>;
  getBookmarksByTag(userId: number, tag: string): Promise<Bookmark[]>;
  getBookmark(id: number): Promise<Bookmark | undefined>;
  updateBookmark(id: number, bookmarkData: Partial<Bookmark>): Promise<Bookmark>;
  deleteBookmark(id: number): Promise<void>;
  searchBookmarks(userId: number, query: string): Promise<Bookmark[]>;
  
  // Code snippet methods
  createCodeSnippet(snippet: InsertCodeSnippet): Promise<CodeSnippet>;
  getCodeSnippetsByUserId(userId: number): Promise<CodeSnippet[]>;
  getCodeSnippet(id: number): Promise<CodeSnippet | undefined>;
  deleteCodeSnippet(id: number): Promise<void>;
  
  // Dashboard methods - User goals
  createUserGoal(goal: InsertUserGoal): Promise<UserGoal>;
  getUserGoalsByUserId(userId: number): Promise<UserGoal[]>;
  getUserGoal(id: number): Promise<UserGoal | undefined>;
  updateUserGoal(id: number, goalData: Partial<UserGoal>): Promise<UserGoal>;
  deleteUserGoal(id: number): Promise<void>;
  
  // Dashboard methods - Activity logs
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  getActivityLogsByUserId(userId: number, limit?: number): Promise<ActivityLog[]>;
  getActivityLogsByUserIdAndType(userId: number, actionType: string, limit?: number): Promise<ActivityLog[]>;
  getActivityLogsByLanguage(userId: number, language: string, limit?: number): Promise<ActivityLog[]>;
  getActivityStats(userId: number, timeframe?: string): Promise<{
    totalActivities: number;
    activitiesByType: Record<string, number>;
    activitiesByLanguage: Record<string, number>;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatMessages: Map<number, ChatMessage>;
  private conversations: Map<number, Conversation>;
  private categories: Map<number, Category>;
  private bookmarks: Map<number, Bookmark>;
  private codeSnippets: Map<number, CodeSnippet>;
  private userGoals: Map<number, UserGoal>;
  private activityLogs: Map<number, ActivityLog>;
  
  private userIdCounter: number;
  private messageIdCounter: number;
  private conversationIdCounter: number;
  private categoryIdCounter: number;
  private bookmarkIdCounter: number;
  private snippetIdCounter: number;
  private goalIdCounter: number;
  private logIdCounter: number;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    this.conversations = new Map();
    this.categories = new Map();
    this.bookmarks = new Map();
    this.codeSnippets = new Map();
    this.userGoals = new Map();
    this.activityLogs = new Map();
    
    this.userIdCounter = 1;
    this.messageIdCounter = 1;
    this.conversationIdCounter = 1;
    this.categoryIdCounter = 1;
    this.bookmarkIdCounter = 1;
    this.snippetIdCounter = 1;
    this.goalIdCounter = 1;
    this.logIdCounter = 1;
    
    // Add a demo user
    this.createUser({
      username: "alexmorgan",
      password: "password123",
      displayName: "Alex Morgan",
      role: "Developer"
    });
    
    // Add sample categories
    this.createCategory({
      userId: 1,
      name: "Frontend",
      description: "Frontend development resources",
      color: "#3B82F6",
      icon: "code",
      order: 1
    });
    
    this.createCategory({
      userId: 1,
      name: "Backend",
      description: "Backend development resources",
      color: "#10B981",
      icon: "server",
      order: 2
    });
    
    this.createCategory({
      userId: 1,
      name: "DevOps",
      description: "DevOps and deployment resources",
      color: "#F59E0B",
      icon: "cloud",
      order: 3
    });
    
    this.createCategory({
      userId: 1,
      name: "AI & ML",
      description: "Artificial Intelligence and Machine Learning",
      color: "#8B5CF6",
      icon: "brain",
      order: 4
    });
    
    // Add some demo bookmarks
    this.createBookmark({
      userId: 1,
      title: "Optimizing API calls with React Query",
      content: "React Query provides a powerful way to handle API calls with built-in caching and state management. Here's how to optimize your API calls...",
      tags: ["React", "API"],
      conversationId: null,
      messageId: null
    });
    
    this.createBookmark({
      userId: 1,
      title: "TypeScript interface vs type alias",
      content: "TypeScript offers two ways to define custom types: interfaces and type aliases. Here's when to use each one...",
      tags: ["TypeScript"],
      conversationId: null,
      messageId: null
    });
    
    this.createBookmark({
      userId: 1,
      title: "CSS Grid vs Flexbox decision tree",
      content: "```css\n.grid-layout {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 1rem;\n}\n\n.flex-layout {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n```\n\nUse Grid when you need two-dimensional layouts and Flexbox for one-dimensional layouts.",
      tags: ["CSS", "Layout"],
      conversationId: null,
      messageId: null
    });
    
    // Add sample user goals
    this.createUserGoal({
      userId: 1,
      title: "Improve code readability",
      description: "Focus on writing more readable and self-documenting code",
      category: "readability",
      targetValue: 100,
      currentValue: 65,
      deadline: new Date(2023, 11, 31).toISOString(),
      completed: false
    });
    
    this.createUserGoal({
      userId: 1,
      title: "Optimize API performance",
      description: "Reduce API response times by implementing caching and optimizing queries",
      category: "performance",
      targetValue: 100,
      currentValue: 40,
      deadline: new Date(2023, 11, 15).toISOString(),
      completed: false
    });
    
    // Add sample activity logs
    const actionTypes = ['chat', 'optimize', 'score'];
    const languages = ['javascript', 'typescript', 'python', 'java'];
    const now = new Date();
    
    // Create 30 days of sample activity
    for (let i = 0; i < 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Random number of activities per day (1-5)
      const activitiesPerDay = Math.floor(Math.random() * 5) + 1;
      
      for (let j = 0; j < activitiesPerDay; j++) {
        const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)];
        const language = languages[Math.floor(Math.random() * languages.length)];
        
        this.createActivityLog({
          userId: 1,
          actionType,
          language,
          metadata: {
            success: Math.random() > 0.1, // 90% success rate
            duration: Math.floor(Math.random() * 60) + 1 // 1-60 seconds
          }
        });
        
        // Set the creation time to the generated date
        const lastLog = Array.from(this.activityLogs.values()).pop();
        if (lastLog) {
          lastLog.createdAt = new Date(date);
          this.activityLogs.set(lastLog.id, lastLog);
        }
      }
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    
    // Handle nullability of optional fields
    const user: User = { 
      id,
      username: insertUser.username,
      password: insertUser.password,
      displayName: insertUser.displayName || null,
      avatarUrl: insertUser.avatarUrl || null,
      role: insertUser.role || null
    };
    
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Chat methods
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.messageIdCounter++;
    const createdAt = new Date();
    const chatMessage: ChatMessage = { ...message, id, createdAt };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }
  
  async getChatMessagesByConversationId(conversationId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).filter(
      (message) => message.conversationId === conversationId
    ).sort((a, b) => {
      const aTime = a.createdAt ? a.createdAt.getTime() : 0;
      const bTime = b.createdAt ? b.createdAt.getTime() : 0;
      return aTime - bTime;
    });
  }
  
  // Conversation methods
  async createConversation(conversation: InsertConversation): Promise<Conversation> {
    const id = this.conversationIdCounter++;
    const createdAt = new Date();
    const lastModified = createdAt;
    const newConversation: Conversation = { ...conversation, id, createdAt, lastModified };
    this.conversations.set(id, newConversation);
    return newConversation;
  }
  
  async getConversationsByUserId(userId: number): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .filter(conversation => conversation.userId === userId)
      .sort((a, b) => {
        const aTime = a.lastModified ? a.lastModified.getTime() : 0;
        const bTime = b.lastModified ? b.lastModified.getTime() : 0;
        return bTime - aTime;
      });
  }
  
  async getConversation(id: number): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async updateConversation(id: number, conversationData: Partial<Conversation>): Promise<Conversation> {
    const conversation = await this.getConversation(id);
    if (!conversation) {
      throw new Error(`Conversation with ID ${id} not found`);
    }
    
    const updatedConversation = { ...conversation, ...conversationData };
    this.conversations.set(id, updatedConversation);
    return updatedConversation;
  }
  
  // Category methods
  async createCategory(category: InsertCategory): Promise<Category> {
    const id = ++this.categoryIdCounter;
    const createdAt = new Date();
    const lastModified = new Date();
    
    const newCategory: Category = {
      id,
      userId: category.userId,
      name: category.name,
      description: category.description || null,
      parentId: category.parentId || null,
      order: category.order || 0,
      color: category.color || null,
      icon: category.icon || null,
      createdAt,
      lastModified
    };
    
    this.categories.set(id, newCategory);
    return newCategory;
  }
  
  async getCategoriesByUserId(userId: number): Promise<Category[]> {
    return Array.from(this.categories.values())
      .filter(category => category.userId === userId)
      .sort((a, b) => {
        const orderA = a.order ?? 0;
        const orderB = b.order ?? 0;
        return orderA - orderB;
      });
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category> {
    const category = await this.getCategory(id);
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    
    const updatedCategory = { 
      ...category, 
      ...categoryData,
      lastModified: new Date()
    };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }
  
  async deleteCategory(id: number): Promise<void> {
    this.categories.delete(id);
  }
  
  // Bookmark methods
  async createBookmark(bookmark: InsertBookmark): Promise<Bookmark> {
    const id = this.bookmarkIdCounter++;
    const createdAt = new Date();
    const lastModified = new Date();
    
    // Ensure tags is an array
    const tags = bookmark.tags || [];
    
    // Handle nullability of optional fields
    const newBookmark: Bookmark = {
      id,
      userId: bookmark.userId,
      title: bookmark.title,
      content: bookmark.content,
      conversationId: bookmark.conversationId || null,
      messageId: bookmark.messageId || null,
      tags: tags,
      category: bookmark.category || "General", // Legacy field
      categoryId: bookmark.categoryId || null, // New field
      notes: bookmark.notes || null,
      contentType: bookmark.contentType || "chat",
      starred: bookmark.starred || false,
      url: bookmark.url || null,
      isTemplate: bookmark.isTemplate || false,
      version: bookmark.version || 1,
      executionCount: bookmark.executionCount || 0,
      lastExecutedAt: bookmark.lastExecutedAt || null,
      createdAt,
      lastModified
    };
    
    this.bookmarks.set(id, newBookmark);
    return newBookmark;
  }
  
  async getBookmarksByUserId(userId: number): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values())
      .filter(bookmark => bookmark.userId === userId)
      .sort((a, b) => {
        const aTime = a.createdAt ? a.createdAt.getTime() : 0;
        const bTime = b.createdAt ? b.createdAt.getTime() : 0;
        return bTime - aTime;
      });
  }
  
  async getBookmarksByCategory(userId: number, category: string): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values())
      .filter(bookmark => bookmark.userId === userId && bookmark.category && bookmark.category === category)
      .sort((a, b) => {
        const aTime = a.createdAt ? a.createdAt.getTime() : 0;
        const bTime = b.createdAt ? b.createdAt.getTime() : 0;
        return bTime - aTime;
      });
  }
  
  async getBookmarksByTag(userId: number, tag: string): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values())
      .filter(bookmark => 
        bookmark.userId === userId && 
        bookmark.tags && 
        bookmark.tags.includes(tag)
      )
      .sort((a, b) => {
        const aTime = a.createdAt ? a.createdAt.getTime() : 0;
        const bTime = b.createdAt ? b.createdAt.getTime() : 0;
        return bTime - aTime;
      });
  }
  
  async getBookmark(id: number): Promise<Bookmark | undefined> {
    return this.bookmarks.get(id);
  }
  
  async updateBookmark(id: number, bookmarkData: Partial<Bookmark>): Promise<Bookmark> {
    const bookmark = this.bookmarks.get(id);
    
    if (!bookmark) {
      throw new Error(`Bookmark with id ${id} not found`);
    }
    
    const updatedBookmark = { 
      ...bookmark, 
      ...bookmarkData,
      lastModified: new Date()
    };
    
    this.bookmarks.set(id, updatedBookmark);
    return updatedBookmark;
  }
  
  async deleteBookmark(id: number): Promise<void> {
    this.bookmarks.delete(id);
  }
  
  async searchBookmarks(userId: number, query: string): Promise<Bookmark[]> {
    const lowercaseQuery = query.toLowerCase();
    
    return Array.from(this.bookmarks.values())
      .filter(bookmark => {
        if (bookmark.userId !== userId) return false;
        
        // Search in title, content, notes, tags, and category
        return (
          bookmark.title.toLowerCase().includes(lowercaseQuery) ||
          bookmark.content.toLowerCase().includes(lowercaseQuery) ||
          (bookmark.notes && bookmark.notes.toLowerCase().includes(lowercaseQuery)) ||
          (bookmark.category && bookmark.category.toLowerCase().includes(lowercaseQuery)) ||
          (bookmark.tags && bookmark.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
        );
      })
      .sort((a, b) => {
        const aTime = a.createdAt ? a.createdAt.getTime() : 0;
        const bTime = b.createdAt ? b.createdAt.getTime() : 0;
        return bTime - aTime;
      });
  }
  
  // Code snippet methods
  async createCodeSnippet(snippet: InsertCodeSnippet): Promise<CodeSnippet> {
    const id = this.snippetIdCounter++;
    const createdAt = new Date();
    
    // Handle nullability of optional fields
    const newSnippet: CodeSnippet = {
      id,
      userId: snippet.userId,
      title: snippet.title,
      code: snippet.code,
      language: snippet.language,
      score: snippet.score || null,
      feedback: snippet.feedback || null,
      createdAt
    };
    
    this.codeSnippets.set(id, newSnippet);
    return newSnippet;
  }
  
  async getCodeSnippetsByUserId(userId: number): Promise<CodeSnippet[]> {
    return Array.from(this.codeSnippets.values())
      .filter(snippet => snippet.userId === userId)
      .sort((a, b) => {
        const aTime = a.createdAt ? a.createdAt.getTime() : 0;
        const bTime = b.createdAt ? b.createdAt.getTime() : 0;
        return bTime - aTime;
      });
  }
  
  async getCodeSnippet(id: number): Promise<CodeSnippet | undefined> {
    return this.codeSnippets.get(id);
  }
  
  async deleteCodeSnippet(id: number): Promise<void> {
    this.codeSnippets.delete(id);
  }

  // User Goals methods
  async createUserGoal(goal: InsertUserGoal): Promise<UserGoal> {
    const id = this.goalIdCounter++;
    const createdAt = new Date();
    
    // Handle nullability of optional fields
    const newGoal: UserGoal = {
      id,
      userId: goal.userId,
      title: goal.title,
      description: goal.description || null,
      category: goal.category,
      targetValue: goal.targetValue,
      currentValue: goal.currentValue || 0,
      deadline: goal.deadline || null,
      completed: goal.completed || false,
      createdAt
    };
    
    this.userGoals.set(id, newGoal);
    return newGoal;
  }
  
  async getUserGoalsByUserId(userId: number): Promise<UserGoal[]> {
    return Array.from(this.userGoals.values())
      .filter(goal => goal.userId === userId)
      .sort((a, b) => {
        // Sort by completion status first, then by deadline
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        
        if (a.deadline && b.deadline) {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        
        if (a.deadline) return -1;
        if (b.deadline) return 1;
        
        return 0;
      });
  }
  
  async getUserGoal(id: number): Promise<UserGoal | undefined> {
    return this.userGoals.get(id);
  }
  
  async updateUserGoal(id: number, goalData: Partial<UserGoal>): Promise<UserGoal> {
    const goal = await this.getUserGoal(id);
    if (!goal) {
      throw new Error(`User goal with ID ${id} not found`);
    }
    
    const updatedGoal = { ...goal, ...goalData };
    this.userGoals.set(id, updatedGoal);
    return updatedGoal;
  }
  
  async deleteUserGoal(id: number): Promise<void> {
    this.userGoals.delete(id);
  }
  
  // Activity Logs methods
  async createActivityLog(log: InsertActivityLog): Promise<ActivityLog> {
    const id = this.logIdCounter++;
    const createdAt = new Date();
    
    // Handle nullability of optional fields
    const newLog: ActivityLog = {
      id,
      userId: log.userId,
      actionType: log.actionType,
      language: log.language || null,
      metadata: log.metadata || null,
      createdAt
    };
    
    this.activityLogs.set(id, newLog);
    return newLog;
  }
  
  async getActivityLogsByUserId(userId: number, limit?: number): Promise<ActivityLog[]> {
    const logs = Array.from(this.activityLogs.values())
      .filter(log => log.userId === userId)
      .sort((a, b) => {
        const aTime = a.createdAt ? a.createdAt.getTime() : 0;
        const bTime = b.createdAt ? b.createdAt.getTime() : 0;
        return bTime - aTime; // Most recent first
      });
    
    return limit ? logs.slice(0, limit) : logs;
  }
  
  async getActivityLogsByUserIdAndType(userId: number, actionType: string, limit?: number): Promise<ActivityLog[]> {
    const logs = Array.from(this.activityLogs.values())
      .filter(log => log.userId === userId && log.actionType === actionType)
      .sort((a, b) => {
        const aTime = a.createdAt ? a.createdAt.getTime() : 0;
        const bTime = b.createdAt ? b.createdAt.getTime() : 0;
        return bTime - aTime; // Most recent first
      });
    
    return limit ? logs.slice(0, limit) : logs;
  }
  
  async getActivityLogsByLanguage(userId: number, language: string, limit?: number): Promise<ActivityLog[]> {
    const logs = Array.from(this.activityLogs.values())
      .filter(log => log.userId === userId && log.language === language)
      .sort((a, b) => {
        const aTime = a.createdAt ? a.createdAt.getTime() : 0;
        const bTime = b.createdAt ? b.createdAt.getTime() : 0;
        return bTime - aTime; // Most recent first
      });
    
    return limit ? logs.slice(0, limit) : logs;
  }
  
  async getActivityStats(userId: number, timeframe?: string): Promise<{
    totalActivities: number;
    activitiesByType: Record<string, number>;
    activitiesByLanguage: Record<string, number>;
  }> {
    // Get all logs for user
    let logs = await this.getActivityLogsByUserId(userId);
    
    // Apply timeframe filter if provided
    if (timeframe) {
      const now = new Date();
      const cutoff = new Date(now);
      
      switch (timeframe) {
        case 'day':
          cutoff.setDate(now.getDate() - 1);
          break;
        case 'week':
          cutoff.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoff.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoff.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      logs = logs.filter(log => {
        const logDate = log.createdAt;
        return logDate && logDate >= cutoff;
      });
    }
    
    // Calculate statistics
    const activitiesByType: Record<string, number> = {};
    const activitiesByLanguage: Record<string, number> = {};
    
    for (const log of logs) {
      // Count by type
      if (log.actionType) {
        activitiesByType[log.actionType] = (activitiesByType[log.actionType] || 0) + 1;
      }
      
      // Count by language
      if (log.language) {
        activitiesByLanguage[log.language] = (activitiesByLanguage[log.language] || 0) + 1;
      }
    }
    
    return {
      totalActivities: logs.length,
      activitiesByType,
      activitiesByLanguage
    };
  }
}

export const storage = new MemStorage();
