import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  InfoIcon, 
  ArrowRightIcon, 
  CheckIcon, 
  XIcon, 
  UploadIcon, 
  FileCode2Icon, 
  ZapIcon, 
  BookOpenIcon, 
  ShieldCheckIcon, 
  AlertTriangleIcon, 
  ExternalLinkIcon,
  ClipboardCopyIcon,
  DownloadIcon,
  RefreshCwIcon,
  FolderIcon,
  EyeIcon,
  EyeOffIcon
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import CodeEditor from '@/components/code-editor';
import CodeDisplay from '@/components/code-display';
import { optimizeCode, type OptimizationImprovement } from '@/lib/api';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'sql', label: 'SQL' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
];

// Helper component for the category icon
const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'performance':
      return <ZapIcon className="h-4 w-4" />;
    case 'readability':
      return <BookOpenIcon className="h-4 w-4" />;
    case 'best_practices':
      return <ShieldCheckIcon className="h-4 w-4" />;
    case 'error_handling':
      return <AlertTriangleIcon className="h-4 w-4" />;
    default:
      return <InfoIcon className="h-4 w-4" />;
  }
};

// Category badge component
const CategoryBadge = ({ category }: { category: string }) => {
  let color;
  let label;
  
  switch (category) {
    case 'performance':
      color = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      label = 'Performance';
      break;
    case 'readability':
      color = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      label = 'Readability';
      break;
    case 'best_practices':
      color = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      label = 'Best Practices';
      break;
    case 'error_handling':
      color = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      label = 'Error Handling';
      break;
    default:
      color = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      label = category;
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      <span className="mr-1"><CategoryIcon category={category} /></span>
      {label}
    </span>
  );
};

