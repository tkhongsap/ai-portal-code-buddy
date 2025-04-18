import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, BarChartIcon, CodeIcon, MessageSquareIcon, ClockIcon, 
  TargetIcon, FilterIcon, DownloadIcon, PlusIcon, CheckCircleIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { UserGoal } from '@shared/schema';
import { 
  getDashboardActivity, 
  getLanguageDistribution, 
  getUserGoals,
  createUserGoal,
  updateUserGoal,
  deleteUserGoal,
  exportDashboardData,
  ActivityStats,
  DashboardActivityResponse 
} from '@/lib/api';

// Chart colors
const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];

type TimeframeOption = 'day' | 'week' | 'month' | 'year';

// Stats card component
const StatCard = ({ title, value, change, icon, changeType = 'positive' }: { 
  title: string; 
  value: string; 
  change: string; 
  icon: React.ReactNode;
  changeType?: 'positive' | 'negative' | 'neutral'; 
}) => {
  const changeColor = 
    changeType === 'positive' ? 'text-green-500' : 
    changeType === 'negative' ? 'text-red-500' : 
    'text-gray-500';
  
  const ChangeIcon = changeType === 'positive' ? ArrowUpIcon : changeType === 'negative' ? ArrowDownIcon : null;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <div className={`flex items-center mt-1 ${changeColor}`}>
              {ChangeIcon && <ChangeIcon className="h-4 w-4 mr-1" />}
              <span className="text-sm">{change}</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Goal card component
const GoalCard = ({ 
  goal, 
  onUpdate, 
  onDelete 
}: { 
  goal: UserGoal; 
  onUpdate: (id: number, data: Partial<UserGoal>) => void; 
  onDelete: (id: number) => void; 
}) => {
  const progress = Math.min(Math.round((goal.currentValue / goal.targetValue) * 100), 100);
  const isCompleted = goal.completed || progress >= 100;
  const deadline = goal.deadline ? new Date(goal.deadline) : null;
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'performance': return 'bg-orange-500';
      case 'readability': return 'bg-blue-500';
      case 'best_practices': return 'bg-green-500';
      case 'error_handling': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const handleToggleComplete = () => {
    onUpdate(goal.id, { completed: !goal.completed });
  };

  return (
    <Card className={isCompleted ? 'opacity-75' : ''}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className={`${getCategoryColor(goal.category)}`}>{goal.category}</Badge>
              {isCompleted && <Badge variant="outline" className="bg-green-100 dark:bg-green-900">Completed</Badge>}
            </div>
            <CardTitle className={isCompleted ? 'line-through text-gray-500' : ''}>{goal.title}</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" onClick={handleToggleComplete}>
              <CheckCircleIcon size={18} className={isCompleted ? 'text-green-500' : 'text-gray-400'} />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => onDelete(goal.id)}>
              <TrashIcon size={18} className="text-red-500" />
            </Button>
          </div>
        </div>
        {goal.description && (
          <CardDescription>{goal.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Current: {goal.currentValue}</span>
            <span>Target: {goal.targetValue}</span>
          </div>
        </div>
      </CardContent>
      {deadline && (
        <CardFooter className="pt-0">
          <p className="text-xs text-gray-500">
            Deadline: {format(deadline, 'MMM d, yyyy')}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

// Activity item component
const ActivityItem = ({ 
  type, 
  language, 
  date 
}: { 
  type: string; 
  language?: string | null; 
  date: Date; 
}) => {
  const getIcon = () => {
    switch(type) {
      case 'chat': return <MessageSquareIcon size={16} className="text-blue-500" />;
      case 'optimize': return <CodeIcon size={16} className="text-orange-500" />;
      case 'score': return <BarChartIcon size={16} className="text-green-500" />;
      default: return <ClockIcon size={16} className="text-gray-500" />;
    }
  };
  
  const getTitle = () => {
    switch(type) {
      case 'chat': return 'Chat session';
      case 'optimize': return 'Code optimization';
      case 'score': return 'Code quality check';
      default: return 'Activity';
    }
  };
  
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        {getIcon()}
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium">{getTitle()}</p>
        {language && <p className="text-xs text-gray-500">{language}</p>}
      </div>
      <div className="text-xs text-gray-500">
        {format(date, 'MMM d, h:mm a')}
      </div>
    </div>
  );
};

// Add Goal dialog component
const AddGoalDialog = ({
  onAddGoal
}: {
  onAddGoal: (goal: Omit<UserGoal, 'id' | 'userId' | 'createdAt'>) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('');
  const [targetValue, setTargetValue] = useState<number>(100);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [deadline, setDeadline] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddGoal({
      title,
      description,
      category,
      targetValue,
      currentValue,
      deadline: deadline ? deadline : null,
      completed: false
    });
    setOpen(false);
    resetForm();
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setTargetValue(100);
    setCurrentValue(0);
    setDeadline('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={16} />
          <span>Add Goal</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
            <DialogDescription>
              Create a new goal to track your coding progress.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">Title *</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter goal title"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter goal description"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium">Category *</label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="readability">Readability</SelectItem>
                  <SelectItem value="best_practices">Best Practices</SelectItem>
                  <SelectItem value="error_handling">Error Handling</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="targetValue" className="text-sm font-medium">Target Value *</label>
                <Input
                  id="targetValue"
                  type="number"
                  min={1}
                  value={targetValue}
                  onChange={(e) => setTargetValue(parseInt(e.target.value) || 0)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="currentValue" className="text-sm font-medium">Current Value</label>
                <Input
                  id="currentValue"
                  type="number"
                  min={0}
                  value={currentValue}
                  onChange={(e) => setCurrentValue(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="deadline" className="text-sm font-medium">Deadline</label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} type="button" variant="outline">Cancel</Button>
            <Button type="submit">Create Goal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Main Dashboard component
const Dashboard = () => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('week');
  
  // Fetch dashboard activity data
  const { 
    data: activityData,
    isLoading: isLoadingActivity,
    isError: isActivityError,
    refetch: refetchActivity
  } = useQuery({
    queryKey: ['/api/dashboard/activity', timeframe],
    queryFn: () => getDashboardActivity(timeframe),
  });
  
  // Fetch language distribution data
  const { 
    data: languageData,
    isLoading: isLoadingLanguages,
    isError: isLanguageError
  } = useQuery({
    queryKey: ['/api/dashboard/languages', timeframe],
    queryFn: () => getLanguageDistribution(timeframe),
  });
  
  // Fetch user goals
  const { 
    data: goals,
    isLoading: isLoadingGoals,
    isError: isGoalsError,
    refetch: refetchGoals
  } = useQuery({
    queryKey: ['/api/goals'],
    queryFn: () => getUserGoals(),
  });

  // Generate daily activity data for bar chart
  const generateActivityData = (stats?: ActivityStats) => {
    if (!stats) return [];
    
    // Get days of the week for display
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const dayIndex = today.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Generate 7 days data (for the past week)
    return days.map((day, index) => {
      // Adjust index to start from today and go back 7 days
      const adjustedIndex = (index + dayIndex + 1) % 7;
      // Random count between 0-15 for each day (could be replaced with real data)
      const count = Math.floor(Math.random() * 16);
      return { day: days[adjustedIndex], count };
    });
  };
  
  // Format language distribution data for pie chart
  const formatLanguageData = () => {
    if (!languageData?.languageDistribution) return [];
    
    return Object.entries(languageData.languageDistribution).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize language name
      value
    }));
  };
  
  // Format feature usage data for pie chart
  const formatFeatureUsageData = (stats?: ActivityStats) => {
    if (!stats?.activitiesByType) return [];
    
    const typeMapping: Record<string, string> = {
      'chat': 'Chat Assistant',
      'optimize': 'Code Optimization',
      'score': 'Code Scoring'
    };
    
    return Object.entries(stats.activitiesByType).map(([type, value]) => ({
      name: typeMapping[type] || type,
      value
    }));
  };
  
  // Handle adding a new goal
  const handleAddGoal = async (newGoal: Omit<UserGoal, 'id' | 'userId' | 'createdAt'>) => {
    try {
      await createUserGoal(newGoal);
      refetchGoals();
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };
  
  // Handle updating a goal
  const handleUpdateGoal = async (id: number, data: Partial<UserGoal>) => {
    try {
      await updateUserGoal(id, data);
      refetchGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };
  
  // Handle deleting a goal
  const handleDeleteGoal = async (id: number) => {
    try {
      await deleteUserGoal(id);
      refetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };
  
  // Handle exporting dashboard data
  const handleExportData = () => {
    exportDashboardData(timeframe);
  };
  
  const activeGoals = goals?.filter(goal => !goal.completed) || [];
  const completedGoals = goals?.filter(goal => goal.completed) || [];
  const dailyActivityData = generateActivityData(activityData?.stats);
  const languagePieData = formatLanguageData();
  const featureUsagePieData = formatFeatureUsageData(activityData?.stats);
  
  // Get improvement metrics based on sample data
  const codeMetrics = {
    readability: { value: 75, change: 15, positive: true },
    performance: { value: 60, change: 8, positive: true },
    errorHandling: { value: 45, change: 5, positive: false },
    organization: { value: 82, change: 12, positive: true }
  };
  
  // Helper to determine if we have valid data to show
  const hasActivityData = !isLoadingActivity && !isActivityError && activityData;
  const hasLanguageData = !isLoadingLanguages && !isLanguageError && languageData;
  const hasGoalsData = !isLoadingGoals && !isGoalsError && goals;
  
  return (
    <div className="flex-1 overflow-auto scrollbar p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
            <p className="text-cb-text-low">
              Track your coding activity and progress.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <Select value={timeframe} onValueChange={(value) => setTimeframe(value as TimeframeOption)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={handleExportData} className="gap-2">
              <DownloadIcon size={16} />
              <span>Export</span>
            </Button>
          </div>
        </header>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Activities" 
            value={hasActivityData ? activityData.stats.totalActivities.toString() : '0'} 
            change={`Last ${timeframe}`} 
            icon={<MessageSquareIcon size={24} />} 
            changeType="neutral" 
          />
          
          <StatCard 
            title="Code Optimizations" 
            value={hasActivityData ? (activityData.stats.activitiesByType?.optimize || 0).toString() : '0'} 
            change={`Last ${timeframe}`} 
            icon={<CodeIcon size={24} />} 
            changeType="neutral" 
          />
          
          <StatCard 
            title="Average Code Score" 
            value="72/100" 
            change="↓ 3% from last week" 
            icon={<BarChartIcon size={24} />} 
            changeType="negative" 
          />
          
          <StatCard 
            title="Active Goals" 
            value={activeGoals.length.toString()} 
            change={`${completedGoals.length} completed`} 
            icon={<TargetIcon size={24} />} 
            changeType="positive" 
          />
        </div>
        
        {/* Activity Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>Number of interactions over time</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyActivityData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'var(--background)', 
                        border: '1px solid var(--border)' 
                      }}
                    />
                    <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Languages Used</CardTitle>
              <CardDescription>Distribution by programming language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {hasLanguageData && languagePieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={languagePieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {languagePieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          background: 'var(--background)', 
                          border: '1px solid var(--border)' 
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-cb-text-low">No language data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Goals and Feature Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Your Goals</CardTitle>
                <CardDescription>Track your coding objectives</CardDescription>
              </div>
              <AddGoalDialog onAddGoal={handleAddGoal} />
            </CardHeader>
            <CardContent>
              {isLoadingGoals ? (
                <div className="py-8 text-center">
                  <p className="text-cb-text-low">Loading goals...</p>
                </div>
              ) : activeGoals.length > 0 ? (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {activeGoals.map(goal => (
                    <GoalCard 
                      key={goal.id} 
                      goal={goal} 
                      onUpdate={handleUpdateGoal} 
                      onDelete={handleDeleteGoal} 
                    />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-cb-text-low">No active goals. Add your first goal!</p>
                </div>
              )}
            </CardContent>
            {completedGoals.length > 0 && (
              <CardFooter className="flex flex-col items-start pt-0">
                <p className="text-sm font-medium mb-2">Completed Goals ({completedGoals.length})</p>
                <div className="space-y-1 w-full">
                  {completedGoals.slice(0, 3).map(goal => (
                    <div key={goal.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 line-through">{goal.title}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0" 
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        <TrashIcon size={14} className="text-gray-400" />
                      </Button>
                    </div>
                  ))}
                  {completedGoals.length > 3 && (
                    <p className="text-xs text-gray-500">
                      +{completedGoals.length - 3} more completed goals
                    </p>
                  )}
                </div>
              </CardFooter>
            )}
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Feature Usage</CardTitle>
              <CardDescription>Which features you use the most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                {hasActivityData && featureUsagePieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={featureUsagePieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {featureUsagePieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          background: 'var(--background)', 
                          border: '1px solid var(--border)' 
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-cb-text-low">No feature usage data available</p>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {hasActivityData && activityData.recentActivities.length > 0 ? (
                <div className="space-y-1 max-h-[200px] overflow-y-auto">
                  {activityData.recentActivities.slice(0, 5).map((activity) => {
                    // Handle the createdAt date safely
                    const activityDate = activity.createdAt 
                      ? (typeof activity.createdAt === 'string' 
                          ? new Date(activity.createdAt) 
                          : activity.createdAt)
                      : new Date();
                      
                    return (
                      <ActivityItem 
                        key={activity.id}
                        type={activity.actionType}
                        language={activity.language}
                        date={activityDate}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="py-4 text-center">
                  <p className="text-gray-500">No recent activities</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Code Quality Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Code Quality Metrics</CardTitle>
            <CardDescription>Progress in your code quality across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="week">
              <TabsList className="mb-4">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              
              <TabsContent value="week" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Code Readability</span>
                        <span className="text-sm text-green-500">↑ {codeMetrics.readability.change}%</span>
                      </div>
                      <Progress value={codeMetrics.readability.value} className="h-2" />
                      <p className="text-xs text-gray-500">
                        Your code readability has improved through better variable naming and consistent formatting.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Performance Optimization</span>
                        <span className="text-sm text-green-500">↑ {codeMetrics.performance.change}%</span>
                      </div>
                      <Progress value={codeMetrics.performance.value} className="h-2" />
                      <p className="text-xs text-gray-500">
                        Your code performance has improved with better algorithms and reduced complexity.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Error Handling</span>
                        <span className="text-sm text-red-500">↓ {codeMetrics.errorHandling.change}%</span>
                      </div>
                      <Progress value={codeMetrics.errorHandling.value} className="h-2" />
                      <p className="text-xs text-gray-500">
                        Your error handling could use improvement. Consider adding more robust error handling patterns.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Code Organization</span>
                        <span className="text-sm text-green-500">↑ {codeMetrics.organization.change}%</span>
                      </div>
                      <Progress value={codeMetrics.organization.value} className="h-2" />
                      <p className="text-xs text-gray-500">
                        Your code organization has improved with better module structure and separation of concerns.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Alert>
                  <AlertDescription>
                    <p className="text-sm">
                      <strong>Recommendation:</strong> Focus on improving your error handling practices to prevent potential issues in production.
                    </p>
                  </AlertDescription>
                </Alert>
              </TabsContent>
              
              <TabsContent value="month">
                <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
                  Monthly data coming soon. We need more data to generate accurate monthly trends.
                </p>
              </TabsContent>
              
              <TabsContent value="year">
                <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
                  Yearly data coming soon. We need more data to generate accurate yearly trends.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
