# Dashboard - Feature PRD

## Overview

### Feature Description
The Dashboard feature provides users with a centralized view of their Code Buddy activity, performance metrics, and usage statistics. It offers visual representations of code optimization results, chat interactions, and system usage patterns to help developers track their progress, identify trends, and make data-driven decisions about their coding practices. The Dashboard serves as a personal analytics center that quantifies the value and impact of using Code Buddy.

### Purpose and Goals
- Provide users with meaningful insights into their Code Buddy usage patterns
- Visualize code quality improvements and optimization metrics over time
- Track productivity gains from AI-assisted development
- Highlight learning opportunities based on common issues and questions
- Enable users to set goals and monitor progress toward better coding practices
- Create a personalized experience that demonstrates the value of the platform

### User Value Proposition
The Dashboard enhances the developer experience by:
- Quantifying productivity improvements and time savings
- Providing objective metrics on code quality enhancements
- Identifying recurring issues that may require focused attention
- Tracking learning progress across different programming languages and concepts
- Offering a motivational tool to encourage continued improvement
- Delivering personalized insights that become more valuable over time

### Scope
This PRD covers the Dashboard feature of the Code Buddy application, including:
- Main dashboard layout and components
- Performance metrics and visualizations
- Activity tracking and history
- Code quality analytics
- Usage statistics
- Goal setting and progress tracking
- Responsive design considerations

## User Stories

### Primary User Stories
1. As a developer, I want to see metrics about my code quality improvements so I can quantify the value of using Code Buddy.
2. As a developer, I want to track my most common code issues so I can focus on improving specific areas of my coding practices.
3. As a developer, I want to visualize my usage patterns over time so I can understand how I'm leveraging the platform.
4. As a developer, I want to set goals for code quality and track my progress so I can continuously improve my skills.
5. As a developer, I want to see statistics about my chat interactions so I can optimize my use of the AI assistant.
6. As a developer, I want to compare my current metrics with historical data so I can track my improvement over time.

### Edge Cases
1. As a new user with limited history, I want to see meaningful initial dashboard content that encourages continued use.
2. As a power user with extensive history, I want the dashboard to handle large datasets without performance issues.
3. As a user who works across multiple programming languages, I want to filter dashboard metrics by language.
4. As a user with accessibility needs, I want all dashboard visualizations to be accessible via screen readers and keyboard navigation.
5. As a user who hasn't used the platform for an extended period, I want to see relevant comparisons that account for gaps in activity.

### User Flow
1. User navigates to the Dashboard feature from the AI Portal Home or sidebar
2. System loads the dashboard with personalized metrics and visualizations
3. User can:
   - View overall performance metrics at the top of the dashboard
   - Explore detailed visualizations in each dashboard card
   - Filter data by time period (day, week, month, year)
   - Filter data by programming language or project
   - Drill down into specific metrics for more detailed analysis
   - Set or update personal goals
   - Export dashboard data or visualizations
4. User can navigate to related features (Chat, Optimize) directly from relevant dashboard cards

## Requirements

### Functional Requirements

#### Dashboard Overview
- FR1.1: Display a summary of key metrics at the top of the dashboard (total optimizations, chat interactions, time saved)
- FR1.2: Provide filtering options for time period (day, week, month, year, custom range)
- FR1.3: Support filtering by programming language and project
- FR1.4: Include a welcome message and quick tips for new users with limited data
- FR1.5: Implement responsive layout that adapts to different screen sizes
- FR1.6: Support both light and dark mode themes

#### Code Quality Metrics
- FR2.1: Display a code quality score trend over the selected time period
- FR2.2: Show breakdown of optimization categories (performance, readability, best practices)
- FR2.3: Visualize most common code issues identified and resolved
- FR2.4: Track improvement rate in each category over time
- FR2.5: Compare current metrics with previous periods (week-over-week, month-over-month)
- FR2.6: Provide language-specific code quality insights when sufficient data is available

#### Activity Tracking
- FR3.1: Display activity calendar showing usage frequency
- FR3.2: Show distribution of activity by feature (Chat, Optimize, etc.)
- FR3.3: Track time spent using different features
- FR3.4: Visualize peak usage times and patterns
- FR3.5: Provide insights on productivity gains and estimated time saved
- FR3.6: Support drilling down into specific days or activities for detailed view

#### Goal Setting and Progress
- FR4.1: Allow users to set personal goals for code quality improvement
- FR4.2: Track progress toward goals with visual indicators
- FR4.3: Provide recommendations for achievable goals based on usage patterns
- FR4.4: Send notifications when goals are achieved
- FR4.5: Support multiple concurrent goals across different metrics
- FR4.6: Allow users to adjust or reset goals as needed

#### Data Export and Sharing
- FR5.1: Enable exporting dashboard data in common formats (CSV, JSON)
- FR5.2: Support downloading visualizations as images
- FR5.3: Allow sharing specific dashboard cards via link
- FR5.4: Provide printable dashboard summary report
- FR5.5: Include data attribution and timestamp in exports

