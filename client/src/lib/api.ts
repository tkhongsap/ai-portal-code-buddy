import { apiRequest } from "./queryClient";
import { queryClient } from "./queryClient";
import { 
  CodeSnippet, 
  InsertCodeSnippet, 
  Bookmark, 
  InsertBookmark, 
  UserGoal, 
  InsertUserGoal, 
  ActivityLog,
  Category,
  InsertCategory
} from "@shared/schema";

// Types for code optimization response
export type OptimizationImprovement = {
  category: 'performance' | 'readability' | 'best_practices' | 'error_handling';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  learn_more_url?: string;
  original_code?: string;
  optimized_code?: string;
};

export type OptimizationSummary = {
  total_issues: number;
  performance_issues: number;
  readability_issues: number;
  best_practices_issues: number;
  error_handling_issues: number;
};

export type OptimizationResponse = {
  optimized: string;
  improvements: OptimizationImprovement[];
  summary: OptimizationSummary;
};

// Types for dashboard
export type ActivityStats = {
  totalActivities: number;
  activitiesByType: Record<string, number>;
  activitiesByLanguage: Record<string, number>;
};

export type DashboardActivityResponse = {
  stats: ActivityStats;
  recentActivities: ActivityLog[];
};

export type LanguageDistributionResponse = {
  languageDistribution: Record<string, number>;
};

// Code optimization
export const optimizeCode = async (code: string, language: string): Promise<OptimizationResponse> => {
  const res = await apiRequest("POST", "/api/code/optimize", { code, language });
  return res.json();
};

// Code scoring
export const scoreCode = async (code: string, language: string): Promise<{
  score: number;
  feedback: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
}> => {
  const res = await apiRequest("POST", "/api/code/score", { code, language });
  return res.json();
};

// Save code snippet
export const saveCodeSnippet = async (snippet: InsertCodeSnippet): Promise<CodeSnippet> => {
  const res = await apiRequest("POST", "/api/code/snippets", snippet);
  queryClient.invalidateQueries({ queryKey: ['/api/code/snippets'] });
  return res.json();
};

// Get code snippets
export const getCodeSnippets = async (): Promise<CodeSnippet[]> => {
  const res = await apiRequest("GET", "/api/code/snippets", undefined);
  return res.json();
};

// Bookmarks
export const createBookmark = async (bookmark: InsertBookmark): Promise<Bookmark> => {
  const res = await apiRequest("POST", "/api/bookmarks", bookmark);
  queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
  return res.json();
};

export const getBookmarks = async (): Promise<Bookmark[]> => {
  const res = await apiRequest("GET", "/api/bookmarks", undefined);
  return res.json();
};

export const getBookmarksByCategory = async (category: string): Promise<Bookmark[]> => {
  const res = await apiRequest("GET", `/api/bookmarks/category/${category}`, undefined);
  return res.json();
};

export const getBookmarkById = async (id: number): Promise<Bookmark> => {
  const res = await apiRequest("GET", `/api/bookmarks/${id}`, undefined);
  return res.json();
};

export const updateBookmark = async (id: number, bookmark: Partial<Bookmark>): Promise<Bookmark> => {
  const res = await apiRequest("PUT", `/api/bookmarks/${id}`, bookmark);
  queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
  return res.json();
};

export const deleteBookmark = async (id: number): Promise<void> => {
  await apiRequest("DELETE", `/api/bookmarks/${id}`, undefined);
  queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
};

export const exportBookmarks = async (format: 'json' | 'markdown' | 'html' = 'json'): Promise<void> => {
  window.open(`/api/bookmarks/export?format=${format}`, '_blank');
};

export const importBookmarks = async (bookmarks: InsertBookmark[]): Promise<void> => {
  await apiRequest("POST", "/api/bookmarks/import", { bookmarks });
  queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
};

// Category endpoints
export const getCategories = async (): Promise<Category[]> => {
  const res = await apiRequest("GET", "/api/categories", undefined);
  return res.json();
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const res = await apiRequest("GET", `/api/categories/${id}`, undefined);
  return res.json();
};

export const createCategory = async (category: Omit<InsertCategory, "userId">): Promise<Category> => {
  const res = await apiRequest("POST", "/api/categories", category);
  queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
  return res.json();
};

export const updateCategory = async (id: number, category: Partial<Category>): Promise<Category> => {
  const res = await apiRequest("PUT", `/api/categories/${id}`, category);
  queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
  queryClient.invalidateQueries({ queryKey: ['/api/categories', id] });
  return res.json();
};

export const deleteCategory = async (id: number): Promise<void> => {
  await apiRequest("DELETE", `/api/categories/${id}`, undefined);
  queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
};

// Dashboard endpoints
export const getDashboardActivity = async (timeframe?: string): Promise<DashboardActivityResponse> => {
  const queryParams = timeframe ? `?timeframe=${timeframe}` : '';
  const res = await apiRequest("GET", `/api/dashboard/activity${queryParams}`, undefined);
  return res.json();
};

export const getLanguageDistribution = async (timeframe?: string): Promise<LanguageDistributionResponse> => {
  const queryParams = timeframe ? `?timeframe=${timeframe}` : '';
  const res = await apiRequest("GET", `/api/dashboard/languages${queryParams}`, undefined);
  return res.json();
};

export const exportDashboardData = async (timeframe?: string): Promise<void> => {
  const queryParams = timeframe ? `?timeframe=${timeframe}` : '';
  
  // Use direct window.open to trigger a download
  window.open(`/api/dashboard/export${queryParams}`, '_blank');
};

// User Goals
export const getUserGoals = async (): Promise<UserGoal[]> => {
  const res = await apiRequest("GET", "/api/goals", undefined);
  return res.json();
};

export const createUserGoal = async (goal: Omit<InsertUserGoal, 'userId'>): Promise<UserGoal> => {
  const res = await apiRequest("POST", "/api/goals", goal);
  queryClient.invalidateQueries({ queryKey: ['/api/goals'] });
  return res.json();
};

export const updateUserGoal = async (id: number, goal: Partial<UserGoal>): Promise<UserGoal> => {
  const res = await apiRequest("PUT", `/api/goals/${id}`, goal);
  queryClient.invalidateQueries({ queryKey: ['/api/goals'] });
  return res.json();
};

export const deleteUserGoal = async (id: number): Promise<void> => {
  await apiRequest("DELETE", `/api/goals/${id}`, undefined);
  queryClient.invalidateQueries({ queryKey: ['/api/goals'] });
};
