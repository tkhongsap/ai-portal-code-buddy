import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import type { ChatMessage, Conversation } from '@shared/schema';
import { queryClient } from '@/lib/queryClient';

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
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<number | undefined>(conversationId);
  const [isFetchingMessages, setIsFetchingMessages] = useState(false);
  const [isFetchingConversations, setIsFetchingConversations] = useState(false);

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      setIsFetchingConversations(true);
      const res = await apiRequest('GET', '/api/conversations');
      const data = await res.json();
      setConversations(data);
      return data;
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
      return [];
    } finally {
      setIsFetchingConversations(false);
    }
  };

  // Fetch messages for a conversation
  const fetchMessages = async (convId: number) => {
    if (!convId) return;
    
    try {
      setIsFetchingMessages(true);
      const res = await apiRequest('GET', `/api/conversations/${convId}/messages`);
      const data: ChatMessage[] = await res.json();
      
      // Convert API messages to the format used in this hook
      const convertedMessages: Message[] = data.map(msg => ({
        id: msg.id.toString(),
        content: msg.content,
        isAi: msg.isAi,
        timestamp: new Date(msg.createdAt || Date.now()),
      }));
      
      setMessages(convertedMessages);
      return convertedMessages;
    } catch (err) {
      console.error(`Failed to fetch messages for conversation ${convId}:`, err);
      return [];
    } finally {
      setIsFetchingMessages(false);
    }
  };

  // Create a new conversation
  const createConversation = async (title: string) => {
    try {
      const res = await apiRequest('POST', '/api/conversations', { title });
      const data = await res.json();
      await fetchConversations(); // Refresh the conversations list
      return data;
    } catch (err) {
      console.error('Failed to create conversation:', err);
      return null;
    }
  };

  // Send a message
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
        conversationId: activeConversation,
      });

      const data = await res.json();
      
      // Update the active conversation if this was a new conversation
      if (data.conversationId && (!activeConversation || activeConversation !== data.conversationId)) {
        setActiveConversation(data.conversationId);
        // Invalidate conversation cache to refresh the list
        queryClient.invalidateQueries({ queryKey: ['/api/conversations'] });
        await fetchConversations();
      }
      
      // Add AI response
      const aiMessage: Message = {
        id: data.id || `ai-${Date.now()}`,
        content: data.content,
        isAi: true,
        timestamp: new Date(data.timestamp),
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

  // Clear messages
  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  // Set active conversation and load its messages
  const selectConversation = async (convId: number) => {
    setActiveConversation(convId);
    await fetchMessages(convId);
  };

  // Load initial conversations when component mounts
  useEffect(() => {
    fetchConversations();
  }, []);

  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation);
    } else {
      clearMessages();
    }
  }, [activeConversation]);

  return {
    messages,
    conversations,
    activeConversation,
    sendMessage,
    clearMessages,
    fetchConversations,
    fetchMessages,
    createConversation,
    selectConversation,
    isLoading,
    isFetchingMessages,
    isFetchingConversations,
    error,
  };
}