### Technical Requirements
- TR1.1: Implement responsive design that adapts to desktop, tablet, and mobile viewports
- TR1.2: Ensure theme implementation follows the design system color palette for light/dark modes
- TR1.3: Optimize data loading and visualization rendering for performance
- TR1.4: Implement efficient data caching to minimize API requests
- TR1.5: Support real-time updates for active metrics when possible
- TR1.6: Ensure accessibility compliance for all visualizations and interactive elements
- TR1.7: Implement progressive loading for dashboard components to improve perceived performance

### Dependencies
- DE1.1: Authentication system for user identification and data access
- DE1.2: Analytics tracking system for user activity data
- DE1.3: Data visualization libraries for charts and graphs
- DE1.4: API endpoints for retrieving metrics and historical data
- DE1.5: Storage system for user goals and preferences

### Constraints
- CO1.1: Must maintain visual consistency with the overall Code Buddy design system
- CO1.2: Must support all modern browsers (Chrome, Firefox, Safari, Edge)
- CO1.3: Must be fully responsive for screen sizes from 320px to 1440px+
- CO1.4: Must comply with WCAG 2.1 AA accessibility standards
- CO1.5: Must handle limited data gracefully for new users
- CO1.6: Dashboard loading time must not exceed 3 seconds on standard connections

## UI/UX Specifications

### UI Components
1. **Dashboard Header**
   - Title and brief description
   - Time period selector (day, week, month, year, custom)
   - Language/project filter
   - Theme toggle
   - Export/print options

2. **Summary Metrics**
   - Total optimizations performed
   - Total chat interactions
   - Estimated time saved
   - Overall code quality score
   - Quick comparison with previous period

3. **Code Quality Card**
   - Quality score trend chart
   - Category breakdown (performance, readability, best practices)
   - Most common issues identified
   - Improvement rate indicator
   - "View Details" link

4. **Activity Calendar Card**
   - Heatmap calendar showing usage frequency
   - Activity distribution by feature
   - Peak usage times
   - Streak indicators
   - "View Activity Log" link

5. **Language Breakdown Card**
   - Pie/bar chart of language usage
   - Language-specific quality metrics
   - Comparative analysis between languages
   - Filtering options

6. **Time Savings Card**
   - Estimated time saved through AI assistance
   - Productivity gain percentage
   - Historical comparison
   - Methodology explanation

7. **Goals Tracker Card**
   - Current goals with progress indicators
   - Achievement history
   - Goal setting interface
   - Recommended goals

8. **Recent Activity Card**
   - List of recent interactions
   - Quick links to continue work
   - Activity type indicators
   - Timestamp information

### Interaction Design
- Dashboard cards should be collapsible/expandable
- Charts should provide tooltips on hover for detailed data points
- Time period selector should update all dashboard components simultaneously
- Drill-down interactions should be consistent across all metrics
- Goal setting should use intuitive input methods (sliders, dropdowns)
- Responsive layout should reflow cards based on importance and screen size
- Loading states should be clearly indicated with skeleton screens

### Responsive Design Considerations
- **Desktop (1024px+)**
  - Multi-column grid layout with 2-4 cards per row
  - Full-size charts and visualizations
  - Expanded metric details visible by default

- **Tablet (768px - 1023px)**
  - Two-column grid layout
  - Slightly condensed visualizations
  - Some secondary metrics collapsed by default

- **Mobile (320px - 767px)**
  - Single-column layout
  - Simplified visualizations optimized for smaller screens
  - Progressive disclosure of detailed metrics
  - Horizontal scrolling for time-series charts

### Accessibility Requirements
- All charts must include appropriate ARIA labels and text alternatives
- Color schemes must maintain sufficient contrast in both light and dark modes
- Interactive elements must be keyboard navigable
- Critical information should not rely solely on color differentiation
- Screen reader support for all data visualizations
- Focus states must be clearly visible for keyboard navigation
- All functionality must be accessible via keyboard

## Technical Specifications

