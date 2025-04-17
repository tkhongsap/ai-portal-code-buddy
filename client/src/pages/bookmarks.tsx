import React, { useState, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  BookmarkIcon, 
  CodeIcon, 
  MessageSquareIcon, 
  SearchIcon, 
  TagIcon, 
  PlusIcon, 
  EditIcon, 
  StarIcon, 
  TrashIcon, 
  FolderIcon, 
  Download, 
  Upload, 
  PlusCircleIcon,
  ArrowUpDown
} from 'lucide-react';
import { 
  getBookmarks, 
  deleteBookmark, 
  createBookmark, 
  updateBookmark, 
  getBookmarksByCategory, 
  exportBookmarks, 
  importBookmarks 
} from '@/lib/api';
import CodeDisplay from '@/components/code-display';
import { queryClient } from '@/lib/queryClient';
import { Bookmark, InsertBookmark } from '@shared/schema';

// Component for the tag input
const TagInput = ({ 
  tags, 
  setTags 
}: { 
  tags: string[]; 
  setTags: (tags: string[]) => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <div key={tag} className="flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <span className="mr-1">{tag}</span>
            <button 
              type="button" 
              onClick={() => removeTag(tag)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tag and press Enter"
          className="flex-1"
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => {
            if (inputValue.trim() && !tags.includes(inputValue.trim())) {
              setTags([...tags, inputValue.trim()]);
              setInputValue('');
              inputRef.current?.focus();
            }
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

// Bookmark Form Dialog
const BookmarkFormDialog = ({ 
  bookmark, 
  open, 
  onOpenChange, 
  onSubmit 
}: { 
  bookmark?: Partial<Bookmark>; 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  onSubmit: (data: Partial<Bookmark>) => void; 
}) => {
  const [title, setTitle] = useState(bookmark?.title || '');
  const [content, setContent] = useState(bookmark?.content || '');
  const [category, setCategory] = useState(bookmark?.category || 'General');
  const [tags, setTags] = useState<string[]>(bookmark?.tags || []);
  const [notes, setNotes] = useState(bookmark?.notes || '');
  const [contentType, setContentType] = useState(bookmark?.contentType || 'chat');
  const [url, setUrl] = useState(bookmark?.url || '');
  const [starred, setStarred] = useState(bookmark?.starred || false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...bookmark,
      title,
      content,
      category,
      tags,
      notes,
      contentType,
      url,
      starred
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{bookmark ? 'Edit Bookmark' : 'Create Bookmark'}</DialogTitle>
            <DialogDescription>
              {bookmark ? 'Update your bookmark details.' : 'Add a new bookmark to your collection.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter bookmark title"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter bookmark content"
                required
                className="min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Code">Code</SelectItem>
                    <SelectItem value="Documentation">Documentation</SelectItem>
                    <SelectItem value="Tutorial">Tutorial</SelectItem>
                    <SelectItem value="Reference">Reference</SelectItem>
                    <SelectItem value="Snippet">Snippet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="contentType">Content Type</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger id="contentType">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chat">Chat</SelectItem>
                    <SelectItem value="code">Code</SelectItem>
                    <SelectItem value="note">Note</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <TagInput tags={tags} setTags={setTags} />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes || ''}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this bookmark"
                className="min-h-[80px]"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="url">URL (optional)</Label>
              <Input
                id="url"
                value={url || ''}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                type="url"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input
                id="starred"
                type="checkbox"
                checked={starred}
                onChange={(e) => setStarred(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="starred" className="text-sm font-normal">
                Mark as starred
              </Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {bookmark ? 'Update Bookmark' : 'Create Bookmark'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Import Dialog
const ImportDialog = ({ 
  open, 
  onOpenChange, 
  onImport 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  onImport: (data: string) => void; 
}) => {
  const [importData, setImportData] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onImport(importData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Import Bookmarks</DialogTitle>
            <DialogDescription>
              Paste your JSON-formatted bookmarks below to import them.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder='[{"title": "Example Bookmark", "content": "Content here", "tags": ["example"]}]'
              className="min-h-[200px] font-mono text-sm"
              required
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Import
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Bookmark Item Component
const BookmarkItem = ({ 
  bookmark,
  onEdit,
  onDelete,
  onTagClick
}: { 
  bookmark: Bookmark;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: number) => void;
  onTagClick: (tag: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const isCode = bookmark.content.includes('```') || bookmark.contentType === 'code';
  const date = bookmark.createdAt ? new Date(bookmark.createdAt).toLocaleDateString() : 'Unknown date';
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-lg ${isCode ? 'bg-[#00C2FF] bg-opacity-10 text-[#00C2FF]' : 'bg-primary bg-opacity-10 text-primary'} flex items-center justify-center mr-3`}>
              {isCode ? <CodeIcon size={16} /> : <MessageSquareIcon size={16} />}
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium">{bookmark.title}</h3>
                {bookmark.starred && <StarIcon size={16} className="ml-2 text-yellow-500 fill-yellow-500" />}
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span>Saved {date}</span>
                {bookmark.category && (
                  <span className="ml-2 flex items-center">
                    <FolderIcon size={12} className="mr-1" /> {bookmark.category}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" onClick={() => onEdit(bookmark)}>
              <EditIcon size={16} className="text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(bookmark.id)}>
              <TrashIcon size={16} className="text-red-500" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {bookmark.tags && bookmark.tags.map((tag, index) => (
            <button
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 flex items-center hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={() => onTagClick(tag)}
            >
              <TagIcon size={12} className="mr-1" /> {tag}
            </button>
          ))}
        </div>
        
        {isCode ? (
          <div className={`mt-4 ${expanded ? '' : 'max-h-48 overflow-hidden relative'}`}>
            <CodeDisplay 
              code={bookmark.content} 
              onCopy={() => {}}
            />
            {!expanded && (
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
            )}
          </div>
        ) : (
          <div className={`mt-2 text-sm text-gray-700 dark:text-gray-300 ${expanded ? '' : 'line-clamp-3'}`}>
            {bookmark.content}
          </div>
        )}
        
        {bookmark.notes && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-1">Notes:</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{bookmark.notes}</p>
          </div>
        )}
        
        {bookmark.url && (
          <div className="mt-2">
            <a 
              href={bookmark.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {bookmark.url.length > 40 ? bookmark.url.substring(0, 40) + '...' : bookmark.url}
            </a>
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

// Category Sidebar Component
const CategorySidebar = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: { 
  categories: {name: string, count: number}[]; 
  selectedCategory: string; 
  onSelectCategory: (category: string) => void; 
}) => {
  return (
    <div className="w-full md:w-56 mb-6 md:mb-0">
      <div className="mb-4 font-medium text-sm uppercase text-gray-500 dark:text-gray-400">
        Categories
      </div>
      <div className="space-y-1">
        <button
          className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
            selectedCategory === 'all' 
              ? 'bg-primary text-primary-foreground font-medium' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          onClick={() => onSelectCategory('all')}
        >
          <span className="flex items-center">
            <BookmarkIcon size={16} className="mr-2" /> All Bookmarks
          </span>
          <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </span>
        </button>
        
        <button
          className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
            selectedCategory === 'starred' 
              ? 'bg-primary text-primary-foreground font-medium' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          onClick={() => onSelectCategory('starred')}
        >
          <span className="flex items-center">
            <StarIcon size={16} className="mr-2" /> Starred
          </span>
        </button>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-2 font-medium text-sm uppercase text-gray-500 dark:text-gray-400">
            Category Folders
          </div>
          {categories.map((category) => (
            category.name !== 'all' && (
              <button
                key={category.name}
                className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
                  selectedCategory === category.name 
                    ? 'bg-primary text-primary-foreground font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => onSelectCategory(category.name)}
              >
                <span className="flex items-center">
                  <FolderIcon size={16} className="mr-2" /> {category.name}
                </span>
                <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded">
                  {category.count}
                </span>
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Bookmarks Component
const Bookmarks = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentTab, setCurrentTab] = useState('all');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [currentBookmark, setCurrentBookmark] = useState<Bookmark | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  
  const { data: bookmarks = [], isLoading, error } = useQuery({
    queryKey: ['/api/bookmarks'],
    queryFn: getBookmarks
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
      toast({
        title: "Bookmark deleted",
        description: "Your bookmark has been deleted successfully.",
      });
    }
  });
  
  const createMutation = useMutation({
    mutationFn: (data: InsertBookmark) => createBookmark(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
      toast({
        title: "Bookmark created",
        description: "Your bookmark has been created successfully.",
      });
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Bookmark> }) => updateBookmark(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
      toast({
        title: "Bookmark updated",
        description: "Your bookmark has been updated successfully.",
      });
    }
  });
  
  const importMutation = useMutation({
    mutationFn: (bookmarks: InsertBookmark[]) => importBookmarks(bookmarks),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
      toast({
        title: "Bookmarks imported",
        description: "Your bookmarks have been imported successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Import failed",
        description: "There was an error importing your bookmarks.",
        variant: "destructive",
      });
    }
  });
  
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      deleteMutation.mutate(id);
    }
  };
  
  const handleEdit = (bookmark: Bookmark) => {
    setCurrentBookmark(bookmark);
    setEditDialogOpen(true);
  };
  
  const handleTagClick = (tag: string) => {
    setFilterTag(tag);
  };
  
  const handleCreateBookmark = (data: Partial<Bookmark>) => {
    createMutation.mutate({
      userId: 1, // In a real app, this would come from the session
      title: data.title || '',
      content: data.content || '',
      category: data.category || 'General',
      tags: data.tags || [],
      notes: data.notes || null,
      contentType: data.contentType || 'chat',
      url: data.url || null,
      starred: data.starred || false,
      conversationId: null,
      messageId: null
    });
  };
  
  const handleUpdateBookmark = (data: Partial<Bookmark>) => {
    if (currentBookmark) {
      updateMutation.mutate({
        id: currentBookmark.id,
        data: {
          title: data.title,
          content: data.content,
          category: data.category,
          tags: data.tags,
          notes: data.notes,
          contentType: data.contentType,
          url: data.url,
          starred: data.starred
        }
      });
    }
  };
  
  const handleExport = (format: 'json' | 'markdown') => {
    exportBookmarks(format);
  };
  
  const handleImport = (jsonString: string) => {
    try {
      const bookmarks = JSON.parse(jsonString);
      if (!Array.isArray(bookmarks)) {
        throw new Error('Invalid format. Expected an array of bookmarks.');
      }
      
      importMutation.mutate(bookmarks);
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Invalid JSON format. Please check your data and try again.",
        variant: "destructive",
      });
    }
  };
  
  // Get unique categories from all bookmarks
  const categoryDistribution = bookmarks.reduce((acc: Record<string, number>, bookmark) => {
    const category = bookmark.category || 'General';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  const categories = Object.entries(categoryDistribution).map(([name, count]) => ({ name, count }));
  
  // Get unique tags from all bookmarks
  const allTags = Array.from(
    new Set(bookmarks.flatMap(bookmark => bookmark.tags || []))
  );
  
  // Filter bookmarks based on search query, tag, category, and current tab
  let filteredBookmarks = [...bookmarks];
  
  // First filter by category
  if (selectedCategory !== 'all') {
    if (selectedCategory === 'starred') {
      filteredBookmarks = filteredBookmarks.filter(bookmark => bookmark.starred);
    } else {
      filteredBookmarks = filteredBookmarks.filter(bookmark => bookmark.category === selectedCategory);
    }
  }
  
  // Then filter by search query
  if (searchQuery) {
    filteredBookmarks = filteredBookmarks.filter(bookmark => {
      return (
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (bookmark.notes && bookmark.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (bookmark.tags && bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    });
  }
  
  // Then filter by tag
  if (filterTag !== 'all') {
    filteredBookmarks = filteredBookmarks.filter(bookmark => 
      bookmark.tags && bookmark.tags.includes(filterTag)
    );
  }
  
  // Then filter by content type
  if (currentTab !== 'all') {
    filteredBookmarks = filteredBookmarks.filter(bookmark => {
      if (currentTab === 'code') {
        return bookmark.contentType === 'code' || bookmark.content.includes('```');
      } else if (currentTab === 'chat') {
        return bookmark.contentType === 'chat' && !bookmark.content.includes('```');
      } else if (currentTab === 'note') {
        return bookmark.contentType === 'note';
      } else if (currentTab === 'link') {
        return bookmark.contentType === 'link' || bookmark.url;
      }
      return true;
    });
  }
  
  // Sort bookmarks
  filteredBookmarks.sort((a, b) => {
    if (sortOrder === 'newest') {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    } else if (sortOrder === 'oldest') {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateA - dateB;
    } else if (sortOrder === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  
  return (
    <div className="flex-1 overflow-auto scrollbar p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Bookmarks</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Access and manage your saved content.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setCreateDialogOpen(true)} className="gap-1">
              <PlusIcon size={16} /> Create Bookmark
            </Button>
            
            <div className="flex gap-1">
              <Button variant="outline" onClick={() => handleExport('json')} className="gap-1">
                <Download size={16} /> Export
              </Button>
              <Button variant="outline" onClick={() => setImportDialogOpen(true)} className="gap-1">
                <Upload size={16} /> Import
              </Button>
            </div>
          </div>
        </header>
        
        <div className="flex flex-col md:flex-row gap-6">
          <CategorySidebar 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <div className="flex-1">
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
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
              
              <div className="w-full sm:w-64">
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
              
              <div className="w-full sm:w-48">
                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Tabs defaultValue="all" onValueChange={setCurrentTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Types</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="note">Notes</TabsTrigger>
                <TabsTrigger value="link">Links</TabsTrigger>
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
                      {(searchQuery || filterTag !== 'all' || selectedCategory !== 'all')
                        ? "Try adjusting your search or filter criteria." 
                        : "Start saving useful code snippets and chat responses."}
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => setCreateDialogOpen(true)}>
                      <PlusIcon size={16} className="mr-2" /> Create Bookmark
                    </Button>
                  </div>
                ) : (
                  <div>
                    {filteredBookmarks.map((bookmark) => (
                      <BookmarkItem 
                        key={bookmark.id}
                        bookmark={bookmark}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onTagClick={handleTagClick}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <BookmarkFormDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
        onSubmit={handleCreateBookmark} 
      />
      
      <BookmarkFormDialog 
        bookmark={currentBookmark} 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen} 
        onSubmit={handleUpdateBookmark} 
      />
      
      <ImportDialog 
        open={importDialogOpen} 
        onOpenChange={setImportDialogOpen} 
        onImport={handleImport} 
      />
    </div>
  );
};

export default Bookmarks;
