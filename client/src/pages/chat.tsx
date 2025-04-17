import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '@/contexts/user-context';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  BookmarkIcon, 
  ClipboardIcon, 
  ThumbsUpIcon, 
  SearchIcon, 
  SendIcon, 
  CodeIcon, 
  PaperclipIcon, 
  SmileIcon,
  PlusIcon,
  MessageSquareIcon,
  MoreVerticalIcon,
  XIcon,
  ChevronRightIcon,
  StarIcon,
  TrashIcon,
  CalendarIcon,
  HistoryIcon,
  FolderIcon,
  ChevronLeftIcon
} from 'lucide-react';
import CodeEditor from '@/components/code-editor';
import CodeDisplay from '@/components/code-display';
import { useChat, type Message } from '@/hooks/use-chat';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { apiRequest } from '@/lib/queryClient';
import { format, formatDistanceToNow } from 'date-fns';

// Chat message component
const ChatMessage = ({ message, onBookmark }: { message: Message, onBookmark?: () => void }) => {
  const { user } = useUser();
  const { toast } = useToast();
  
  // Determine if the message contains code
  const hasCode = message.content.includes('```');
  
  let textContent = message.content;
  let codeContent = '';
  let language = 'javascript';
  
  // Extract code if present
  if (hasCode) {
    const parts = message.content.split('```');
    if (parts.length >= 3) {
      textContent = parts[0];
      // Check if there's a language specified
      const codeBlockWithLang = parts[1].trim();
      const firstLineBreak = codeBlockWithLang.indexOf('\n');
      
      if (firstLineBreak > 0) {
        language = codeBlockWithLang.substring(0, firstLineBreak).trim();
        codeContent = codeBlockWithLang.substring(firstLineBreak).trim();
      } else {
        codeContent = codeBlockWithLang;
      }
      
      // Add any text after the code block
      if (parts.length > 3) {
        textContent += parts.slice(3).join('');
      }
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
      duration: 2000,
    });
  };
  
  const handleBookmark = () => {
    if (onBookmark) {
      onBookmark();
      toast({
        title: "Bookmarked",
        description: "The message has been added to your bookmarks.",
        duration: 2000,
      });
    }
  };
  
  return (
    <div className={`flex items-start ${message.isAi ? '' : 'justify-end'} group`}>
      {message.isAi && (
        <div className="flex-shrink-0 mr-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            <CodeIcon size={16} />
          </div>
        </div>
      )}
      
      <div className={`flex-1 p-4 rounded-lg shadow-sm max-w-[90%] relative ${
        message.isAi 
          ? 'bg-white dark:bg-[#1E1E1E]' 
          : 'bg-primary bg-opacity-10 dark:bg-opacity-20'
      }`}>
        {/* Message actions that appear on hover */}
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={handleCopy}
                >
                  <ClipboardIcon size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={handleBookmark}
                >
                  <BookmarkIcon size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bookmark this message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {message.isAi && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <ThumbsUpIcon size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Like this response</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {textContent && <p className="text-sm mb-3">{textContent}</p>}
        
        {hasCode && (
          <CodeDisplay 
            code={codeContent} 
            language={language}
            onBookmark={onBookmark}
            onCopy={handleCopy}
            onLike={() => {}}
          />
        )}
        
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {format(message.timestamp, 'h:mm a')}
        </div>
      </div>
      
      {!message.isAi && (
        <div className="flex-shrink-0 ml-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="User" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                {user.displayName?.[0] || user.username?.[0] || "U"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Conversation item in the sidebar
const ConversationItem = ({ 
  conversation, 
  isActive,
  onClick 
}: { 
  conversation: any, 
  isActive: boolean,
  onClick: () => void 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && 
                    date.getMonth() === now.getMonth() && 
                    date.getFullYear() === now.getFullYear();
    
    if (isToday) {
      return format(date, 'h:mm a');
    } else {
      return formatDistanceToNow(date, { addSuffix: true });
    }
  };
  
  return (
    <div 
      className={`p-4 cursor-pointer ${isActive 
        ? 'bg-primary bg-opacity-5 dark:bg-opacity-10 border-l-4 border-primary' 
        : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-medium text-sm truncate">{conversation.title}</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
          {formatDate(conversation.lastModified)}
        </span>
      </div>
      {/* Assuming the first few characters of a message might serve as a preview */}
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
        {conversation.title}
      </p>
    </div>
  );
};

// Empty state when there are no conversations
const EmptyConversation = ({ onNewChat }: { onNewChat: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
    <div className="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-4">
      <MessageSquareIcon className="text-primary" size={24} />
    </div>
    <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
      Start a new chat to get coding assistance, explain concepts, or optimize your code.
    </p>
    <Button onClick={onNewChat}>
      <PlusIcon className="mr-2" size={16} />
      New Chat
    </Button>
  </div>
);

// Main Chat component
const Chat = () => {
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchText, setSearchText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const { 
    messages, 
    conversations, 
    activeConversation,
    sendMessage, 
    createConversation,
    selectConversation,
    clearMessages,
    isLoading,
    isFetchingMessages,
    isFetchingConversations 
  } = useChat();
  
  // Handle form submission for sending a message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await sendMessage(query);
      setQuery('');
    }
  };
  
  // Handle creating a new conversation
  const handleNewChat = async () => {
    clearMessages();
    // Force mobile sidebar to close when starting a new chat
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  // Handle selecting a conversation from the sidebar
  const handleSelectConversation = (id: number) => {
    selectConversation(id);
    // Force mobile sidebar to close when selecting a conversation
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  // Handle bookmarking a message
  const handleBookmark = async (message: Message) => {
    try {
      await apiRequest('POST', '/api/bookmarks', {
        userId: 1, // Demo user ID
        title: message.content.length > 50 
          ? message.content.substring(0, 50) + "..." 
          : message.content,
        content: message.content,
        conversationId: activeConversation,
        messageId: message.id,
        tags: ["Chat"]
      });
      
      toast({
        title: "Bookmark created",
        description: "The message has been saved to your bookmarks.",
      });
    } catch (err) {
      console.error("Failed to create bookmark:", err);
      toast({
        title: "Failed to bookmark",
        description: "There was an error saving this message.",
        variant: "destructive"
      });
    }
  };
  
  // Filter conversations based on search text
  const filteredConversations = searchText
    ? conversations.filter(conv => 
        conv.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : conversations;
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Initialize with system message if no messages
  useEffect(() => {
    if (messages.length === 0 && !activeConversation && !isFetchingMessages) {
      sendMessage("Hi! I'm Code Buddy, your AI coding assistant. How can I help you with your coding questions today?");
    }
  }, [messages, activeConversation, isFetchingMessages]);
  
  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex-1 flex overflow-hidden relative">
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <button
          className="absolute top-4 left-4 z-50 rounded-full p-2 bg-white dark:bg-gray-800 shadow-md"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <ChevronLeftIcon size={16} /> : <ChevronRightIcon size={16} />}
        </button>
      )}
      
      {/* Chat History Sidebar */}
      <aside 
        className={`${
          isMobile 
            ? sidebarOpen 
              ? 'absolute inset-y-0 left-0 z-40 w-80' 
              : 'hidden' 
            : 'relative w-80'
        } border-r border-gray-200 dark:border-gray-800 flex flex-col bg-white dark:bg-gray-900`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Chats</h2>
            <Button variant="outline" size="sm" onClick={handleNewChat}>
              <PlusIcon size={16} className="mr-1" />
              New
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              type="search" 
              className="pl-10" 
              placeholder="Search conversations..." 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          {isFetchingConversations ? (
            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Loading conversations...
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
              {searchText ? "No matching conversations" : "No conversations yet"}
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredConversations.map(conversation => (
                <ConversationItem 
                  key={conversation.id} 
                  conversation={conversation} 
                  isActive={activeConversation === conversation.id}
                  onClick={() => handleSelectConversation(conversation.id)} 
                />
              ))}
            </div>
          )}
        </ScrollArea>
        
        {/* Sidebar footer with quick links */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="grid grid-cols-3 gap-2 mb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-14 w-full">
                    <StarIcon size={16} className="mb-1" />
                    <span className="text-xs">Starred</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View starred conversations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-14 w-full">
                    <HistoryIcon size={16} className="mb-1" />
                    <span className="text-xs">History</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View chat history</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-14 w-full">
                    <FolderIcon size={16} className="mb-1" />
                    <span className="text-xs">Folders</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Organize chats in folders</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </aside>
      
      {/* Chat Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Chat Messages */}
        {messages.length === 0 && !isFetchingMessages ? (
          <EmptyConversation onNewChat={handleNewChat} />
        ) : (
          <>
            {/* Chat header */}
            <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                <h2 className="text-lg font-medium">
                  {activeConversation && conversations.find(c => c.id === activeConversation)?.title || "New Chat"}
                </h2>
                
                <div className="flex items-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                          <MoreVerticalIcon size={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chat options</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            
            {/* Messages area */}
            <ScrollArea className="flex-1 p-4">
              <div className="max-w-3xl mx-auto space-y-6">
                {isFetchingMessages ? (
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Loading messages...</p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <ChatMessage 
                      key={`${message.id}-${index}`} 
                      message={message} 
                      onBookmark={() => handleBookmark(message)} 
                    />
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </>
        )}
        
        {/* Chat Input */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Tabs defaultValue="text" className="w-full">
                    <TabsContent value="text" className="m-0">
                      <div className="min-h-[100px] max-h-[200px] p-2">
                        <textarea
                          className="w-full h-full min-h-[100px] resize-none focus:outline-none bg-transparent"
                          placeholder="Type your code or question here..."
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="code" className="m-0">
                      <div className="p-2">
                        <CodeEditor
                          value={query}
                          onChange={setQuery}
                          minHeight="100px"
                          maxHeight="200px"
                        />
                      </div>
                    </TabsContent>
                    
                    <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 dark:border-gray-700">
                      <TabsList className="bg-transparent">
                        <TabsTrigger value="text" className="px-2 data-[state=active]:bg-transparent text-gray-500 data-[state=active]:text-primary">
                          <span className="sr-only">Text</span>
                          <span className="block">Aa</span>
                        </TabsTrigger>
                        <TabsTrigger value="code" className="px-2 data-[state=active]:bg-transparent text-gray-500 data-[state=active]:text-primary">
                          <CodeIcon size={16} />
                        </TabsTrigger>
                        <Button type="button" variant="ghost" size="icon" className="text-gray-500">
                          <PaperclipIcon size={16} />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="text-gray-500">
                          <SmileIcon size={16} />
                        </Button>
                      </TabsList>
                      
                      <Button type="submit" disabled={!query.trim() || isLoading}>
                        {isLoading ? 'Processing...' : 'Send'} {!isLoading && <SendIcon className="ml-1" size={16} />}
                      </Button>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </form>
            
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
              <span className="inline-flex items-center">
                <CodeIcon className="mr-1" size={12} /> Code Buddy may produce inaccurate information. Always verify code before use.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
