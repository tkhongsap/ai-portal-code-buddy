import { apiRequest } from "./queryClient";
import { queryClient } from "./queryClient";
import { CodeSnippet, InsertCodeSnippet, Bookmark, InsertBookmark } from "@shared/schema";

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

export const deleteBookmark = async (id: number): Promise<void> => {
  await apiRequest("DELETE", `/api/bookmarks/${id}`, undefined);
  queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
};
