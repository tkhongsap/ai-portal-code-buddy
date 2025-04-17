import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon, ArrowRightIcon, CheckIcon, XIcon } from 'lucide-react';
import CodeEditor from '@/components/code-editor';
import CodeDisplay from '@/components/code-display';
import { optimizeCode } from '@/lib/api';

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

const Optimization = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [optimizedCode, setOptimizedCode] = useState('');
  const [improvements, setImprovements] = useState<{ title: string; description: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleOptimize = async () => {
    if (!code.trim()) {
      setError('Please enter some code to optimize');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await optimizeCode(code, language);
      
      setOptimizedCode(result.optimized);
      setImprovements(result.improvements);
    } catch (err) {
      console.error('Error optimizing code:', err);
      setError('Failed to optimize code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClearAll = () => {
    setCode('');
    setOptimizedCode('');
    setImprovements([]);
    setError(null);
  };
  
  const applyOptimizedCode = () => {
    if (optimizedCode) {
      setCode(optimizedCode);
      setOptimizedCode('');
      setImprovements([]);
    }
  };
  
  return (
    <div className="flex-1 overflow-auto scrollbar p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Code Optimization</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Improve your code's performance, readability, and adherence to best practices.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Input Code</CardTitle>
                <CardDescription>
                  Enter your code and select the language for optimization analysis.
                </CardDescription>
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
                />
                
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={handleClearAll}>Clear</Button>
                <Button onClick={handleOptimize} disabled={isLoading}>
                  {isLoading ? 'Optimizing...' : 'Optimize Code'}
                </Button>
              </CardFooter>
            </Card>
            
            {optimizedCode && (
              <Card>
                <CardHeader>
                  <CardTitle>Optimized Code</CardTitle>
                  <CardDescription>
                    Review and compare the optimized version of your code.
                  </CardDescription>
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
                        onCopy={() => {}}
                      />
                    </TabsContent>
                    
                    <TabsContent value="diff">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Original Code</h3>
                          <div className="code-font text-sm bg-[#F7F7F7] dark:bg-[#2A2A2A] p-3 rounded-md overflow-auto">
                            <pre className="text-gray-800 dark:text-gray-200">{code}</pre>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-2">Optimized Code</h3>
                          <div className="code-font text-sm bg-[#F7F7F7] dark:bg-[#2A2A2A] p-3 rounded-md overflow-auto">
                            <pre className="text-gray-800 dark:text-gray-200">{optimizedCode}</pre>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button onClick={applyOptimizedCode}>
                    Apply Optimized Code
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Optimization Analysis</CardTitle>
                <CardDescription>
                  Key improvements and recommendations for your code.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {improvements.length > 0 ? (
                  <ul className="space-y-4">
                    {improvements.map((improvement, index) => (
                      <li key={index} className="border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium text-sm mb-1">{improvement.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{improvement.description}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-6">
                    {isLoading ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400">Analyzing your code...</p>
                    ) : (
                      <>
                        <InfoIcon className="h-12 w-12 text-gray-400 mb-3" />
                        <h3 className="font-medium mb-1">No Analysis Yet</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Enter your code and click "Optimize Code" to receive optimization suggestions.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Keep functions small and focused on a single task</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Minimize state mutations and side effects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Use appropriate data structures for operations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Consider time and space complexity tradeoffs</span>
                    </li>
                    <li className="flex items-start">
                      <XIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Avoid premature optimization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Optimization;
