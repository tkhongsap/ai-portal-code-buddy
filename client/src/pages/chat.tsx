import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '@/contexts/user-context';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { BookmarkIcon, ClipboardIcon, ThumbsUpIcon, SearchIcon, SendIcon, CodeIcon, PaperclipIcon, SmileIcon } from 'lucide-react';
import CodeEditor from '@/components/code-editor';
import CodeDisplay from '@/components/code-display';
import { useChat, type Message } from '@/hooks/use-chat';

const ChatMessage = ({ message, onBookmark }: { message: Message, onBookmark?: () => void }) => {
  const { user } = useUser();
  
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
  
  return (
    <div className={`flex items-start ${message.isAi ? '' : 'justify-end'}`}>
      {message.isAi && (
        <div className="flex-shrink-0 mr-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            <CodeIcon size={16} />
          </div>
        </div>
      )}
      
      <div className={`flex-1 p-4 rounded-lg shadow-sm max-w-[90%] ${
        message.isAi 
          ? 'bg-white dark:bg-[#1E1E1E]' 
          : 'bg-primary bg-opacity-10 dark:bg-opacity-20'
      }`}>
        {textContent && <p className="text-sm mb-3">{textContent}</p>}
        
        {hasCode && (
          <CodeDisplay 
            code={codeContent} 
            language={language}
            onBookmark={onBookmark}
            onCopy={() => {}}
            onLike={() => {}}
          />
        )}
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

interface ConversationItem {
  id: number;
  title: string;
  preview: string;
  date: string;
  isActive?: boolean;
}

const ConversationItem = ({ conversation, onClick }: { conversation: ConversationItem, onClick: () => void }) => {
  return (
    <div 
      className={`p-4 ${conversation.isActive 
        ? 'bg-primary bg-opacity-5 dark:bg-opacity-10 border-l-4 border-primary' 
        : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
      onClick={onClick}
    >
      <h3 className="font-medium text-sm mb-1">{conversation.title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 line-clamp-2">{conversation.preview}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{conversation.date}</p>
    </div>
  );
};

const Chat = () => {
  const [query, setQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, sendMessage, isLoading } = useChat(activeConversation || undefined);
  
  const recentConversations: ConversationItem[] = [
    {
      id: 1,
      title: "React useEffect optimization",
      preview: "How can I prevent unnecessary re-renders with useEffect?",
      date: "Today, 11:42 AM",
      isActive: activeConversation === 1
    },
    {
      id: 2,
      title: "TypeScript generics example",
      preview: "Can you show me how to use generics with React components?",
      date: "Yesterday, 3:15 PM",
      isActive: activeConversation === 2
    },
    {
      id: 3,
      title: "Next.js API routes",
      preview: "What's the best practice for handling authentication in Next.js API routes?",
      date: "Jun 15, 2023",
      isActive: activeConversation === 3
    },
    {
      id: 4,
      title: "CSS Grid layout",
      preview: "How do I create a responsive masonry layout with CSS Grid?",
      date: "Jun 12, 2023",
      isActive: activeConversation === 4
    },
    {
      id: 5,
      title: "JavaScript Promise.all",
      preview: "What's the difference between Promise.all and Promise.allSettled?",
      date: "Jun 10, 2023",
      isActive: activeConversation === 5
    }
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await sendMessage(query);
      setQuery('');
    }
  };
  
  const selectConversation = (id: number) => {
    setActiveConversation(id);
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Initialize with system message if no messages
  useEffect(() => {
    if (messages.length === 0) {
      sendMessage("Hi! I'm Code Buddy, your AI coding assistant. How can I help you with your coding questions today?");
    }
  }, []);
  
  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Chat History Sidebar */}
      <aside className="hidden lg:block w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-2">Recent Queries</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              type="search" 
              className="pl-10" 
              placeholder="Search conversations..." 
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {recentConversations.map(conversation => (
              <ConversationItem 
                key={conversation.id} 
                conversation={conversation} 
                onClick={() => selectConversation(conversation.id)} 
              />
            ))}
          </div>
        </ScrollArea>
      </aside>
      
      {/* Chat Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                message={message} 
                onBookmark={() => console.log('Bookmark message', message.id)} 
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
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