### Data Models
```typescript
// Dashboard Summary
interface DashboardSummary {
  timeRange: {
    start: Date;
    end: Date;
    preset?: 'day' | 'week' | 'month' | 'year' | 'custom';
  };
  totalOptimizations: number;
  totalChatInteractions: number;
  estimatedTimeSaved: number; // in minutes
  overallCodeQualityScore: number; // 0-100
  comparisonWithPrevious: {
    optimizationsChange: number; // percentage
    chatInteractionsChange: number; // percentage
    timeSavedChange: number; // percentage
    codeQualityChange: number; // percentage
  };
}

// Code Quality Metrics
interface CodeQualityMetrics {
  overallScore: number; // 0-100
  categoryScores: {
    performance: number; // 0-100
    readability: number; // 0-100
    bestPractices: number; // 0-100
  };
  mostCommonIssues: Array<{
    issueType: string;
    count: number;
    category: 'performance' | 'readability' | 'best-practice';
    trend: 'increasing' | 'decreasing' | 'stable';
  }>;
  improvementRates: {
    overall: number; // percentage
    performance: number; // percentage
    readability: number; // percentage
    bestPractices: number; // percentage
  };
  historicalScores: Array<{
    date: Date;
    score: number;
  }>;
}

// Activity Metrics
interface ActivityMetrics {
  dailyActivity: Array<{
    date: Date;
    count: number;
    breakdown: {
      chat: number;
      optimization: number;
      other: number;
    };
  }>;
  featureUsage: {
    chat: number; // percentage
    optimization: number; // percentage
    other: number; // percentage
  };
  timeSpent: {
    total: number; // in minutes
    chat: number; // in minutes
    optimization: number; // in minutes
    other: number; // in minutes
  };
  peakUsageTimes: Array<{
    hour: number; // 0-23
    activity: number;
  }>;
  currentStreak: number; // days
  longestStreak: number; // days
}

// Language Metrics
interface LanguageMetrics {
  languages: Array<{
    name: string;
    percentage: number;
    qualityScore: number; // 0-100
    issueCount: number;
    improvementRate: number; // percentage
  }>;
  primaryLanguage: string;
  languageComparison: Array<{
    language: string;
    metric: string;
    value: number;
    average: number;
  }>;
}

// User Goal
interface UserGoal {
  id: string;
  title: string;
  description: string;
  category: 'quality' | 'activity' | 'learning';
  target: number;
  current: number;
  unit: string;
  startDate: Date;
  targetDate?: Date;
  isCompleted: boolean;
  completedDate?: Date;
}

// Dashboard Preferences
interface DashboardPreferences {
  defaultTimeRange: 'day' | 'week' | 'month' | 'year';
  defaultLanguageFilter: string | null;
  visibleCards: string[]; // IDs of cards to display
  cardOrder: string[]; // IDs of cards in display order
}
```

### API Requirements
1. **Get Dashboard Summary**
   - Endpoint: `GET /api/dashboard/summary`
   - Query Parameters: 
     - `startDate` (ISO date string)
     - `endDate` (ISO date string)
     - `language` (optional)
   - Response: DashboardSummary object

2. **Get Code Quality Metrics**
   - Endpoint: `GET /api/dashboard/quality`
   - Query Parameters: 
     - `startDate` (ISO date string)
     - `endDate` (ISO date string)
     - `language` (optional)
   - Response: CodeQualityMetrics object

3. **Get Activity Metrics**
   - Endpoint: `GET /api/dashboard/activity`
   - Query Parameters: 
     - `startDate` (ISO date string)
     - `endDate` (ISO date string)
   - Response: ActivityMetrics object

4. **Get Language Metrics**
   - Endpoint: `GET /api/dashboard/languages`
   - Query Parameters: 
     - `startDate` (ISO date string)
     - `endDate` (ISO date string)
   - Response: LanguageMetrics object

5. **Get User Goals**
   - Endpoint: `GET /api/dashboard/goals`
   - Response: Array of UserGoal objects

6. **Create User Goal**
   - Endpoint: `POST /api/dashboard/goals`
   - Request Body: UserGoal object (without id)
   - Response: UserGoal object (with id)

7. **Update User Goal**
   - Endpoint: `PUT /api/dashboard/goals/{goalId}`
   - Request Body: Partial UserGoal object
   - Response: Updated UserGoal object

8. **Delete User Goal**
   - Endpoint: `DELETE /api/dashboard/goals/{goalId}`
   - Response: Success confirmation

9. **Get Dashboard Preferences**
   - Endpoint: `GET /api/dashboard/preferences`
   - Response: DashboardPreferences object

10. **Update Dashboard Preferences**
    - Endpoint: `PUT /api/dashboard/preferences`
    - Request Body: Partial DashboardPreferences object
    - Response: Updated DashboardPreferences object

### State Management
The Dashboard feature will use React Context for global state management:

