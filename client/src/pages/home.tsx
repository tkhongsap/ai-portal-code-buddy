import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, MessageSquareIcon, CodeIcon, BarChartIcon, BookmarkIcon } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import CodeDisplay from '@/components/code-display';

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  linkText, 
  linkHref, 
  color 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  linkText: string; 
  linkHref: string; 
  color: string;
}) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow bg-surface-100 text-cb-text-high">
    <div className={`h-2 ${color}`}></div>
    <CardContent className="p-5">
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-lg ${color.replace('bg-', 'bg-opacity-10 text-')} flex items-center justify-center mr-3`}>
          {icon}
        </div>
        <h3 className="font-semibold text-cb-text-high">{title}</h3>
      </div>
      <p className="text-sm text-cb-text-low mb-4">{description}</p>
      <Link href={linkHref}>
        <div className={`${color.replace('bg-', 'text-')} text-sm font-medium flex items-center cursor-pointer`}>
          {linkText} <ArrowRightIcon className="ml-1" size={16} />
        </div>
      </Link>
    </CardContent>
  </Card>
);

const ActivityItem = ({ 
  icon, 
  title, 
  time, 
  description, 
  tags, 
  iconColor 
}: { 
  icon: React.ReactNode; 
  title: string; 
  time: string; 
  description: string; 
  tags: string[]; 
  iconColor: string;
}) => (
  <div className="p-4 hover:bg-surface-200 transition-colors">
    <div className="flex items-start">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 mt-1">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-medium text-sm text-cb-text-high">{title}</h4>
          <span className="text-xs text-cb-text-high">{time}</span>
        </div>
        <p className="text-sm text-cb-text-high mb-1 line-clamp-1">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const BookmarkItem = ({ title, time, tags }: { title: string; time: string; tags: string[] }) => (
  <div className="p-4 hover:bg-surface-200 transition-colors">
    <h4 className="font-medium text-sm mb-1 text-cb-text-high">{title}</h4>
    <p className="text-xs text-cb-text-high mb-2">Saved {time}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span key={index} className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="flex-1 overflow-auto scrollbar p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-cb-text-high">Home</h1>
          <p className="text-cb-text-low">
            Welcome back! Get coding assistance, optimize your code, and improve your skills.
          </p>
        </header>
        
        {/* Featured Tools Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-cb-text-high">Featured Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              title="Chat Assistant"
              description="Ask coding questions and get real-time assistance with your development challenges."
              icon={<MessageSquareIcon size={20} />}
              linkText="Get started"
              linkHref="/chat"
              color="bg-primary"
            />
            
            <FeatureCard
              title="Code Optimization"
              description="Analyze your code and get suggestions to improve performance and readability."
              icon={<CodeIcon size={20} />}
              linkText="Optimize now"
              linkHref="/optimization"
              color="bg-[#00C2FF]"
            />
            
            <FeatureCard
              title="Score Your Code"
              description="Get your code evaluated against industry standards and receive feedback."
              icon={<BarChartIcon size={20} />}
              linkText="Start assessment"
              linkHref="/score"
              color="bg-green-500"
            />
          </div>
        </section>
        
        {/* Recent Activity Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-cb-text-high">Recent Activity</h2>
            <Link href="/history">
              <div className="text-primary text-sm font-medium cursor-pointer">View all</div>
            </Link>
          </div>
          
          <Card className="bg-surface-100">
            <CardContent className="p-0">
              <div className="divide-y divide-cb-line">
                <div className="p-4 hover:bg-surface-200 transition-colors">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 mt-1">
                      <MessageSquareIcon size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm text-cb-text-high">React useEffect optimization question</h4>
                        <span className="text-xs text-cb-text-high">2h ago</span>
                      </div>
                      <p className="text-sm text-cb-text-high mb-1 line-clamp-1">How can I prevent unnecessary re-renders with useEffect?</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">React</span>
                        <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">Hooks</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 hover:bg-surface-200 transition-colors">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 mt-1">
                      <CodeIcon size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm text-cb-text-high">Array manipulation function optimized</h4>
                        <span className="text-xs text-cb-text-high">1d ago</span>
                      </div>
                      <p className="text-sm text-cb-text-high mb-1 line-clamp-1">Reduced time complexity from O(n²) to O(n log n)</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">JavaScript</span>
                        <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">Performance</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 hover:bg-surface-200 transition-colors">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 mt-1">
                      <BarChartIcon size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm text-cb-text-high">SQL query assessment</h4>
                        <span className="text-xs text-cb-text-high">3d ago</span>
                      </div>
                      <p className="text-sm text-cb-text-high mb-1 line-clamp-1">Score: 85/100 - Suggestions for indexing and query structure</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">SQL</span>
                        <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">Database</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Developer Tips and Bookmarks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Developer Tips */}
          <section className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-cb-text-high">Developer Tips</h2>
            <Card className="p-5 bg-surface-100">
              <h3 className="font-semibold mb-3 text-cb-text-high">Modern React State Management</h3>
              <p className="text-sm text-cb-text-low mb-4">
                React's state management ecosystem has evolved significantly. Here are the current best practices for different application sizes:
              </p>
              
              <CodeDisplay 
                code={`// For small to medium applications
const [state, setState] = useState(initialState);

// For complex state logic
const [state, dispatch] = useReducer(reducer, initialState);

// For global state management
const SomeContext = createContext();`} 
                language="javascript"
                onCopy={() => {}}
              />
              
              <p className="text-sm text-cb-text-low my-4">
                Consider these factors when choosing your state management approach:
              </p>
              
              <ul className="text-sm text-cb-text-low space-y-2 mb-4 list-disc pl-5">
                <li>Application size and complexity</li>
                <li>Team size and experience</li>
                <li>Performance requirements</li>
                <li>Need for server state vs client state</li>
              </ul>
              
              <Button variant="link" className="text-primary text-sm font-medium p-0 h-auto">
                Learn more about React state management <ArrowRightIcon className="ml-1" size={16} />
              </Button>
            </Card>
          </section>
          
          {/* Bookmarks */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-cb-text-high">Bookmarks</h2>
              <Link href="/bookmarks">
                <div className="text-primary text-sm font-medium cursor-pointer">View all</div>
              </Link>
            </div>
            
            <Card className="bg-surface-100">
              <CardContent className="p-0">
                <div className="divide-y divide-cb-line">
                  <div className="p-4 hover:bg-surface-200 transition-colors">
                    <h4 className="font-medium text-sm mb-1 text-cb-text-high">Optimizing API calls with React Query</h4>
                    <p className="text-xs text-cb-text-high mb-2">Saved 5 days ago</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">React</span>
                      <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">API</span>
                    </div>
                  </div>
                  
                  <div className="p-4 hover:bg-surface-200 transition-colors">
                    <h4 className="font-medium text-sm mb-1 text-cb-text-high">TypeScript interface vs type alias</h4>
                    <p className="text-xs text-cb-text-high mb-2">Saved 1 week ago</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">TypeScript</span>
                    </div>
                  </div>
                  
                  <div className="p-4 hover:bg-surface-200 transition-colors">
                    <h4 className="font-medium text-sm mb-1 text-cb-text-high">CSS Grid vs Flexbox decision tree</h4>
                    <p className="text-xs text-cb-text-high mb-2">Saved 2 weeks ago</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">CSS</span>
                      <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary font-medium">Layout</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
