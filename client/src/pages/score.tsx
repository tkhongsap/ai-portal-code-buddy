import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertCircle, InfoIcon } from 'lucide-react';
import CodeEditor from '@/components/code-editor';
import { scoreCode, saveCodeSnippet } from '@/lib/api';

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

const Score = () => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    feedback: {
      strengths: string[];
      weaknesses: string[];
      suggestions: string[];
    };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleScore = async () => {
    if (!code.trim()) {
      setError('Please enter some code to score');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      setSaveSuccess(false);
      
      const result = await scoreCode(code, language);
      setScoreResult(result);
      
      // Generate title from code if not provided
      if (!title) {
        const firstLine = code.split('\n')[0];
        setTitle(firstLine.slice(0, 40) + (firstLine.length > 40 ? '...' : ''));
      }
    } catch (err) {
      console.error('Error scoring code:', err);
      setError('Failed to score code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSave = async () => {
    if (!scoreResult) return;
    
    try {
      await saveCodeSnippet({
        userId: 1, // Use actual user ID in production
        title: title || 'Untitled Code Snippet',
        code,
        language,
        score: scoreResult.score,
        feedback: scoreResult.feedback
      });
      
      setSaveSuccess(true);
      
      // Reset success message after a delay
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error saving code snippet:', err);
      setError('Failed to save code snippet. Please try again.');
    }
  };
  
  const handleClear = () => {
    setCode('');
    setTitle('');
    setScoreResult(null);
    setError(null);
    setSaveSuccess(false);
  };
  
  // Helper function to get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Helper function to get progress color
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="flex-1 overflow-auto scrollbar p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Score Your Code</h1>
          <p className="text-cb-text-low">
            Evaluate your code against industry standards and get detailed feedback.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Code</CardTitle>
                <CardDescription>
                  Enter your code and select the language for quality assessment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid gap-4 grid-cols-1 md:grid-cols-4">
                  <div className="col-span-1 md:col-span-3">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title (optional)"
                      className="w-full p-2 border rounded-md text-sm bg-transparent"
                    />
                  </div>
                  <div>
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
                
                {saveSuccess && (
                  <Alert className="mt-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <AlertDescription>Code snippet saved successfully!</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={handleClear}>Clear</Button>
                <Button onClick={handleScore} disabled={isLoading}>
                  {isLoading ? 'Analyzing...' : 'Score Code'}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Code Quality Score</CardTitle>
                <CardDescription>
                  Assessment based on industry standards and best practices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {scoreResult ? (
                  <>
                    <div className="text-center mb-6">
                      <div className={`text-6xl font-bold ${getScoreColor(scoreResult.score)}`}>
                        {scoreResult.score}
                      </div>
                      <p className="text-sm text-cb-text-low mt-2">out of 100</p>
                      <Progress 
                        value={scoreResult.score} 
                        className={`h-2 mt-4 ${getProgressColor(scoreResult.score)}`} 
                      />
                    </div>
                    
                    <Tabs defaultValue="strengths">
                      <TabsList className="w-full grid grid-cols-3">
                        <TabsTrigger value="strengths">Strengths</TabsTrigger>
                        <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
                        <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                      </TabsList>
                      <div className="mt-4">
                        <TabsContent value="strengths">
                          <ul className="space-y-2">
                            {scoreResult.feedback.strengths.length > 0 ? (
                              scoreResult.feedback.strengths.map((strength, i) => (
                                <li key={i} className="flex items-start text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                  <span>{strength}</span>
                                </li>
                              ))
                            ) : (
                              <li className="text-cb-text-low text-sm">No strengths identified.</li>
                            )}
                          </ul>
                        </TabsContent>
                        <TabsContent value="weaknesses">
                          <ul className="space-y-2">
                            {scoreResult.feedback.weaknesses.length > 0 ? (
                              scoreResult.feedback.weaknesses.map((weakness, i) => (
                                <li key={i} className="flex items-start text-sm">
                                  <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                  <span>{weakness}</span>
                                </li>
                              ))
                            ) : (
                              <li className="text-cb-text-low text-sm">No weaknesses identified.</li>
                            )}
                          </ul>
                        </TabsContent>
                        <TabsContent value="suggestions">
                          <ul className="space-y-2">
                            {scoreResult.feedback.suggestions.length > 0 ? (
                              scoreResult.feedback.suggestions.map((suggestion, i) => (
                                <li key={i} className="flex items-start text-sm">
                                  <AlertCircle className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                                  <span>{suggestion}</span>
                                </li>
                              ))
                            ) : (
                              <li className="text-cb-text-low text-sm">No suggestions available.</li>
                            )}
                          </ul>
                        </TabsContent>
                      </div>
                    </Tabs>
                    
                    <Button className="w-full mt-6" onClick={handleSave}>
                      Save This Assessment
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-10">
                    {isLoading ? (
                      <p className="text-sm text-cb-text-low">Analyzing your code...</p>
                    ) : (
                      <>
                        <InfoIcon className="h-12 w-12 text-gray-400 mb-3" />
                        <h3 className="font-medium mb-1">No Score Yet</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Enter your code and click "Score Code" to receive a quality assessment.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