```jsx
// DashboardContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  timeRange: {
    start: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
    end: new Date(),
    preset: 'month'
  },
  languageFilter: null,
  summary: null,
  codeQuality: null,
  activity: null,
  languages: null,
  goals: [],
  preferences: {
    defaultTimeRange: 'month',
    defaultLanguageFilter: null,
    visibleCards: ['summary', 'codeQuality', 'activity', 'languages', 'goals', 'recentActivity'],
    cardOrder: ['summary', 'codeQuality', 'activity', 'languages', 'goals', 'recentActivity']
  },
  loading: {
    summary: false,
    codeQuality: false,
    activity: false,
    languages: false,
    goals: false
  },
  error: null
};

// Action types
const ActionTypes = {
  SET_TIME_RANGE: 'SET_TIME_RANGE',
  SET_LANGUAGE_FILTER: 'SET_LANGUAGE_FILTER',
  SET_SUMMARY: 'SET_SUMMARY',
  SET_CODE_QUALITY: 'SET_CODE_QUALITY',
  SET_ACTIVITY: 'SET_ACTIVITY',
  SET_LANGUAGES: 'SET_LANGUAGES',
  SET_GOALS: 'SET_GOALS',
  ADD_GOAL: 'ADD_GOAL',
  UPDATE_GOAL: 'UPDATE_GOAL',
  REMOVE_GOAL: 'REMOVE_GOAL',
  SET_PREFERENCES: 'SET_PREFERENCES',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// Reducer
const dashboardReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_TIME_RANGE:
      return { ...state, timeRange: action.payload };
    case ActionTypes.SET_LANGUAGE_FILTER:
      return { ...state, languageFilter: action.payload };
    case ActionTypes.SET_SUMMARY:
      return { ...state, summary: action.payload };
    case ActionTypes.SET_CODE_QUALITY:
      return { ...state, codeQuality: action.payload };
    case ActionTypes.SET_ACTIVITY:
      return { ...state, activity: action.payload };
    case ActionTypes.SET_LANGUAGES:
      return { ...state, languages: action.payload };
    case ActionTypes.SET_GOALS:
      return { ...state, goals: action.payload };
    case ActionTypes.ADD_GOAL:
      return { ...state, goals: [...state.goals, action.payload] };
    case ActionTypes.UPDATE_GOAL:
      return {
        ...state,
        goals: state.goals.map(goal => 
          goal.id === action.payload.id ? { ...goal, ...action.payload } : goal
        )
      };
    case ActionTypes.REMOVE_GOAL:
      return {
        ...state,
        goals: state.goals.filter(goal => goal.id !== action.payload)
      };
    case ActionTypes.SET_PREFERENCES:
      return { 
        ...state, 
        preferences: { ...state.preferences, ...action.payload } 
      };
    case ActionTypes.SET_LOADING:
      return { 
        ...state, 
        loading: { ...state.loading, ...action.payload } 
      };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Create context
const DashboardContext = createContext();

// Provider component
export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  
  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook for using the dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Action creators
export const dashboardActions = {
  setTimeRange: (timeRange) => ({
    type: ActionTypes.SET_TIME_RANGE,
    payload: timeRange
  }),
  setLanguageFilter: (language) => ({
    type: ActionTypes.SET_LANGUAGE_FILTER,
    payload: language
  }),
  setSummary: (summary) => ({
    type: ActionTypes.SET_SUMMARY,
    payload: summary
  }),
  setCodeQuality: (codeQuality) => ({
    type: ActionTypes.SET_CODE_QUALITY,
    payload: codeQuality
  }),
  setActivity: (activity) => ({
    type: ActionTypes.SET_ACTIVITY,
    payload: activity
  }),
  setLanguages: (languages) => ({
    type: ActionTypes.SET_LANGUAGES,
    payload: languages
  }),
  setGoals: (goals) => ({
    type: ActionTypes.SET_GOALS,
    payload: goals
  }),
  addGoal: (goal) => ({
    type: ActionTypes.ADD_GOAL,
    payload: goal
  }),
  updateGoal: (goal) => ({
    type: ActionTypes.UPDATE_GOAL,
    payload: goal
  }),
  removeGoal: (goalId) => ({
    type: ActionTypes.REMOVE_GOAL,
    payload: goalId
  }),
  setPreferences: (preferences) => ({
    type: ActionTypes.SET_PREFERENCES,
    payload: preferences
  }),
  setLoading: (loadingState) => ({
    type: ActionTypes.SET_LOADING,
    payload: loadingState
  }),
  setError: (error) => ({
    type: ActionTypes.SET_ERROR,
    payload: error
  })
};
```

### Performance Considerations
1. **Data Loading Optimization**
   - Implement staggered loading of dashboard components
   - Prioritize summary metrics for initial load
   - Use skeleton screens during data loading
   - Cache dashboard data with appropriate TTL

2. **Rendering Efficiency**
   - Use React.memo for pure dashboard card components
   - Implement virtualization for lists with many items
   - Optimize chart rendering with appropriate throttling
   - Minimize unnecessary re-renders with useMemo and useCallback

3. **Data Visualization Performance**
   - Limit data points in time-series charts for mobile devices
   - Use canvas-based charts for better performance with large datasets
   - Implement progressive loading for historical data
   - Consider using web workers for data processing

4. **Responsive Considerations**
   - Adjust chart complexity based on device capabilities
   - Reduce animation complexity on mobile devices
   - Implement efficient media queries for layout changes
   - Use appropriate image sizes for different viewports

## Implementation Guidelines

