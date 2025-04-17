import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookmarkIcon, CodeIcon, MessageSquareIcon, SearchIcon, TagIcon, XIcon, TrashIcon } from 'lucide-react';
import { getBookmarks, deleteBookmark } from '@/lib/api';
import CodeDisplay from '@/components/code-display';
import { queryClient } from '@/lib/queryClient';

const BookmarkItem = ({ 
  title, 
  content, 
  date, 
  tags,
  type = 'chat',
  id,
  onDelete
}: { 
  title: string; 
  content: string; 
  date: string; 
  tags: string[];
  type?: 'chat' | 'code';
  id: number;
  onDelete: (id: number) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const isCode = content.includes('```') || type === 'code';
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-lg ${isCode ? 'bg-[#00C2FF] bg-opacity-10 text-[#00C2FF]' : 'bg-primary bg-opacity-10 text-primary'} flex items-center justify-center mr-3`}>
              {isCode ? <CodeIcon size={16} /> : <MessageSquareIcon size={16} />}
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Saved {date}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
            <TrashIcon size={16} className="text-red-500" />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 flex items-center">
              <TagIcon size={12} className="mr-1" /> {tag}
            </span>
          ))}
        </div>
        
        {isCode ? (
          <div className={`mt-4 ${expanded ? '' : 'max-h-48 overflow-hidden relative'}`}>
            <CodeDisplay 
              code={content} 
              onCopy={() => {}}
            />
            {!expanded && (
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
            )}
          </div>
        ) : (
          <div className={`mt-2 text-sm text-gray-700 dark:text-gray-300 ${expanded ? '' : 'line-clamp-3'}`}>
            {content}
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleExpand} 
          className="mt-2 text-xs"
        >
          {expanded ? 'Show less' : 'Show more'}
        </Button>
      </CardContent>
    </Card>
  );
};

const Bookmarks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [currentTab, setCurrentTab] = useState('all');
  
  const { data: bookmarks = [], isLoading, error } = useQuery({
    queryKey: ['/api/bookmarks'],
    queryFn: getBookmarks
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
    }
  });
  
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      deleteMutation.mutate(id);
    }
  };
  
  // Filter bookmarks based on search query, tag, and current tab
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = searchQuery === '' || 
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = filterTag === 'all' || 
      bookmark.tags.includes(filterTag);
    
    const matchesType = currentTab === 'all' || 
      (currentTab === 'code' && bookmark.content.includes('```')) ||
      (currentTab === 'chat' && !bookmark.content.includes('```'));
    
    return matchesSearch && matchesTag && matchesType;
  });
  
  // Get unique tags from all bookmarks
  const allTags = Array.from(
    new Set(bookmarks.flatMap(bookmark => bookmark.tags))
  );
  
  return (
    <div className="flex-1 overflow-auto scrollbar p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Bookmarks</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Access and manage your saved content.
          </p>
        </header>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              type="search" 
              className="pl-10" 
              placeholder="Search bookmarks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select value={filterTag} onValueChange={setFilterTag}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tags</SelectItem>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setCurrentTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Bookmarks</TabsTrigger>
            <TabsTrigger value="code">Code Snippets</TabsTrigger>
            <TabsTrigger value="chat">Chat Responses</TabsTrigger>
          </TabsList>
          
          <TabsContent value={currentTab}>
            {isLoading ? (
              <p className="text-center py-8 text-gray-500 dark:text-gray-400">Loading bookmarks...</p>
            ) : error ? (
              <Alert variant="destructive">
                <AlertDescription>Failed to load bookmarks. Please try again.</AlertDescription>
              </Alert>
            ) : filteredBookmarks.length === 0 ? (
              <div className="text-center py-12">
                <BookmarkIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-1">No bookmarks found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery || filterTag !== 'all' 
                    ? "Try adjusting your search or filter criteria." 
                    : "Start saving useful code snippets and chat responses."}
                </p>
              </div>
            ) : (
              <div>
                {filteredBookmarks.map((bookmark, index) => (
                  <BookmarkItem 
                    key={index}
                    id={bookmark.id}
                    title={bookmark.title}
                    content={bookmark.content}
                    date={new Date(bookmark.createdAt).toLocaleDateString()}
                    tags={bookmark.tags || []}
                    type={bookmark.content.includes('```') ? 'code' : 'chat'}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Bookmarks;
