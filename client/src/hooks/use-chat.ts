import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';

export interface Message {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: Date;
}

export interface ChatOptions {
  onStart?: () => void;
  onFinish?: () => void;
  onError?: (error: Error) => void;
}

export function useChat(conversationId?: number, options?: ChatOptions) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    try {
      setIsLoading(true);
      options?.onStart?.();
      setError(null);

      // Add user message to the UI immediately
      const userMessageId = `user-${Date.now()}`;
      const userMessage: Message = {
        id: userMessageId,
        content,
        isAi: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);

      // Send to backend
      const res = await apiRequest('POST', '/api/chat', {
        content,
        conversationId,
      });

      const data = await res.json();
      
      // Add AI response
      const aiMessage: Message = {
        id: data.id || `ai-${Date.now()}`,
        content: data.content,
        isAi: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to send message');
      setError(error);
      options?.onError?.(error);
      return null;
    } finally {
      setIsLoading(false);
      options?.onFinish?.();
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading,
    error,
  };
}