### Component Structure
```
src/
├── pages/
│   └── Dashboard/
│       ├── index.jsx                 # Main Dashboard page component
│       ├── Dashboard.scss            # Dashboard page styles
│       └── components/               # Dashboard-specific components
│           ├── DashboardHeader.jsx   # Header with filters and controls
│           ├── SummaryMetrics.jsx    # Top-level summary metrics
│           ├── CodeQualityCard.jsx   # Code quality metrics card
│           ├── ActivityCard.jsx      # Activity tracking card
│           ├── LanguagesCard.jsx     # Language breakdown card
│           ├── GoalsCard.jsx         # Goals tracker card
│           ├── TimelineChart.jsx     # Reusable timeline chart
│           ├── MetricCard.jsx        # Base card component
│           └── GoalForm.jsx          # Goal creation/editing form
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx              # Sidebar navigation
│   │   └── Header.jsx               # Application header
│   └── common/
│       ├── Chart.jsx                # Reusable chart component
│       ├── DateRangePicker.jsx      # Date range selection component
│       └── SkeletonLoader.jsx       # Loading state component
└── context/
    └── DashboardContext.jsx         # Dashboard context provider
```

### Code Architecture
The Dashboard feature will follow a component-based architecture with:

1. **Container Components**
   - Manage data fetching and state
   - Connect to API services and context providers
   - Handle business logic for dashboard functionality
   - Examples: Dashboard page, CodeQualityCard, ActivityCard

2. **Presentational Components**
   - Focus on rendering UI based on props
   - Handle local UI state (hover, expand/collapse, etc.)
   - Examples: TimelineChart, SummaryMetrics, MetricCard

3. **Custom Hooks**
   - Extract reusable logic into custom hooks
   - Examples: `useDashboardData`, `useTimeRange`, `useChartData`

### Reusable Components
1. **Metric Card Component**
```jsx
import React, { useState } from 'react';
import './MetricCard.scss';

const MetricCard = ({ 
  title, 
  children, 
  isLoading = false,
  onRefresh = null,
  className = '',
  collapsible = true
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };
  
  return (
    <div className={`metric-card ${className} ${isCollapsed ? 'metric-card--collapsed' : ''}`}>
      <div className="metric-card__header">
        <h3 className="metric-card__title">{title}</h3>
        
        <div className="metric-card__actions">
          {onRefresh && (
            <button 
              className="metric-card__refresh" 
              onClick={onRefresh}
              disabled={isLoading}
              aria-label="Refresh data"
            >
              <span className="icon-refresh"></span>
            </button>
          )}
          
          {collapsible && (
            <button 
              className="metric-card__toggle" 
              onClick={toggleCollapse}
              aria-label={isCollapsed ? 'Expand card' : 'Collapse card'}
            >
              <span className={`icon-${isCollapsed ? 'expand' : 'collapse'}`}></span>
            </button>
          )}
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="metric-card__content">
          {isLoading ? (
            <div className="metric-card__loading">
              <div className="skeleton-loader"></div>
              <div className="skeleton-loader"></div>
              <div className="skeleton-loader"></div>
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(MetricCard);
```

2. **Timeline Chart Component**
```jsx
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../context/ThemeContext';
import './TimelineChart.scss';

const TimelineChart = ({ 
  data, 
  labels, 
  title,
  yAxisLabel = '',
  height = 200,
  tooltipCallback = null,
  showLegend = true
}) => {
  const { theme } = useTheme();
  const chartRef = useRef(null);
  
  // Determine colors based on theme
  const getColors = () => {
    return theme === 'dark' 
      ? {
          gridColor: 'rgba(255, 255, 255, 0.1)',
          textColor: 'rgba(255, 255, 255, 0.7)',
          lineColor: '#4caf50',
          fillColor: 'rgba(76, 175, 80, 0.1)'
        }
      : {
          gridColor: 'rgba(0, 0, 0, 0.1)',
          textColor: 'rgba(0, 0, 0, 0.7)',
          lineColor: '#4caf50',
          fillColor: 'rgba(76, 175, 80, 0.1)'
        };
  };
  
  const colors = getColors();
  
  // Update chart when theme changes
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chartInstance.update();
    }
  }, [theme]);
  
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        fill: true,
        backgroundColor: colors.fillColor,
        borderColor: colors.lineColor,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: colors.lineColor,
        pointBorderColor: '#fff',
        pointHoverRadius: 5,
        tension: 0.4
      }
    ]
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        labels: {
          color: colors.textColor
        }
      },
      tooltip: {
        callbacks: {
          label: tooltipCallback || undefined
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: colors.gridColor
        },
        ticks: {
          color: colors.textColor
        }
      },
      y: {
        grid: {
          color: colors.gridColor
        },
        ticks: {
          color: colors.textColor
        },
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel,
          color: colors.textColor
        }
      }
    }
  };
  
  return (
    <div className="timeline-chart" style={{ height: `${height}px` }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default React.memo(TimelineChart);
```

