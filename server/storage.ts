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
  bookmarks,
  type Bookmark,
  type InsertBookmark,
  codeSnippets,
  type CodeSnippet,
  type InsertCodeSnippet
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
  
  // Bookmark methods
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  getBookmarksByUserId(userId: number): Promise<Bookmark[]>;
  getBookmark(id: number): Promise<Bookmark | undefined>;
  deleteBookmark(id: number): Promise<void>;
  
  // Code snippet methods
  createCodeSnippet(snippet: InsertCodeSnippet): Promise<CodeSnippet>;
  getCodeSnippetsByUserId(userId: number): Promise<CodeSnippet[]>;
  getCodeSnippet(id: number): Promise<CodeSnippet | undefined>;
  deleteCodeSnippet(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatMessages: Map<number, ChatMessage>;
  private conversations: Map<number, Conversation>;
  private bookmarks: Map<number, Bookmark>;
  private codeSnippets: Map<number, CodeSnippet>;
  
  private userIdCounter: number;
  private messageIdCounter: number;
  private conversationIdCounter: number;
  private bookmarkIdCounter: number;
  private snippetIdCounter: number;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    this.conversations = new Map();
    this.bookmarks = new Map();
    this.codeSnippets = new Map();
    
    this.userIdCounter = 1;
    this.messageIdCounter = 1;
    this.conversationIdCounter = 1;
    this.bookmarkIdCounter = 1;
    this.snippetIdCounter = 1;
    
    // Add a demo user
    this.createUser({
      username: "alexmorgan",
      password: "password123",
      displayName: "Alex Morgan",
      role: "Developer"
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
    const now = new Date();
    const user: User = { ...insertUser, id };
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
    ).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
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
      .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
  }
  
  async getConversation(id: number): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }
  
  // Bookmark methods
  async createBookmark(bookmark: InsertBookmark): Promise<Bookmark> {
    const id = this.bookmarkIdCounter++;
    const createdAt = new Date();
    
    // Ensure tags is an array
    const tags = bookmark.tags || [];
    
    const newBookmark: Bookmark = { ...bookmark, id, tags, createdAt };
    this.bookmarks.set(id, newBookmark);
    return newBookmark;
  }
  
  async getBookmarksByUserId(userId: number): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values())
      .filter(bookmark => bookmark.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getBookmark(id: number): Promise<Bookmark | undefined> {
    return this.bookmarks.get(id);
  }
  
  async deleteBookmark(id: number): Promise<void> {
    this.bookmarks.delete(id);
  }
  
  // Code snippet methods
  async createCodeSnippet(snippet: InsertCodeSnippet): Promise<CodeSnippet> {
    const id = this.snippetIdCounter++;
    const createdAt = new Date();
    const newSnippet: CodeSnippet = { ...snippet, id, createdAt };
    this.codeSnippets.set(id, newSnippet);
    return newSnippet;
  }
  
  async getCodeSnippetsByUserId(userId: number): Promise<CodeSnippet[]> {
    return Array.from(this.codeSnippets.values())
      .filter(snippet => snippet.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getCodeSnippet(id: number): Promise<CodeSnippet | undefined> {
    return this.codeSnippets.get(id);
  }
  
  async deleteCodeSnippet(id: number): Promise<void> {
    this.codeSnippets.delete(id);
  }
}

export const storage = new MemStorage();