// Severity badge component
const SeverityBadge = ({ severity }: { severity: string }) => {
  let color;
  
  switch (severity) {
    case 'high':
      color = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      break;
    case 'medium':
      color = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      break;
    case 'low':
      color = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      break;
    default:
      color = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
};

// Individual improvement suggestion component
const ImprovementSuggestion = ({ 
  improvement, 
  onApply, 
  isApplied,
  onToggleView
}: { 
  improvement: OptimizationImprovement, 
  onApply: () => void,
  isApplied: boolean,
  onToggleView: () => void
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className={`border rounded-lg p-4 mb-4 ${isApplied ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-gray-200 dark:border-gray-700'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <CategoryBadge category={improvement.category} />
          <SeverityBadge severity={improvement.severity} />
          {isApplied && (
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200">
              <CheckIcon className="h-3 w-3 mr-1" /> Applied
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleView}>
                  {isExpanded ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isExpanded ? "Hide code" : "View code"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={isApplied ? "outline" : "default"} 
                  size="sm" 
                  className={isApplied ? "border-green-500 text-green-700" : ""}
                  onClick={onApply}
                  disabled={isApplied}
                >
                  {isApplied ? (
                    <>
                      <CheckIcon className="h-4 w-4 mr-1" /> Applied
                    </>
                  ) : (
                    "Apply"
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isApplied ? "Already applied" : "Apply this suggestion"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <h3 className="font-medium text-base mb-2">{improvement.title}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{improvement.description}</p>
      
      {improvement.learn_more_url && (
        <div className="mb-3">
          <a 
            href={improvement.learn_more_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Learn more <ExternalLinkIcon className="h-3 w-3 ml-1" />
          </a>
        </div>
      )}
      
      {isExpanded && improvement.original_code && improvement.optimized_code && (
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Original Code:</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 overflow-x-auto">
              <pre className="text-xs">
                <code>{improvement.original_code}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Optimized Code:</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 overflow-x-auto">
              <pre className="text-xs">
                <code>{improvement.optimized_code}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// File Upload component
const FileUpload = ({ onFileContent }: { onFileContent: (content: string) => void }) => {
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onFileContent(content);
      toast({
        title: "File loaded",
        description: `${file.name} has been loaded successfully.`,
      });
    };
    
    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to read the file.",
        variant: "destructive"
      });
    };
    
    reader.readAsText(file);
  };
  
  return (
    <div className="relative">
      <input
        type="file"
        id="file-upload"
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        onChange={handleFileChange}
        accept=".js,.ts,.py,.java,.html,.css,.php,.rb,.go,.c,.cpp,.cs,.swift,.kt,.rs,.sql"
      />
      <Button variant="outline" className="w-full" type="button">
        <UploadIcon className="h-4 w-4 mr-2" />
        Upload File
      </Button>
    </div>
  );
};

// Main optimization component
const Optimization = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [optimizedCode, setOptimizedCode] = useState('');
  const [improvements, setImprovements] = useState<OptimizationImprovement[]>([]);
  const [appliedImprovements, setAppliedImprovements] = useState<Set<number>>(new Set());
  const [expandedImprovements, setExpandedImprovements] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [summary, setCodeSummary] = useState<{
    total_issues: number;
    performance_issues: number;
    readability_issues: number;
    best_practices_issues: number;
    error_handling_issues: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Detect language from file extension
  const detectLanguage = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    const extensionMap: Record<string, string> = {
      'js': 'javascript',
      'ts': 'typescript',
      'py': 'python',
      'java': 'java',
      'cs': 'csharp',
      'cpp': 'cpp',
      'php': 'php',
      'rb': 'ruby',
      'go': 'go',
      'rs': 'rust',
      'sql': 'sql',
      'html': 'html',
      'css': 'css',
    };
    
    return extensionMap[extension] || language;
  };
  
  // Handle code optimization
  const handleOptimize = async () => {
    if (!code.trim()) {
      setError('Please enter some code to optimize');
      return;
    }
    
    try {
      setIsLoading(true);
      setProgress(0);
      setError(null);
      setAnalysisComplete(false);
      setAppliedImprovements(new Set());
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 - prev) * 0.1;
          return newProgress >= 95 ? 95 : newProgress;
        });
      }, 300);
      
      const result = await optimizeCode(code, language);
      
      clearInterval(progressInterval);
      setProgress(100);
      setOptimizedCode(result.optimized);
      setImprovements(result.improvements);
      setCodeSummary(result.summary);
      setAnalysisComplete(true);
      
      toast({
        title: "Analysis Complete",
        description: `Found ${result.improvements.length} optimization opportunities.`,
      });
    } catch (err) {
      console.error('Error optimizing code:', err);
      setError('Failed to optimize code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Apply a specific improvement
  const handleApplyImprovement = (index: number) => {
    // Mark this improvement as applied
    setAppliedImprovements(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
    
    toast({
      title: "Improvement Applied",
      description: "The suggested improvement has been applied to the optimized code.",
    });
  };
  
  // Toggle code view for an improvement
  const toggleImprovementView = (index: number) => {
    setExpandedImprovements(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  
  // Apply all improvements
  const handleApplyAllImprovements = () => {
    const newApplied = new Set<number>();
    improvements.forEach((_, index) => {
      newApplied.add(index);
    });
    setAppliedImprovements(newApplied);
    
    toast({
      title: "All Improvements Applied",
      description: "All suggested improvements have been applied to the optimized code.",
    });
  };
  
  // Clear all data
  const handleClearAll = () => {
    setCode('');
    setOptimizedCode('');
    setImprovements([]);
    setAppliedImprovements(new Set());
    setExpandedImprovements(new Set());
    setError(null);
    setAnalysisComplete(false);
    setProgress(0);
    setCodeSummary(null);
  };
  
  // Download optimized code
  const handleDownloadOptimized = () => {
    if (!optimizedCode) return;
    
    const blob = new Blob([optimizedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optimized-code.${language === 'javascript' ? 'js' : language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Complete",
      description: "The optimized code has been downloaded.",
    });
  };
  
  // Copy optimized code to clipboard
  const handleCopyOptimized = () => {
    if (!optimizedCode) return;
    
    navigator.clipboard.writeText(optimizedCode);
    
    toast({
      title: "Copied to Clipboard",
      description: "The optimized code has been copied to your clipboard.",
    });
  };
  
  // Apply optimized code to the editor
  const applyOptimizedCode = () => {
    if (optimizedCode) {
      setCode(optimizedCode);
      
      toast({
        title: "Code Applied",
        description: "The optimized code has been applied to the editor.",
      });
      
      // Reset the optimization state
      setOptimizedCode('');
      setImprovements([]);
      setAppliedImprovements(new Set());
      setExpandedImprovements(new Set());
      setAnalysisComplete(false);
      setCodeSummary(null);
    }
  };
  
  // Handle file upload
  const handleFileContent = (content: string) => {
    setCode(content);
  };
  
  // Filter improvements by category
  const filteredImprovements = activeCategory === 'all' 
    ? improvements 
    : improvements.filter(improvement => improvement.category === activeCategory);
  
  return (
    <div className="flex-1 overflow-auto scrollbar p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Optimize Your Code</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Improve your code's performance, readability, and adherence to best practices with AI-powered suggestions.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Input Code</CardTitle>
                    <CardDescription>
                      Enter your code or upload a file for optimization analysis.
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <FileUpload onFileContent={handleFileContent} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Select 
                    value={language} 
                    onValueChange={setLanguage}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  language={language}
                  minHeight="300px"
                  maxHeight="500px"
                  placeholder="// Enter or paste your code here"
                />
                
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {isLoading && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Analyzing code...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={handleClearAll}>Clear</Button>
                <Button onClick={handleOptimize} disabled={isLoading}>
                  {isLoading ? 'Analyzing...' : 'Optimize Code'}
                </Button>
              </CardFooter>
            </Card>
            
            {optimizedCode && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Optimized Code</CardTitle>
                      <CardDescription>
                        Review and compare the optimized version of your code.
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm" onClick={handleCopyOptimized}>
                              <ClipboardCopyIcon className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy optimized code to clipboard</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm" onClick={handleDownloadOptimized}>
                              <DownloadIcon className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Download optimized code</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="optimized">
                    <TabsList className="mb-4">
                      <TabsTrigger value="optimized">Optimized Version</TabsTrigger>
                      <TabsTrigger value="diff">Side-by-Side Comparison</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="optimized">
                      <CodeDisplay 
                        code={optimizedCode} 
                        language={language}
                        onCopy={handleCopyOptimized}
                      />
                    </TabsContent>
                    
                    <TabsContent value="diff">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Original Code</h3>
                          <div className="code-font text-sm bg-[#F7F7F7] dark:bg-[#2A2A2A] p-3 rounded-md overflow-auto max-h-[400px]">
                            <pre className="text-gray-800 dark:text-gray-200">{code}</pre>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-2">Optimized Code</h3>
                          <div className="code-font text-sm bg-[#F7F7F7] dark:bg-[#2A2A2A] p-3 rounded-md overflow-auto max-h-[400px]">
                            <pre className="text-gray-800 dark:text-gray-200">{optimizedCode}</pre>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full justify-between">
                    <Button variant="outline" onClick={() => {
                      handleOptimize();
                    }}>
                      <RefreshCwIcon className="h-4 w-4 mr-1" />
                      Re-analyze
                    </Button>
                    
                    <Button onClick={applyOptimizedCode}>
                      Apply Optimized Code
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>
          
          {/* Suggestions panel */}
          <div className="space-y-6">
            {/* Analysis summary */}
            {summary && analysisComplete && (
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total issues found</div>
                      <div className="text-2xl font-bold">{summary.total_issues}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                        <div className="flex items-center">
                          <ZapIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-1" />
                          <span className="text-sm text-yellow-600 dark:text-yellow-400">Performance</span>
                        </div>
                        <div className="text-xl font-semibold mt-1">{summary.performance_issues}</div>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <div className="flex items-center">
                          <BookOpenIcon className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                          <span className="text-sm text-blue-600 dark:text-blue-400">Readability</span>
                        </div>
                        <div className="text-xl font-semibold mt-1">{summary.readability_issues}</div>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <div className="flex items-center">
                          <ShieldCheckIcon className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                          <span className="text-sm text-green-600 dark:text-green-400">Best Practices</span>
                        </div>
                        <div className="text-xl font-semibold mt-1">{summary.best_practices_issues}</div>
                      </div>
                      
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <div className="flex items-center">
                          <AlertTriangleIcon className="h-4 w-4 text-red-600 dark:text-red-400 mr-1" />
                          <span className="text-sm text-red-600 dark:text-red-400">Error Handling</span>
                        </div>
                        <div className="text-xl font-semibold mt-1">{summary.error_handling_issues}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Improvement suggestions */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Optimization Suggestions</CardTitle>
                  {improvements.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleApplyAllImprovements}
                      disabled={appliedImprovements.size === improvements.length}
                    >
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Apply All
                    </Button>
                  )}
                </div>
                <CardDescription>
                  Review and apply suggested improvements to your code.
                </CardDescription>
              </CardHeader>
              
              {improvements.length > 0 && (
                <div className="px-6">
                  <div className="flex overflow-x-auto py-2 mb-2">
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant={activeCategory === 'all' ? 'default' : 'outline'}
                        onClick={() => setActiveCategory('all')}
                        className="flex-shrink-0"
                      >
                        All ({improvements.length})
                      </Button>
                      
                      {summary && summary.performance_issues > 0 && (
                        <Button 
                          size="sm" 
                          variant={activeCategory === 'performance' ? 'default' : 'outline'}
                          onClick={() => setActiveCategory('performance')}
                          className="flex-shrink-0"
                        >
                          <ZapIcon className="h-4 w-4 mr-1" />
                          Performance ({summary.performance_issues})
                        </Button>
                      )}
                      
                      {summary && summary.readability_issues > 0 && (
                        <Button 
                          size="sm" 
                          variant={activeCategory === 'readability' ? 'default' : 'outline'}
                          onClick={() => setActiveCategory('readability')}
                          className="flex-shrink-0"
                        >
                          <BookOpenIcon className="h-4 w-4 mr-1" />
                          Readability ({summary.readability_issues})
                        </Button>
                      )}
                      
                      {summary && summary.best_practices_issues > 0 && (
                        <Button 
                          size="sm" 
                          variant={activeCategory === 'best_practices' ? 'default' : 'outline'}
                          onClick={() => setActiveCategory('best_practices')}
                          className="flex-shrink-0"
                        >
                          <ShieldCheckIcon className="h-4 w-4 mr-1" />
                          Best Practices ({summary.best_practices_issues})
                        </Button>
                      )}
                      
                      {summary && summary.error_handling_issues > 0 && (
                        <Button 
                          size="sm" 
                          variant={activeCategory === 'error_handling' ? 'default' : 'outline'}
                          onClick={() => setActiveCategory('error_handling')}
                          className="flex-shrink-0"
                        >
                          <AlertTriangleIcon className="h-4 w-4 mr-1" />
                          Error Handling ({summary.error_handling_issues})
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <CardContent>
                <ScrollArea className="max-h-[800px] pr-4">
                  {filteredImprovements.length > 0 ? (
                    <div>
                      {filteredImprovements.map((improvement, index) => (
                        <ImprovementSuggestion 
                          key={index}
                          improvement={improvement}
                          onApply={() => handleApplyImprovement(index)}
                          isApplied={appliedImprovements.has(index)}
                          onToggleView={() => toggleImprovementView(index)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-6">
                      {isLoading ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Analyzing your code...</p>
                      ) : (
                        <>
                          <InfoIcon className="h-12 w-12 text-gray-400 mb-3" />
                          <h3 className="font-medium mb-1">No Suggestions Yet</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter your code and click "Optimize Code" to receive optimization suggestions.
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
            
            {/* Optimization tips */}
            <Card>
              <CardHeader>
                <CardTitle>Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <ZapIcon className="h-4 w-4 mr-2 text-yellow-500" />
                        Performance Tips
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pl-6 text-sm">
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Use appropriate data structures for your operations</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Consider time and space complexity tradeoffs</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Avoid nested loops where possible</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <BookOpenIcon className="h-4 w-4 mr-2 text-blue-500" />
                        Readability Tips
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pl-6 text-sm">
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Use meaningful variable and function names</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Keep functions small and focused on a single task</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Add comments for complex logic, but let code speak for itself</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <ShieldCheckIcon className="h-4 w-4 mr-2 text-green-500" />
                        Best Practices
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pl-6 text-sm">
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Follow language-specific conventions and style guides</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Minimize state mutations and side effects</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Use immutable data patterns where appropriate</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <AlertTriangleIcon className="h-4 w-4 mr-2 text-red-500" />
                        Error Handling
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pl-6 text-sm">
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Add input validation for functions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Use try-catch blocks for error-prone operations</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Handle edge cases explicitly</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Optimization;