3. **Goals Card Component**
```jsx
import React, { useState } from 'react';
import { useDashboard, dashboardActions } from '../../context/DashboardContext';
import MetricCard from './MetricCard';
import GoalForm from './GoalForm';
import './GoalsCard.scss';

const GoalsCard = () => {
  const { state, dispatch } = useDashboard();
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  
  const handleAddGoal = () => {
    setEditingGoal(null);
    setShowForm(true);
  };
  
  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };
  
  const handleSaveGoal = async (goal) => {
    try {
      if (goal.id) {
        // Update existing goal
        const response = await fetch(`/api/dashboard/goals/${goal.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(goal)
        });
        
        const updatedGoal = await response.json();
        dispatch(dashboardActions.updateGoal(updatedGoal));
      } else {
        // Create new goal
        const response = await fetch('/api/dashboard/goals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(goal)
        });
        
        const newGoal = await response.json();
        dispatch(dashboardActions.addGoal(newGoal));
      }
      
      setShowForm(false);
      setEditingGoal(null);
    } catch (error) {
      console.error('Error saving goal:', error);
      dispatch(dashboardActions.setError('Failed to save goal'));
    }
  };
  
  const handleDeleteGoal = async (goalId) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) {
      return;
    }
    
    try {
      await fetch(`/api/dashboard/goals/${goalId}`, {
        method: 'DELETE'
      });
      
      dispatch(dashboardActions.removeGoal(goalId));
    } catch (error) {
      console.error('Error deleting goal:', error);
      dispatch(dashboardActions.setError('Failed to delete goal'));
    }
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingGoal(null);
  };
  
  const calculateProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };
  
  const getGoalStatusClass = (progress) => {
    if (progress >= 100) return 'completed';
    if (progress >= 75) return 'near-complete';
    if (progress >= 50) return 'in-progress';
    return 'started';
  };
  
  return (
    <MetricCard 
      title="Goals & Progress Tracking" 
      isLoading={state.loading.goals}
      className="goals-card"
    >
      {showForm ? (
        <GoalForm 
          goal={editingGoal} 
          onSave={handleSaveGoal} 
          onCancel={handleCancelForm} 
        />
      ) : (
        <>
          <div className="goals-card__list">
            {state.goals.length > 0 ? (
              state.goals.map(goal => (
                <div 
                  key={goal.id} 
                  className={`goals-card__item goals-card__item--${getGoalStatusClass(calculateProgress(goal.current, goal.target))}`}
                >
                  <div className="goals-card__item-header">
                    <h4 className="goals-card__item-title">{goal.title}</h4>
                    <div className="goals-card__item-actions">
                      <button 
                        onClick={() => handleEditGoal(goal)}
                        aria-label="Edit goal"
                      >
                        <span className="icon-edit"></span>
                      </button>
                      <button 
                        onClick={() => handleDeleteGoal(goal.id)}
                        aria-label="Delete goal"
                      >
                        <span className="icon-delete"></span>
                      </button>
                    </div>
                  </div>
                  
                  <p className="goals-card__item-description">{goal.description}</p>
                  
                  <div className="goals-card__item-progress">
                    <div className="goals-card__progress-bar">
                      <div 
                        className="goals-card__progress-fill" 
                        style={{ width: `${calculateProgress(goal.current, goal.target)}%` }}
                      ></div>
                    </div>
                    <div className="goals-card__progress-text">
                      {goal.current} / {goal.target} {goal.unit} ({calculateProgress(goal.current, goal.target)}%)
                    </div>
                  </div>
                  
                  {goal.targetDate && (
                    <div className="goals-card__item-deadline">
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="goals-card__empty">
                <p>You haven't set any goals yet. Create your first goal to track your progress.</p>
              </div>
            )}
          </div>
          
          <div className="goals-card__actions">
            <button 
              className="goals-card__add-button" 
              onClick={handleAddGoal}
            >
              Add New Goal
            </button>
          </div>
        </>
      )}
    </MetricCard>
  );
};

export default GoalsCard;
```

### Testing Strategy
1. **Unit Tests**
   - Test individual components in isolation
   - Verify component rendering with different props
   - Test state changes and user interactions
   - Examples: MetricCard rendering, TimelineChart display, GoalsCard behavior

2. **Integration Tests**
   - Test interactions between components
   - Verify context providers work correctly with consumers
   - Test API service integration
   - Examples: Dashboard data loading, filtering functionality, goal management

3. **End-to-End Tests**
   - Test complete user flows
   - Verify dashboard rendering with real data
   - Test responsiveness across different viewport sizes
   - Examples: Complete dashboard loading, time range filtering, goal creation flow

## Acceptance Criteria

### Functionality Criteria
- AC1.1: Dashboard displays summary metrics at the top (optimizations, chat interactions, time saved)
- AC1.2: Users can filter dashboard data by time period and programming language
- AC1.3: Code quality metrics show trends and breakdowns by category
- AC1.4: Activity tracking visualizes usage patterns and feature distribution
- AC1.5: Users can set, edit, and delete personal goals
- AC1.6: Goal progress is accurately tracked and visually represented
- AC1.7: Dashboard data can be exported in common formats

### Performance Criteria
- AC2.1: Initial dashboard load completes within 3 seconds on standard connections
- AC2.2: Filtering operations update the dashboard within 1 second
- AC2.3: Charts render smoothly without visible performance issues
- AC2.4: Dashboard remains responsive with large datasets
- AC2.5: Goal management operations complete within 500ms

### Quality Criteria
- AC3.1: UI matches the design specifications in both light and dark modes
- AC3.2: All text is legible with appropriate contrast ratios
- AC3.3: Interactive elements have clear hover and focus states
- AC3.4: Layout is responsive and functional across all target device sizes
- AC3.5: Visualizations provide meaningful insights even with limited data

### Edge Case Handling
- AC4.1: New users with limited data see appropriate placeholder content and guidance
- AC4.2: The dashboard handles time periods with no activity gracefully
- AC4.3: Error states provide clear feedback and recovery options
- AC4.4: The interface remains usable during network interruptions
- AC4.5: Visualizations adapt appropriately to extreme data values

## Development Resources

### Code Samples

#### Dashboard Page Component
```jsx
import React, { useEffect } from 'react';
import { useDashboard, dashboardActions } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import DashboardHeader from './components/DashboardHeader';
import SummaryMetrics from './components/SummaryMetrics';
import CodeQualityCard from './components/CodeQualityCard';
import ActivityCard from './components/ActivityCard';
import LanguagesCard from './components/LanguagesCard';
import GoalsCard from './components/GoalsCard';
import RecentActivityCard from './components/RecentActivityCard';
import { 
  fetchDashboardSummary, 
  fetchCodeQualityMetrics,
  fetchActivityMetrics,
  fetchLanguageMetrics,
  fetchUserGoals
} from '../../services/dashboardService';
import './Dashboard.scss';

const Dashboard = () => {
  const { state, dispatch } = useDashboard();
  const { theme } = useTheme();
  
  // Load dashboard data on initial render and when filters change
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Set loading states
        dispatch(dashboardActions.setLoading({
          summary: true,
          codeQuality: true,
          activity: true,
          languages: true,
          goals: true
        }));
        
        // Prepare query parameters
        const timeParams = {
          startDate: state.timeRange.start.toISOString(),
          endDate: state.timeRange.end.toISOString()
        };
        
        const languageParam = state.languageFilter 
          ? { language: state.languageFilter } 
          : {};
        
        // Fetch data in parallel
        const [summary, codeQuality, activity, languages, goals] = await Promise.all([
          fetchDashboardSummary({ ...timeParams, ...languageParam }),
          fetchCodeQualityMetrics({ ...timeParams, ...languageParam }),
          fetchActivityMetrics(timeParams),
          fetchLanguageMetrics(timeParams),
          fetchUserGoals()
        ]);
        
        // Update state with fetched data
        dispatch(dashboardActions.setSummary(summary));
        dispatch(dashboardActions.setCodeQuality(codeQuality));
        dispatch(dashboardActions.setActivity(activity));
        dispatch(dashboardActions.setLanguages(languages));
        dispatch(dashboardActions.setGoals(goals));
        
        // Clear any previous errors
        dispatch(dashboardActions.setError(null));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        dispatch(dashboardActions.setError('Failed to load dashboard data. Please try again.'));
      } finally {
        // Clear loading states
        dispatch(dashboardActions.setLoading({
          summary: false,
          codeQuality: false,
          activity: false,
          languages: false,
          goals: false
        }));
      }
    };
    
    loadDashboardData();
  }, [dispatch, state.timeRange, state.languageFilter]);
  
  // Load user preferences on initial render
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const preferences = await fetch('/api/dashboard/preferences').then(res => res.json());
        dispatch(dashboardActions.setPreferences(preferences));
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    };
    
    loadPreferences();
  }, [dispatch]);
  
  const handleTimeRangeChange = (timeRange) => {
    dispatch(dashboardActions.setTimeRange(timeRange));
  };
  
  const handleLanguageFilterChange = (language) => {
    dispatch(dashboardActions.setLanguageFilter(language));
  };
  
  // Determine which cards to display based on preferences
  const getVisibleCards = () => {
    return state.preferences.cardOrder.filter(cardId => 
      state.preferences.visibleCards.includes(cardId)
    );
  };
  
  const visibleCards = getVisibleCards();
  
  // Render card based on ID
  const renderCard = (cardId) => {
    switch (cardId) {
      case 'codeQuality':
        return <CodeQualityCard key={cardId} />;
      case 'activity':
        return <ActivityCard key={cardId} />;
      case 'languages':
        return <LanguagesCard key={cardId} />;
      case 'goals':
        return <GoalsCard key={cardId} />;
      case 'recentActivity':
        return <RecentActivityCard key={cardId} />;
      default:
        return null;
    }
  };
  
  return (
    <div className={`dashboard dashboard--${theme}`}>
      <Sidebar />
      
      <main className="dashboard__main">
        <Header title="Dashboard" />
        
        <div className="dashboard__container">
          <DashboardHeader 
            timeRange={state.timeRange}
            languageFilter={state.languageFilter}
            onTimeRangeChange={handleTimeRangeChange}
            onLanguageFilterChange={handleLanguageFilterChange}
          />
          
          {state.error && (
            <div className="dashboard__error">
              {state.error}
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}
          
          <SummaryMetrics 
            summary={state.summary} 
            isLoading={state.loading.summary} 
          />
          
          <div className="dashboard__grid">
            {visibleCards.map(cardId => renderCard(cardId))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
```

#### SCSS Styling
```scss
// Dashboard.scss
@import '../../styles/variables';
@import '../../styles/mixins';

.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
  
  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  &__container {
    flex: 1;
    padding: $spacing-lg;
    
    @include media-breakpoint-down(md) {
      padding: $spacing-md;
    }
    
    @include media-breakpoint-down(sm) {
      padding: $spacing-sm;
    }
  }
  
  &__error {
    padding: $spacing-md;
    margin-bottom: $spacing-md;
    background-color: var(--error-bg);
    color: var(--error-text);
    border-radius: $border-radius;
    border-left: 4px solid var(--error-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    button {
      padding: $spacing-xs $spacing-sm;
      background-color: var(--error-text);
      color: white;
      border: none;
      border-radius: $border-radius;
      cursor: pointer;
      
      &:hover {
        opacity: 0.9;
      }
    }
  }
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-md;
    margin-top: $spacing-md;
    
    @include media-breakpoint-down(lg) {
      grid-template-columns: 1fr;
    }
  }
}

// MetricCard.scss
.metric-card {
  background-color: var(--card-bg);
  border-radius: $border-radius;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &--collapsed {
    .metric-card__header {
      border-bottom: none;
    }
  }
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-md;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--card-header-bg);
  }
  
  &__title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
  }
  
  &__actions {
    display: flex;
    gap: $spacing-xs;
    
    button {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      padding: $spacing-xs;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background-color: var(--hover-color);
        color: var(--text-primary);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
  
  &__content {
    padding: $spacing-md;
  }
  
  &__loading {
    min-height: 150px;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    
    .skeleton-loader {
      height: 20px;
      background: linear-gradient(
        90deg,
        var(--skeleton-start) 0%,
        var(--skeleton-end) 50%,
        var(--skeleton-start) 100%
      );
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: $border-radius;
      
      &:first-child {
        width: 100%;
      }
      
      &:nth-child(2) {
        width: 85%;
      }
      
      &:last-child {
        width: 70%;
      }
    }
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

// GoalsCard.scss
.goals-card {
  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    margin-bottom: $spacing-md;
  }
  
  &__item {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: $border-radius;
    padding: $spacing-md;
    
    &--completed {
      border-left: 4px solid #4caf50;
      
      .goals-card__progress-fill {
        background-color: #4caf50;
      }
    }
    
    &--near-complete {
      border-left: 4px solid #8bc34a;
      
      .goals-card__progress-fill {
        background-color: #8bc34a;
      }
    }
    
    &--in-progress {
      border-left: 4px solid #ffc107;
      
      .goals-card__progress-fill {
        background-color: #ffc107;
      }
    }
    
    &--started {
      border-left: 4px solid #ff9800;
      
      .goals-card__progress-fill {
        background-color: #ff9800;
      }
    }
  }
  
  &__item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-sm;
  }
  
  &__item-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
  }
  
  &__item-actions {
    display: flex;
    gap: $spacing-xs;
    
    button {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      padding: $spacing-xs;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background-color: var(--hover-color);
        color: var(--text-primary);
      }
    }
  }
  
  &__item-description {
    margin-top: 0;
    margin-bottom: $spacing-sm;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  &__item-progress {
    margin-bottom: $spacing-sm;
  }
  
  &__progress-bar {
    height: 8px;
    background-color: var(--progress-bg);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: $spacing-xs;
  }
  
  &__progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }
  
  &__progress-text {
    font-size: 0.8rem;
    color: var(--text-secondary);
    text-align: right;
  }
  
  &__item-deadline {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
  
  &__empty {
    padding: $spacing-md;
    text-align: center;
    color: var(--text-secondary);
  }
  
  &__actions {
    display: flex;
    justify-content: center;
  }
  
  &__add-button {
    padding: $spacing-sm $spacing-md;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: $border-radius;
    cursor: pointer;
    font-weight: 500;
    
    &:hover {
      background-color: var(--primary-color-dark);
    }
  }
}
```

### Reference Implementations
- [Google Analytics Dashboard](https://analytics.google.com/)
- [GitHub Insights](https://github.com/features/insights)
- [Datadog Dashboards](https://www.datadoghq.com/product/platform/dashboards/)
- [Grafana](https://grafana.com/)

### Recommended Libraries
- **Chart.js**: For data visualization
- **React-Chartjs-2**: React wrapper for Chart.js
- **React-Calendar-Heatmap**: For activity calendar visualization
- **React-DatePicker**: For date range selection
- **React-Grid-Layout**: For customizable dashboard layouts

### Documentation Links
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [React Context API Documentation](https://reactjs.org/docs/context.html)
- [CSS Grid Layout Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Accessible Charts](https://www.a11yproject.com/posts/accessible-charts/)
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
