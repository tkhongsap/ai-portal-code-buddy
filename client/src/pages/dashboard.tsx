import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, BarChartIcon, CodeIcon, MessageSquareIcon, ClockIcon } from 'lucide-react';

// Sample data - in production this would come from an API
const activityData = [
  { day: 'Mon', count: 4 },
  { day: 'Tue', count: 7 },
  { day: 'Wed', count: 5 },
  { day: 'Thu', count: 8 },
  { day: 'Fri', count: 12 },
  { day: 'Sat', count: 3 },
  { day: 'Sun', count: 2 },
];

const languageData = [
  { name: 'JavaScript', value: 45 },
  { name: 'TypeScript', value: 20 },
  { name: 'Python', value: 15 },
  { name: 'Java', value: 10 },
  { name: 'Other', value: 10 },
];

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];

const featureUsageData = [
  { name: 'Chat Assistant', value: 65 },
  { name: 'Code Optimization', value: 20 },
  { name: 'Score Your Code', value: 15 },
];

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

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-auto scrollbar p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your coding activity and progress.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Queries" 
            value="134" 
            change="↑ 12% from last week" 
            icon={<MessageSquareIcon size={24} />} 
            changeType="positive" 
          />
          
          <StatCard 
            title="Code Optimizations" 
            value="28" 
            change="↑ 8% from last week" 
            icon={<CodeIcon size={24} />} 
            changeType="positive" 
          />
          
          <StatCard 
            title="Average Code Score" 
            value="72/100" 
            change="↓ 3% from last week" 
            icon={<BarChartIcon size={24} />} 
            changeType="negative" 
          />
          
          <StatCard 
            title="Active Time" 
            value="8.5 hrs" 
            change="Same as last week" 
            icon={<ClockIcon size={24} />} 
            changeType="neutral" 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Number of interactions over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
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
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {languageData.map((entry, index) => (
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
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Usage</CardTitle>
              <CardDescription>Which features you use the most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={featureUsageData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {featureUsageData.map((entry, index) => (
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
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Improvements</CardTitle>
              <CardDescription>Progress in your code quality</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="week">
                <TabsList className="mb-4">
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                
                <TabsContent value="week" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Code Readability</span>
                      <span className="text-sm text-green-500">↑ 15%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded">
                      <div className="h-2 bg-green-500 rounded" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Performance Optimization</span>
                      <span className="text-sm text-green-500">↑ 8%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded">
                      <div className="h-2 bg-green-500 rounded" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Error Handling</span>
                      <span className="text-sm text-red-500">↓ 5%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded">
                      <div className="h-2 bg-yellow-500 rounded" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Code Organization</span>
                      <span className="text-sm text-green-500">↑ 12%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded">
                      <div className="h-2 bg-green-500 rounded" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="month">
                  <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
                    Monthly data coming soon
                  </p>
                </TabsContent>
                
                <TabsContent value="year">
                  <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
                    Yearly data coming soon
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
