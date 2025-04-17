# Library/Query Management - Feature PRD

## Overview

### Feature Description
The Library/Query Management feature allows users to save, organize, and reuse their AI interactions and code queries within Code Buddy. This feature provides a structured repository for storing frequently used prompts, complex queries, and successful interaction patterns. Users can categorize, tag, and annotate their saved queries, making it easy to find and reuse effective prompts for common tasks. The Library serves as both a personal knowledge base and a productivity tool that helps developers leverage their past successful interactions to solve new problems more efficiently.

### Purpose and Goals
- Provide a centralized location for saving and organizing effective AI prompts and queries
- Enable quick reuse of previously successful interaction patterns
- Support knowledge retention and transfer across projects and team members
- Allow customizable organization through categories, tags, and annotations
- Facilitate continuous improvement of AI interaction techniques
- Reduce repetitive query formulation for common tasks
- Create a personalized library of interaction patterns that grows with usage

### User Value Proposition
The Library/Query Management feature enhances the developer experience by:
- Reducing time spent formulating complex queries for recurring tasks
- Creating a personal repository of effective interaction patterns
- Enabling knowledge sharing of successful AI prompts among team members
- Supporting continuous learning about effective AI interaction techniques
- Providing quick access to frequently used code patterns and solutions
- Allowing customization to match individual workflow and organization preferences
- Improving consistency in AI interactions across similar tasks

### Scope
This PRD covers the Library/Query Management feature of the Code Buddy application, including:
- Query creation and management interface
- Organization system with categories and tags
- Search and filtering capabilities
- Query execution and editing
- Import/export functionality
- Sharing options
- Responsive design considerations

## User Stories

### Primary User Stories
1. As a developer, I want to save effective AI prompts so I can reuse them for similar tasks in the future.
2. As a developer, I want to organize my saved queries with custom categories and tags so I can find them efficiently.
3. As a developer, I want to search across my query library so I can quickly find specific interaction patterns.
4. As a developer, I want to add notes and annotations to saved queries so I can remember why they were effective.
5. As a developer, I want to execute saved queries directly from the library so I can quickly apply them to new problems.
6. As a developer, I want to edit and refine saved queries based on new insights so my library continuously improves.
7. As a developer, I want to share effective queries with team members so we can establish best practices for AI interactions.

### Edge Cases
1. As a user with hundreds of saved queries, I want efficient navigation and filtering so I can manage a large collection without performance issues.
2. As a user working across multiple devices, I want my query library to be synchronized so I have consistent access to my saved prompts.
3. As a user with specific organizational needs, I want to create nested categories so I can implement a hierarchical organization system.
4. As a user with accessibility needs, I want the library interface to be fully navigable via keyboard and screen reader.
5. As a user who accidentally saves a query, I want to easily remove or edit it so I can maintain a clean collection.

### User Flow
1. User identifies a valuable AI interaction or query pattern
2. User clicks the "Save to Library" button associated with the interaction
3. System displays a query creation dialog with:
   - Auto-populated query content
   - Title field
   - Category selection (existing or new)
   - Tag input field
   - Optional notes field
4. User completes the form and saves the query
5. System confirms the query was saved
6. Later, user navigates to the Library feature from the sidebar
7. User can:
   - Browse queries by category
   - Filter by tags or other criteria
   - Search for specific content
   - View, edit, or delete queries
   - Execute queries directly from the library
   - Export selected queries
   - Share queries with team members

## Requirements

### Functional Requirements

#### Query Creation and Management
- FR1.1: Provide "Save to Library" buttons/icons in all relevant areas of the application (chat interface, code optimization, etc.)
- FR1.2: Display a query creation dialog with fields for title, category, tags, and notes
- FR1.3: Support editing of existing queries (title, content, category, tags, notes)
- FR1.4: Enable deletion of queries with confirmation
- FR1.5: Allow batch operations on multiple queries (delete, categorize, export)
- FR1.6: Implement query versioning to track changes and improvements
- FR1.7: Support query templates with variable placeholders

#### Organization System
- FR2.1: Support user-defined categories with custom names and optional descriptions
- FR2.2: Enable tagging of queries with multiple user-defined tags
- FR2.3: Allow reordering of queries within categories
- FR2.4: Support moving queries between categories
- FR2.5: Provide default categories for common query types (Code Generation, Debugging, Explanation, etc.)
- FR2.6: Allow category management (create, rename, delete, merge)
- FR2.7: Support nested categories (at least one level of subcategories)

#### Search and Filtering
- FR3.1: Implement full-text search across all saved queries and notes
- FR3.2: Provide filtering by category, tag, date, and query type
- FR3.3: Support combined search and filter operations
- FR3.4: Display search results with relevant context and highlights
- FR3.5: Save frequent searches for quick access
- FR3.6: Sort queries by various criteria (date, name, usage frequency)
- FR3.7: Implement type-ahead suggestions in search field

#### Query Execution and Editing
- FR4.1: Allow direct execution of saved queries from the library
- FR4.2: Support parameter substitution for templated queries
- FR4.3: Enable quick editing before execution
- FR4.4: Provide a history of query executions with results
- FR4.5: Allow forking existing queries to create variations
- FR4.6: Support comparing different versions of a query
- FR4.7: Enable adding post-execution notes based on results

#### Import/Export and Sharing
- FR5.1: Export queries in common formats (JSON, Markdown, Text)
- FR5.2: Import queries from supported formats
- FR5.3: Generate shareable links for individual queries
- FR5.4: Support exporting selected queries or entire categories
- FR5.5: Enable direct sharing to common platforms (email, Slack, etc.)
- FR5.6: Provide options for controlling access to shared queries
- FR5.7: Support collaborative query development with team members

### Technical Requirements
- TR1.1: Implement responsive design that adapts to desktop, tablet, and mobile viewports
- TR1.2: Ensure theme implementation follows the design system color palette for light/dark modes
- TR1.3: Optimize query storage for efficient retrieval and searching
- TR1.4: Implement client-side caching to improve performance with large query collections
- TR1.5: Support offline access to saved queries when possible
- TR1.6: Ensure accessibility compliance for screen readers and keyboard navigation
- TR1.7: Implement efficient state management for query operations

### Dependencies
- DE1.1: Authentication system for user identification and data access
- DE1.2: Storage system for query data and metadata
- DE1.3: Search indexing system for efficient content retrieval
- DE1.4: Sharing and permission system for collaborative features
- DE1.5: AI integration for query execution and parameter handling

### Constraints
- CO1.1: Must maintain visual consistency with the overall Code Buddy design system
- CO1.2: Must support all modern browsers (Chrome, Firefox, Safari, Edge)
- CO1.3: Must be fully responsive for screen sizes from 320px to 1440px+
- CO1.4: Must comply with WCAG 2.1 AA accessibility standards
- CO1.5: Individual query size must not exceed 100KB for performance reasons
- CO1.6: Search operations must complete within 2 seconds for collections up to 1000 queries

## UI/UX Specifications

### UI Components
1. **Library Page Layout**
   - Sidebar with categories and tags
   - Main content area with query list and detail view
   - Search and filter controls at the top
   - Action buttons for batch operations

2. **Query List Item**
   - Title of query
   - Preview of query content
   - Category and tags indicators
   - Creation/modification date
   - Usage count
   - Quick action buttons (execute, edit, delete, share)

3. **Query Detail View**
   - Full query content with proper formatting
   - Metadata section (category, tags, dates, usage count)
   - User notes and annotations
   - Version history
   - Action buttons (execute, edit, delete, share, export)
   - Execution results history

4. **Query Creation/Edit Dialog**
   - Title input field
   - Query content editor with syntax highlighting
   - Category selector (with create new option)
   - Tags input field with suggestions
   - Notes text area
   - Template parameter configuration (if applicable)
   - Save and cancel buttons

5. **Category Management Interface**
   - List of existing categories with item counts
   - Create, rename, delete options
   - Drag-and-drop reordering
   - Subcategory creation and management

6. **Search and Filter Controls**
   - Search input with clear button
   - Category filter dropdown
   - Tag filter with multi-select
   - Date range picker
   - Query type filter
   - Sort order selector
   - Saved searches dropdown

7. **Query Execution Interface**
   - Parameter input fields for templated queries
   - Execute button
   - Previous execution results
   - Save execution results option
   - Add notes to execution

### Interaction Design
- Query list should support both list and grid views
- Category sidebar should be collapsible to maximize screen space
- Detail view should open in-place or in a side panel depending on screen size
- Drag-and-drop should be supported for organizing queries
- Search should update results in real-time as the user types
- Query creation should be accessible from anywhere in the application
- Context menus should provide quick access to common actions

### Responsive Design Considerations
- **Desktop (1024px+)**
  - Three-column layout: categories, query list, detail view
  - Expanded metadata and action buttons
  - Grid view option for queries
  - Side-by-side editing

- **Tablet (768px - 1023px)**
  - Two-column layout: collapsible categories, combined list/detail view
  - Toggle between list and detail views
  - Condensed metadata display
  - Popup dialogs for editing

- **Mobile (320px - 767px)**
  - Single-column layout with navigation tabs
  - Bottom navigation for switching between categories, list, and detail views
  - Simplified list items
  - Full-screen editing interface
  - Swipe gestures for common actions

### Accessibility Requirements
- All interactive elements must have appropriate ARIA labels
- Color contrast must meet WCAG 2.1 AA standards in both light and dark modes
- Focus states must be clearly visible for keyboard navigation
- All functionality must be accessible via keyboard
- Screen reader support for all content and interactive elements
- Alternative text for any images or icons
- Proper heading structure for screen reader navigation

## Technical Specifications

### Data Models
```typescript
// Query
interface Query {
  id: string;
  userId: string;
  title: string;
  content: string;
  isTemplate: boolean;
  templateParameters?: Array<{
    name: string;
    description?: string;
    defaultValue?: string;
  }>;
  categoryId: string;
  tags: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  lastExecutedAt?: Date;
  executionCount: number;
  isStarred: boolean;
  isShared: boolean;
  sharedWith?: string[]; // User IDs
  version: number;
  previousVersions?: string[]; // IDs of previous versions
}

// QueryExecution
interface QueryExecution {
  id: string;
  queryId: string;
  userId: string;
  executedAt: Date;
  parameters?: Record<string, string>; // For templated queries
  result: string;
  notes?: string;
  executionTime: number; // in milliseconds
  successful: boolean;
  errorMessage?: string;
}

// Category
interface Category {
  id: string;
  userId: string;
  name: string;
  description?: string;
  parentId?: string; // For nested categories
  order: number;
  createdAt: Date;
  updatedAt: Date;
  isDefault: boolean;
  color?: string;
  icon?: string;
}

// Tag
interface Tag {
  id: string;
  userId: string;
  name: string;
  queryCount: number;
  createdAt: Date;
  updatedAt: Date;
  color?: string;
}

// Search Query
interface SearchQuery {
  id?: string; // Only for saved searches
  userId: string;
  query: string;
  filters: {
    categories?: string[];
    tags?: string[];
    isTemplate?: boolean;
    dateRange?: {
      start?: Date;
      end?: Date;
    };
  };
  sortBy: 'title' | 'createdAt' | 'updatedAt' | 'lastExecutedAt' | 'executionCount';
  sortDirection: 'asc' | 'desc';
  isSaved: boolean;
  name?: string; // For saved searches
  createdAt?: Date;
  updatedAt?: Date;
}

// Query Export
interface QueryExport {
  version: string;
  exportDate: Date;
  userId: string;
  queries: Query[];
  categories: Category[];
  tags: Tag[];
}

// User Preferences
interface LibraryPreferences {
  defaultView: 'list' | 'grid';
  defaultSortBy: 'title' | 'createdAt' | 'updatedAt' | 'lastExecutedAt' | 'executionCount';
  defaultSortDirection: 'asc' | 'desc';
  showPreview: boolean;
  previewSize: 'small' | 'medium' | 'large';
  sidebarExpanded: boolean;
  defaultCategory: string;
  showExecutionHistory: boolean;
}
```

### API Requirements
1. **Get Queries**
   - Endpoint: `GET /api/library/queries`
   - Query Parameters: 
     - `categoryId` (optional)
     - `tags` (optional, comma-separated)
     - `query` (optional search term)
     - `isTemplate` (optional boolean)
     - `sortBy` and `sortDirection` (optional)
     - `page` and `limit` (for pagination)
   - Response: Array of Query objects with pagination metadata

2. **Get Query**
   - Endpoint: `GET /api/library/queries/{queryId}`
   - Response: Query object

3. **Create Query**
   - Endpoint: `POST /api/library/queries`
   - Request Body: Query object (without id)
   - Response: Created Query object

4. **Update Query**
   - Endpoint: `PUT /api/library/queries/{queryId}`
   - Request Body: Partial Query object
   - Response: Updated Query object

5. **Delete Query**
   - Endpoint: `DELETE /api/library/queries/{queryId}`
   - Response: Success confirmation

6. **Execute Query**
   - Endpoint: `POST /api/library/queries/{queryId}/execute`
   - Request Body: 
     ```
     {
       parameters?: Record<string, string> // For templated queries
     }
     ```
   - Response: QueryExecution object

7. **Get Query Executions**
   - Endpoint: `GET /api/library/queries/{queryId}/executions`
   - Query Parameters: 
     - `limit` (optional, default 10)
     - `page` (optional, default 1)
   - Response: Array of QueryExecution objects with pagination metadata

8. **Get Categories**
   - Endpoint: `GET /api/library/categories`
   - Response: Array of Category objects

9. **Create Category**
   - Endpoint: `POST /api/library/categories`
   - Request Body: Category object (without id)
   - Response: Created Category object

10. **Update Category**
    - Endpoint: `PUT /api/library/categories/{categoryId}`
    - Request Body: Partial Category object
    - Response: Updated Category object

11. **Delete Category**
    - Endpoint: `DELETE /api/library/categories/{categoryId}`
    - Query Parameters: `moveQueriesTo` (optional categoryId)
    - Response: Success confirmation

12. **Get Tags**
    - Endpoint: `GET /api/library/tags`
    - Response: Array of Tag objects

13. **Search Queries**
    - Endpoint: `POST /api/library/search`
    - Request Body: SearchQuery object
    - Response: Array of Query objects with pagination metadata

14. **Save Search**
    - Endpoint: `POST /api/library/saved-searches`
    - Request Body: SearchQuery object with name
    - Response: Saved SearchQuery object with id

15. **Get Saved Searches**
    - Endpoint: `GET /api/library/saved-searches`
    - Response: Array of saved SearchQuery objects

16. **Delete Saved Search**
    - Endpoint: `DELETE /api/library/saved-searches/{searchId}`
    - Response: Success confirmation

17. **Export Queries**
    - Endpoint: `POST /api/library/export`
    - Request Body: 
      ```
      {
        format: 'json' | 'markdown' | 'text',
        queryIds?: string[], // If not provided, export all
        categoryIds?: string[] // If not provided, export all
      }
      ```
    - Response: QueryExport object or file download

18. **Import Queries**
    - Endpoint: `POST /api/library/import`
    - Request Body: FormData with file
    - Response: Import summary with success/failure counts

19. **Share Query**
    - Endpoint: `POST /api/library/queries/{queryId}/share`
    - Request Body: 
      ```
      {
        userIds?: string[],
        generateLink?: boolean
      }
      ```
    - Response: Share information including link if requested

20. **Get User Preferences**
    - Endpoint: `GET /api/library/preferences`
    - Response: LibraryPreferences object

21. **Update User Preferences**
    - Endpoint: `PUT /api/library/preferences`
    - Request Body: Partial LibraryPreferences object
    - Response: Updated LibraryPreferences object

### State Management
The Library/Query Management feature will use React Context for global state management:

```jsx
// LibraryContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  queries: [],
  categories: [],
  tags: [],
  selectedQuery: null,
  selectedCategory: null,
  selectedTags: [],
  searchQuery: '',
  filters: {
    isTemplate: null,
    dateRange: null
  },
  sortBy: 'updatedAt',
  sortDirection: 'desc',
  view: 'list',
  pagination: {
    page: 1,
    limit: 20,
    total: 0
  },
  savedSearches: [],
  preferences: {
    defaultView: 'list',
    defaultSortBy: 'updatedAt',
    defaultSortDirection: 'desc',
    showPreview: true,
    previewSize: 'medium',
    sidebarExpanded: true,
    defaultCategory: null,
    showExecutionHistory: true
  },
  loading: {
    queries: false,
    categories: false,
    tags: false,
    execution: false,
    operations: false
  },
  error: null
};

// Action types
const ActionTypes = {
  SET_QUERIES: 'SET_QUERIES',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_TAGS: 'SET_TAGS',
  SELECT_QUERY: 'SELECT_QUERY',
  SELECT_CATEGORY: 'SELECT_CATEGORY',
  SELECT_TAGS: 'SELECT_TAGS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_FILTERS: 'SET_FILTERS',
  SET_SORT: 'SET_SORT',
  SET_VIEW: 'SET_VIEW',
  SET_PAGINATION: 'SET_PAGINATION',
  SET_SAVED_SEARCHES: 'SET_SAVED_SEARCHES',
  SET_PREFERENCES: 'SET_PREFERENCES',
  ADD_QUERY: 'ADD_QUERY',
  UPDATE_QUERY: 'UPDATE_QUERY',
  REMOVE_QUERY: 'REMOVE_QUERY',
  ADD_CATEGORY: 'ADD_CATEGORY',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  REMOVE_CATEGORY: 'REMOVE_CATEGORY',
  ADD_EXECUTION: 'ADD_EXECUTION',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  RESET_STATE: 'RESET_STATE'
};

// Reducer
const libraryReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_QUERIES:
      return { ...state, queries: action.payload };
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ActionTypes.SET_TAGS:
      return { ...state, tags: action.payload };
    case ActionTypes.SELECT_QUERY:
      return { ...state, selectedQuery: action.payload };
    case ActionTypes.SELECT_CATEGORY:
      return { ...state, selectedCategory: action.payload };
    case ActionTypes.SELECT_TAGS:
      return { ...state, selectedTags: action.payload };
    case ActionTypes.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case ActionTypes.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case ActionTypes.SET_SORT:
      return { 
        ...state, 
        sortBy: action.payload.sortBy, 
        sortDirection: action.payload.sortDirection 
      };
    case ActionTypes.SET_VIEW:
      return { ...state, view: action.payload };
    case ActionTypes.SET_PAGINATION:
      return { ...state, pagination: { ...state.pagination, ...action.payload } };
    case ActionTypes.SET_SAVED_SEARCHES:
      return { ...state, savedSearches: action.payload };
    case ActionTypes.SET_PREFERENCES:
      return { 
        ...state, 
        preferences: { ...state.preferences, ...action.payload } 
      };
    case ActionTypes.ADD_QUERY:
      return { 
        ...state, 
        queries: [action.payload, ...state.queries] 
      };
    case ActionTypes.UPDATE_QUERY:
      return {
        ...state,
        queries: state.queries.map(query => 
          query.id === action.payload.id ? { ...query, ...action.payload } : query
        ),
        selectedQuery: state.selectedQuery?.id === action.payload.id 
          ? { ...state.selectedQuery, ...action.payload } 
          : state.selectedQuery
      };
    case ActionTypes.REMOVE_QUERY:
      return {
        ...state,
        queries: state.queries.filter(query => query.id !== action.payload),
        selectedQuery: state.selectedQuery?.id === action.payload 
          ? null 
          : state.selectedQuery
      };
    case ActionTypes.ADD_CATEGORY:
      return { 
        ...state, 
        categories: [...state.categories, action.payload] 
      };
    case ActionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category => 
          category.id === action.payload.id ? { ...category, ...action.payload } : category
        ),
        selectedCategory: state.selectedCategory?.id === action.payload.id 
          ? { ...state.selectedCategory, ...action.payload } 
          : state.selectedCategory
      };
    case ActionTypes.REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload),
        selectedCategory: state.selectedCategory?.id === action.payload 
          ? null 
          : state.selectedCategory
      };
    case ActionTypes.ADD_EXECUTION:
      return {
        ...state,
        selectedQuery: state.selectedQuery?.id === action.payload.queryId
          ? {
              ...state.selectedQuery,
              lastExecutedAt: action.payload.executedAt,
              executionCount: (state.selectedQuery.executionCount || 0) + 1
            }
          : state.selectedQuery,
        queries: state.queries.map(query => 
          query.id === action.payload.queryId
            ? {
                ...query,
                lastExecutedAt: action.payload.executedAt,
                executionCount: (query.executionCount || 0) + 1
              }
            : query
        )
      };
    case ActionTypes.SET_LOADING:
      return { 
        ...state, 
        loading: { ...state.loading, ...action.payload } 
      };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.RESET_STATE:
      return { 
        ...initialState,
        preferences: state.preferences // Preserve user preferences
      };
    default:
      return state;
  }
};

// Create context
const LibraryContext = createContext();

// Provider component
export const LibraryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(libraryReducer, initialState);
  
  return (
    <LibraryContext.Provider value={{ state, dispatch }}>
      {children}
    </LibraryContext.Provider>
  );
};

// Custom hook for using the library context
export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

// Action creators
export const libraryActions = {
  setQueries: (queries) => ({
    type: ActionTypes.SET_QUERIES,
    payload: queries
  }),
  setCategories: (categories) => ({
    type: ActionTypes.SET_CATEGORIES,
    payload: categories
  }),
  setTags: (tags) => ({
    type: ActionTypes.SET_TAGS,
    payload: tags
  }),
  selectQuery: (query) => ({
    type: ActionTypes.SELECT_QUERY,
    payload: query
  }),
  selectCategory: (category) => ({
    type: ActionTypes.SELECT_CATEGORY,
    payload: category
  }),
  selectTags: (tags) => ({
    type: ActionTypes.SELECT_TAGS,
    payload: tags
  }),
  setSearchQuery: (query) => ({
    type: ActionTypes.SET_SEARCH_QUERY,
    payload: query
  }),
  setFilters: (filters) => ({
    type: ActionTypes.SET_FILTERS,
    payload: filters
  }),
  setSort: (sortBy, sortDirection) => ({
    type: ActionTypes.SET_SORT,
    payload: { sortBy, sortDirection }
  }),
  setView: (view) => ({
    type: ActionTypes.SET_VIEW,
    payload: view
  }),
  setPagination: (pagination) => ({
    type: ActionTypes.SET_PAGINATION,
    payload: pagination
  }),
  setSavedSearches: (searches) => ({
    type: ActionTypes.SET_SAVED_SEARCHES,
    payload: searches
  }),
  setPreferences: (preferences) => ({
    type: ActionTypes.SET_PREFERENCES,
    payload: preferences
  }),
  addQuery: (query) => ({
    type: ActionTypes.ADD_QUERY,
    payload: query
  }),
  updateQuery: (query) => ({
    type: ActionTypes.UPDATE_QUERY,
    payload: query
  }),
  removeQuery: (queryId) => ({
    type: ActionTypes.REMOVE_QUERY,
    payload: queryId
  }),
  addCategory: (category) => ({
    type: ActionTypes.ADD_CATEGORY,
    payload: category
  }),
  updateCategory: (category) => ({
    type: ActionTypes.UPDATE_CATEGORY,
    payload: category
  }),
  removeCategory: (categoryId) => ({
    type: ActionTypes.REMOVE_CATEGORY,
    payload: categoryId
  }),
  addExecution: (execution) => ({
    type: ActionTypes.ADD_EXECUTION,
    payload: execution
  }),
  setLoading: (loadingState) => ({
    type: ActionTypes.SET_LOADING,
    payload: loadingState
  }),
  setError: (error) => ({
    type: ActionTypes.SET_ERROR,
    payload: error
  }),
  resetState: () => ({
    type: ActionTypes.RESET_STATE
  })
};
```

### Performance Considerations
1. **Data Loading Optimization**
   - Implement pagination for query lists
   - Use infinite scrolling for large collections
   - Prefetch adjacent pages for smoother navigation
   - Cache frequently accessed queries

2. **Search Performance**
   - Implement debouncing for search input
   - Use client-side filtering for small collections
   - Optimize server-side search for large collections
   - Consider using a dedicated search index for full-text search

3. **Rendering Efficiency**
   - Use virtualized lists for large query collections
   - Implement lazy loading for query content
   - Optimize preview generation for different query types
   - Use memoization for expensive computations

4. **Query Execution**
   - Implement optimistic UI updates during query execution
   - Cache execution results for quick reference
   - Use web workers for parameter processing when appropriate
   - Provide clear loading states during execution

## Implementation Guidelines

### Component Structure
```
src/
├── pages/
│   └── Library/
│       ├── index.jsx                 # Main Library page component
│       ├── Library.scss              # Library page styles
│       └── components/               # Library-specific components
│           ├── QueryList.jsx         # List of queries
│           ├── QueryItem.jsx         # Individual query list item
│           ├── QueryDetail.jsx       # Detailed view of a query
│           ├── CategorySidebar.jsx   # Sidebar with categories
│           ├── SearchFilters.jsx     # Search and filter controls
│           ├── QueryForm.jsx         # Create/edit query form
│           ├── CategoryForm.jsx      # Create/edit category form
│           ├── QueryExecution.jsx    # Query execution interface
│           └── ImportExport.jsx      # Import/export interface
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx              # Sidebar navigation
│   │   └── Header.jsx               # Application header
│   └── common/
│       ├── TagInput.jsx             # Reusable tag input component
│       ├── CodeEditor.jsx           # Code editor with syntax highlighting
│       └── EmptyState.jsx           # Empty state placeholder
└── context/
    └── LibraryContext.jsx           # Library context provider
```

### Code Architecture
The Library/Query Management feature will follow a component-based architecture with:

1. **Container Components**
   - Manage data fetching and state
   - Connect to API services and context providers
   - Handle business logic for library functionality
   - Examples: Library page, QueryList, CategorySidebar

2. **Presentational Components**
   - Focus on rendering UI based on props
   - Handle local UI state (hover, expand/collapse, etc.)
   - Examples: QueryItem, QueryDetail, TagInput

3. **Custom Hooks**
   - Extract reusable logic into custom hooks
   - Examples: `useQueryOperations`, `useCategories`, `useSearch`

### Reusable Components
1. **Query Item Component**
```jsx
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useLibrary, libraryActions } from '../../context/LibraryContext';
import './QueryItem.scss';

const QueryItem = ({ 
  query, 
  isSelected = false,
  view = 'list',
  onSelect
}) => {
  const { dispatch } = useLibrary();
  
  const handleSelect = () => {
    if (onSelect) {
      onSelect(query);
    }
  };
  
  const handleStar = (e) => {
    e.stopPropagation();
    dispatch(libraryActions.updateQuery({
      id: query.id,
      isStarred: !query.isStarred
    }));
  };
  
  const handleExecute = async (e) => {
    e.stopPropagation();
    
    try {
      dispatch(libraryActions.setLoading({ execution: true }));
      
      // If this is a template query with parameters, we should open the execution dialog
      if (query.isTemplate && query.templateParameters?.length > 0) {
        // This would typically open a modal or navigate to execution view
        // For simplicity, we'll just select the query which would show the execution interface
        onSelect(query);
        return;
      }
      
      // For non-template queries, execute directly
      const response = await fetch(`/api/library/queries/${query.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      const execution = await response.json();
      
      dispatch(libraryActions.addExecution(execution));
      
      // Optionally navigate to the result or show a success message
    } catch (error) {
      console.error('Error executing query:', error);
      dispatch(libraryActions.setError('Failed to execute query'));
    } finally {
      dispatch(libraryActions.setLoading({ execution: false }));
    }
  };
  
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this query?')) {
      dispatch(libraryActions.removeQuery(query.id));
    }
  };
  
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  };
  
  return (
    <div 
      className={`query-item query-item--${view} ${isSelected ? 'query-item--selected' : ''}`}
      onClick={handleSelect}
    >
      <div className="query-item__header">
        <div className="query-item__type">
          <span className={query.isTemplate ? 'icon-template' : 'icon-query'}></span>
        </div>
        
        <h3 className="query-item__title">{query.title}</h3>
        
        <div className="query-item__actions">
          <button 
            className={`query-item__star ${query.isStarred ? 'active' : ''}`}
            onClick={handleStar}
            aria-label={query.isStarred ? 'Unstar query' : 'Star query'}
          >
            <span className={query.isStarred ? 'icon-star-filled' : 'icon-star'}></span>
          </button>
          
          <button 
            className="query-item__execute"
            onClick={handleExecute}
            aria-label="Execute query"
          >
            <span className="icon-play"></span>
          </button>
          
          <button 
            className="query-item__delete"
            onClick={handleDelete}
            aria-label="Delete query"
          >
            <span className="icon-delete"></span>
          </button>
        </div>
      </div>
      
      {view !== 'compact' && (
        <div className="query-item__preview">
          <pre className="query-item__content">
            {truncateText(query.content, view === 'list' ? 150 : 75)}
          </pre>
        </div>
      )}
      
      <div className="query-item__footer">
        <div className="query-item__category">
          {query.categoryId && (
            <span className="query-item__category-name">
              {query.categoryName || 'Uncategorized'}
            </span>
          )}
        </div>
        
        <div className="query-item__tags">
          {query.tags && query.tags.length > 0 && (
            query.tags.slice(0, view === 'list' ? 3 : 1).map(tag => (
              <span key={tag} className="query-item__tag">{tag}</span>
            ))
          )}
          
          {query.tags && query.tags.length > (view === 'list' ? 3 : 1) && (
            <span className="query-item__tag-more">
              +{query.tags.length - (view === 'list' ? 3 : 1)}
            </span>
          )}
        </div>
        
        <div className="query-item__meta">
          <span className="query-item__executions">
            {query.executionCount || 0} {query.executionCount === 1 ? 'execution' : 'executions'}
          </span>
          <span className="query-item__date">
            {formatDistanceToNow(new Date(query.updatedAt), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(QueryItem);
```

2. **Query Execution Component**
```jsx
import React, { useState, useEffect } from 'react';
import { useLibrary, libraryActions } from '../../context/LibraryContext';
import CodeEditor from '../../components/common/CodeEditor';
import './QueryExecution.scss';

const QueryExecution = ({ 
  query,
  onExecutionComplete
}) => {
  const { state, dispatch } = useLibrary();
  const [parameters, setParameters] = useState({});
  const [executions, setExecutions] = useState([]);
  const [activeExecution, setActiveExecution] = useState(null);
  const [notes, setNotes] = useState('');
  
  // Initialize parameters from template
  useEffect(() => {
    if (query.isTemplate && query.templateParameters) {
      const initialParams = {};
      query.templateParameters.forEach(param => {
        initialParams[param.name] = param.defaultValue || '';
      });
      setParameters(initialParams);
    }
  }, [query]);
  
  // Fetch previous executions
  useEffect(() => {
    const fetchExecutions = async () => {
      try {
        const response = await fetch(`/api/library/queries/${query.id}/executions`);
        const data = await response.json();
        setExecutions(data);
        
        if (data.length > 0) {
          setActiveExecution(data[0]);
        }
      } catch (error) {
        console.error('Error fetching executions:', error);
      }
    };
    
    fetchExecutions();
  }, [query.id]);
  
  const handleParameterChange = (name, value) => {
    setParameters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleExecute = async () => {
    try {
      dispatch(libraryActions.setLoading({ execution: true }));
      
      const response = await fetch(`/api/library/queries/${query.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parameters })
      });
      
      const execution = await response.json();
      
      // Update state with new execution
      setExecutions([execution, ...executions]);
      setActiveExecution(execution);
      
      // Update global state
      dispatch(libraryActions.addExecution(execution));
      
      if (onExecutionComplete) {
        onExecutionComplete(execution);
      }
    } catch (error) {
      console.error('Error executing query:', error);
      dispatch(libraryActions.setError('Failed to execute query'));
    } finally {
      dispatch(libraryActions.setLoading({ execution: false }));
    }
  };
  
  const handleSaveNotes = async () => {
    if (!activeExecution || !notes.trim()) return;
    
    try {
      const response = await fetch(`/api/library/queries/executions/${activeExecution.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });
      
      const updatedExecution = await response.json();
      
      // Update local state
      setExecutions(executions.map(exec => 
        exec.id === updatedExecution.id ? updatedExecution : exec
      ));
      setActiveExecution(updatedExecution);
      setNotes('');
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };
  
  const renderParameterInputs = () => {
    if (!query.isTemplate || !query.templateParameters) {
      return null;
    }
    
    return (
      <div className="query-execution__parameters">
        <h4>Parameters</h4>
        {query.templateParameters.map(param => (
          <div key={param.name} className="query-execution__parameter">
            <label htmlFor={`param-${param.name}`}>{param.name}</label>
            {param.description && (
              <p className="query-execution__parameter-description">
                {param.description}
              </p>
            )}
            <input
              id={`param-${param.name}`}
              type="text"
              value={parameters[param.name] || ''}
              onChange={(e) => handleParameterChange(param.name, e.target.value)}
              placeholder={`Enter value for ${param.name}`}
            />
          </div>
        ))}
      </div>
    );
  };
  
  const renderExecutionResult = () => {
    if (!activeExecution) {
      return (
        <div className="query-execution__empty">
          <p>No executions yet. Click "Execute" to run this query.</p>
        </div>
      );
    }
    
    return (
      <div className="query-execution__result">
        <div className="query-execution__result-header">
          <h4>Result</h4>
          <span className="query-execution__result-time">
            {new Date(activeExecution.executedAt).toLocaleString()}
          </span>
        </div>
        
        <div className="query-execution__result-content">
          {activeExecution.successful ? (
            <CodeEditor
              value={activeExecution.result}
              readOnly={true}
              language="javascript" // Adjust based on result type
              height="200px"
            />
          ) : (
            <div className="query-execution__error">
              <p>Execution failed: {activeExecution.errorMessage}</p>
            </div>
          )}
        </div>
        
        {activeExecution.notes && (
          <div className="query-execution__notes">
            <h5>Notes</h5>
            <p>{activeExecution.notes}</p>
          </div>
        )}
        
        <div className="query-execution__add-notes">
          <textarea
            placeholder="Add notes about this execution..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
          <button 
            onClick={handleSaveNotes}
            disabled={!notes.trim()}
          >
            Save Notes
          </button>
        </div>
      </div>
    );
  };
  
  const renderExecutionHistory = () => {
    if (executions.length <= 1) {
      return null;
    }
    
    return (
      <div className="query-execution__history">
        <h4>Execution History</h4>
        <div className="query-execution__history-list">
          {executions.map(execution => (
            <div 
              key={execution.id}
              className={`query-execution__history-item ${
                activeExecution?.id === execution.id ? 'active' : ''
              } ${
                execution.successful ? 'success' : 'error'
              }`}
              onClick={() => setActiveExecution(execution)}
            >
              <span className="query-execution__history-status">
                <span className={`icon-${execution.successful ? 'check' : 'error'}`}></span>
              </span>
              <span className="query-execution__history-time">
                {new Date(execution.executedAt).toLocaleString()}
              </span>
              <span className="query-execution__history-duration">
                {execution.executionTime}ms
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="query-execution">
      <div className="query-execution__content">
        <h3>Execute Query: {query.title}</h3>
        
        <div className="query-execution__query">
          <h4>Query</h4>
          <CodeEditor
            value={query.content}
            readOnly={true}
            language="javascript" // Adjust based on query type
            height="150px"
          />
        </div>
        
        {renderParameterInputs()}
        
        <div className="query-execution__actions">
          <button 
            className="query-execution__execute"
            onClick={handleExecute}
            disabled={state.loading.execution}
          >
            {state.loading.execution ? 'Executing...' : 'Execute'}
          </button>
        </div>
        
        {renderExecutionResult()}
        {renderExecutionHistory()}
      </div>
    </div>
  );
};

export default QueryExecution;
```

3. **Query Form Component**
```jsx
import React, { useState, useEffect } from 'react';
import { useLibrary, libraryActions } from '../../context/LibraryContext';
import CodeEditor from '../../components/common/CodeEditor';
import TagInput from '../../components/common/TagInput';
import './QueryForm.scss';

const QueryForm = ({ 
  query = null, 
  initialContent = null,
  onSave,
  onCancel
}) => {
  const { state, dispatch } = useLibrary();
  
  const [formData, setFormData] = useState({
    id: query?.id || null,
    title: query?.title || '',
    content: query?.content || initialContent || '',
    isTemplate: query?.isTemplate || false,
    templateParameters: query?.templateParameters || [],
    categoryId: query?.categoryId || state.preferences.defaultCategory || '',
    tags: query?.tags || [],
    notes: query?.notes || '',
    isStarred: query?.isStarred || false
  });
  
  const [newParameter, setNewParameter] = useState({
    name: '',
    description: '',
    defaultValue: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // Update form when query changes
  useEffect(() => {
    if (query) {
      setFormData({
        id: query.id,
        title: query.title,
        content: query.content,
        isTemplate: query.isTemplate,
        templateParameters: query.templateParameters || [],
        categoryId: query.categoryId,
        tags: query.tags,
        notes: query.notes,
        isStarred: query.isStarred
      });
    }
  }, [query]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const handleContentChange = (value) => {
    setFormData(prev => ({ ...prev, content: value }));
    
    // Clear error for content
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: null }));
    }
  };
  
  const handleTagsChange = (tags) => {
    setFormData(prev => ({ ...prev, tags }));
  };
  
  const handleParameterChange = (e, index) => {
    const { name, value } = e.target;
    const updatedParameters = [...formData.templateParameters];
    updatedParameters[index] = { ...updatedParameters[index], [name]: value };
    
    setFormData(prev => ({ 
      ...prev, 
      templateParameters: updatedParameters 
    }));
  };
  
  const handleNewParameterChange = (e) => {
    const { name, value } = e.target;
    setNewParameter(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddParameter = () => {
    if (!newParameter.name.trim()) return;
    
    setFormData(prev => ({ 
      ...prev, 
      templateParameters: [...prev.templateParameters, { ...newParameter }] 
    }));
    
    setNewParameter({
      name: '',
      description: '',
      defaultValue: ''
    });
  };
  
  const handleRemoveParameter = (index) => {
    const updatedParameters = [...formData.templateParameters];
    updatedParameters.splice(index, 1);
    
    setFormData(prev => ({ 
      ...prev, 
      templateParameters: updatedParameters 
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Query content is required';
    }
    
    if (formData.isTemplate && formData.templateParameters.length === 0) {
      newErrors.templateParameters = 'Template queries must have at least one parameter';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      dispatch(libraryActions.setLoading({ operations: true }));
      
      if (formData.id) {
        // Update existing query
        const response = await fetch(`/api/library/queries/${formData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        const updatedQuery = await response.json();
        dispatch(libraryActions.updateQuery(updatedQuery));
        
        if (onSave) {
          onSave(updatedQuery);
        }
      } else {
        // Create new query
        const response = await fetch('/api/library/queries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        const newQuery = await response.json();
        dispatch(libraryActions.addQuery(newQuery));
        
        if (onSave) {
          onSave(newQuery);
        }
      }
    } catch (error) {
      console.error('Error saving query:', error);
      dispatch(libraryActions.setError('Failed to save query'));
    } finally {
      dispatch(libraryActions.setLoading({ operations: false }));
    }
  };
  
  return (
    <form className="query-form" onSubmit={handleSubmit}>
      <div className="query-form__header">
        <h3>{formData.id ? 'Edit Query' : 'Create New Query'}</h3>
      </div>
      
      <div className="query-form__content">
        <div className="query-form__field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter query title"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <div className="query-form__error">{errors.title}</div>}
        </div>
        
        <div className="query-form__field">
          <label htmlFor="content">Query Content</label>
          <CodeEditor
            value={formData.content}
            onChange={handleContentChange}
            language="javascript" // Adjust based on query type
            height="200px"
            className={errors.content ? 'error' : ''}
          />
          {errors.content && <div className="query-form__error">{errors.content}</div>}
        </div>
        
        <div className="query-form__field">
          <label htmlFor="categoryId">Category</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Uncategorized</option>
            {state.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="query-form__field">
          <label htmlFor="tags">Tags</label>
          <TagInput
            tags={formData.tags}
            onChange={handleTagsChange}
            suggestions={state.tags.map(tag => tag.name)}
            placeholder="Add tags..."
          />
        </div>
        
        <div className="query-form__field">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add notes about this query..."
            rows={3}
          />
        </div>
        
        <div className="query-form__field query-form__checkbox">
          <input
            type="checkbox"
            id="isTemplate"
            name="isTemplate"
            checked={formData.isTemplate}
            onChange={handleChange}
          />
          <label htmlFor="isTemplate">This is a template query with parameters</label>
        </div>
        
        {formData.isTemplate && (
          <div className="query-form__template-section">
            <h4>Template Parameters</h4>
            {errors.templateParameters && (
              <div className="query-form__error">{errors.templateParameters}</div>
            )}
            
            {formData.templateParameters.length > 0 && (
              <div className="query-form__parameters">
                {formData.templateParameters.map((param, index) => (
                  <div key={index} className="query-form__parameter">
                    <div className="query-form__parameter-header">
                      <h5>Parameter {index + 1}</h5>
                      <button
                        type="button"
                        className="query-form__remove-parameter"
                        onClick={() => handleRemoveParameter(index)}
                      >
                        <span className="icon-delete"></span>
                      </button>
                    </div>
                    
                    <div className="query-form__parameter-field">
                      <label htmlFor={`param-name-${index}`}>Name</label>
                      <input
                        type="text"
                        id={`param-name-${index}`}
                        name="name"
                        value={param.name}
                        onChange={(e) => handleParameterChange(e, index)}
                        required
                      />
                    </div>
                    
                    <div className="query-form__parameter-field">
                      <label htmlFor={`param-description-${index}`}>Description</label>
                      <input
                        type="text"
                        id={`param-description-${index}`}
                        name="description"
                        value={param.description || ''}
                        onChange={(e) => handleParameterChange(e, index)}
                      />
                    </div>
                    
                    <div className="query-form__parameter-field">
                      <label htmlFor={`param-default-${index}`}>Default Value</label>
                      <input
                        type="text"
                        id={`param-default-${index}`}
                        name="defaultValue"
                        value={param.defaultValue || ''}
                        onChange={(e) => handleParameterChange(e, index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="query-form__add-parameter">
              <h5>Add New Parameter</h5>
              <div className="query-form__parameter-field">
                <label htmlFor="new-param-name">Name</label>
                <input
                  type="text"
                  id="new-param-name"
                  name="name"
                  value={newParameter.name}
                  onChange={handleNewParameterChange}
                  placeholder="Parameter name"
                />
              </div>
              
              <div className="query-form__parameter-field">
                <label htmlFor="new-param-description">Description</label>
                <input
                  type="text"
                  id="new-param-description"
                  name="description"
                  value={newParameter.description}
                  onChange={handleNewParameterChange}
                  placeholder="Parameter description"
                />
              </div>
              
              <div className="query-form__parameter-field">
                <label htmlFor="new-param-default">Default Value</label>
                <input
                  type="text"
                  id="new-param-default"
                  name="defaultValue"
                  value={newParameter.defaultValue}
                  onChange={handleNewParameterChange}
                  placeholder="Default value"
                />
              </div>
              
              <button
                type="button"
                className="query-form__add-parameter-button"
                onClick={handleAddParameter}
                disabled={!newParameter.name.trim()}
              >
                Add Parameter
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="query-form__actions">
        <button 
          type="button" 
          className="query-form__cancel" 
          onClick={onCancel}
        >
          Cancel
        </button>
        
        <button 
          type="submit" 
          className="query-form__save"
          disabled={state.loading.operations}
        >
          {state.loading.operations ? 'Saving...' : (formData.id ? 'Update' : 'Save')}
        </button>
      </div>
    </form>
  );
};

export default QueryForm;
```

### Testing Strategy
1. **Unit Tests**
   - Test individual components in isolation
   - Verify component rendering with different props
   - Test state changes and user interactions
   - Examples: QueryItem rendering, QueryExecution behavior, QueryForm validation

2. **Integration Tests**
   - Test interactions between components
   - Verify context providers work correctly with consumers
   - Test API service integration
   - Examples: Query creation flow, category management, search functionality

3. **End-to-End Tests**
   - Test complete user flows
   - Verify query creation, execution, and management
   - Test import/export functionality
   - Examples: Complete query lifecycle, category organization, search and filtering

## Acceptance Criteria

### Functionality Criteria
- AC1.1: Users can save queries from any relevant part of the application
- AC1.2: Queries are organized into user-defined categories and tags
- AC1.3: Users can search and filter queries by various criteria
- AC1.4: Query content is displayed with proper formatting
- AC1.5: Users can execute saved queries directly from the library
- AC1.6: Template queries support parameter substitution
- AC1.7: Users can export and import queries in supported formats

### Performance Criteria
- AC2.1: Query list loads within 2 seconds for collections up to 1000 queries
- AC2.2: Search operations complete within 2 seconds
- AC2.3: Query execution completes with appropriate feedback
- AC2.4: Category and tag filtering updates the display within 500ms
- AC2.5: Import/export operations provide progress feedback for large collections

### Quality Criteria
- AC3.1: UI matches the design specifications in both light and dark modes
- AC3.2: All text is legible with appropriate contrast ratios
- AC3.3: Interactive elements have clear hover and focus states
- AC3.4: Layout is responsive and functional across all target device sizes
- AC3.5: Query content maintains proper formatting and syntax highlighting

### Edge Case Handling
- AC4.1: Empty states provide clear guidance for users with no saved queries
- AC4.2: Very large queries are handled gracefully without performance issues
- AC4.3: Error states provide clear feedback and recovery options
- AC4.4: The interface remains usable during network interruptions
- AC4.5: Import validation provides clear feedback for invalid or incompatible files

## Development Resources

### Code Samples

#### Library Page Component
```jsx
import React, { useEffect, useState } from 'react';
import { useLibrary, libraryActions } from '../../context/LibraryContext';
import { useTheme } from '../../context/ThemeContext';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import CategorySidebar from './components/CategorySidebar';
import QueryList from './components/QueryList';
import QueryDetail from './components/QueryDetail';
import QueryExecution from './components/QueryExecution';
import SearchFilters from './components/SearchFilters';
import QueryForm from './components/QueryForm';
import ImportExport from './components/ImportExport';
import { 
  fetchQueries, 
  fetchCategories,
  fetchTags,
  fetchSavedSearches
} from '../../services/libraryService';
import './Library.scss';

const Library = () => {
  const { state, dispatch } = useLibrary();
  const { theme } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [showExecution, setShowExecution] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [editingQuery, setEditingQuery] = useState(null);
  
  // Load queries, categories, and tags on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(libraryActions.setLoading({
          queries: true,
          categories: true,
          tags: true
        }));
        
        // Fetch categories, tags, and saved searches first
        const [categories, tags, savedSearches] = await Promise.all([
          fetchCategories(),
          fetchTags(),
          fetchSavedSearches()
        ]);
        
        dispatch(libraryActions.setCategories(categories));
        dispatch(libraryActions.setTags(tags));
        dispatch(libraryActions.setSavedSearches(savedSearches));
        
        // Then fetch queries with any active filters
        await loadQueries();
        
        dispatch(libraryActions.setError(null));
      } catch (error) {
        console.error('Error loading library data:', error);
        dispatch(libraryActions.setError('Failed to load library data. Please try again.'));
      } finally {
        dispatch(libraryActions.setLoading({
          categories: false,
          tags: false
        }));
      }
    };
    
    loadData();
    
    // Load user preferences
    const loadPreferences = async () => {
      try {
        const preferences = await fetch('/api/library/preferences').then(res => res.json());
        dispatch(libraryActions.setPreferences(preferences));
        
        // Apply preferences
        dispatch(libraryActions.setView(preferences.defaultView));
        dispatch(libraryActions.setSort(
          preferences.defaultSortBy, 
          preferences.defaultSortDirection
        ));
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    };
    
    loadPreferences();
  }, [dispatch]);
  
  // Load queries when filters change
  useEffect(() => {
    loadQueries();
  }, [
    state.selectedCategory, 
    state.selectedTags, 
    state.searchQuery, 
    state.filters, 
    state.sortBy, 
    state.sortDirection,
    state.pagination.page
  ]);
  
  const loadQueries = async () => {
    try {
      dispatch(libraryActions.setLoading({ queries: true }));
      
      // Prepare query parameters
      const params = new URLSearchParams();
      
      if (state.selectedCategory) {
        params.append('categoryId', state.selectedCategory.id);
      }
      
      if (state.selectedTags.length > 0) {
        params.append('tags', state.selectedTags.join(','));
      }
      
      if (state.searchQuery) {
        params.append('query', state.searchQuery);
      }
      
      if (state.filters.isTemplate !== null) {
        params.append('isTemplate', state.filters.isTemplate.toString());
      }
      
      if (state.filters.dateRange) {
        if (state.filters.dateRange.start) {
          params.append('startDate', state.filters.dateRange.start.toISOString());
        }
        if (state.filters.dateRange.end) {
          params.append('endDate', state.filters.dateRange.end.toISOString());
        }
      }
      
      params.append('sortBy', state.sortBy);
      params.append('sortDirection', state.sortDirection);
      params.append('page', state.pagination.page);
      params.append('limit', state.pagination.limit);
      
      // Fetch queries
      const result = await fetchQueries(params);
      
      dispatch(libraryActions.setQueries(result.queries));
      dispatch(libraryActions.setPagination({
        total: result.total
      }));
      
      // If a query was selected but is no longer in the results, deselect it
      if (state.selectedQuery && !result.queries.find(q => q.id === state.selectedQuery.id)) {
        dispatch(libraryActions.selectQuery(null));
        setShowExecution(false);
      }
    } catch (error) {
      console.error('Error loading queries:', error);
      dispatch(libraryActions.setError('Failed to load queries'));
    } finally {
      dispatch(libraryActions.setLoading({ queries: false }));
    }
  };
  
  const handleSelectQuery = (query) => {
    dispatch(libraryActions.selectQuery(query));
    setShowExecution(false);
  };
  
  const handleAddQuery = () => {
    setEditingQuery(null);
    setShowForm(true);
    setShowExecution(false);
  };
  
  const handleEditQuery = (query) => {
    setEditingQuery(query);
    setShowForm(true);
    setShowExecution(false);
  };
  
  const handleExecuteQuery = (query) => {
    dispatch(libraryActions.selectQuery(query));
    setShowExecution(true);
    setShowForm(false);
  };
  
  const handleSaveQuery = (query) => {
    setShowForm(false);
    setEditingQuery(null);
    
    // If we're in a filtered view, reload queries to ensure the new/updated
    // query appears if it matches the current filters
    if (state.selectedCategory || state.selectedTags.length > 0 || 
        state.searchQuery || state.filters.isTemplate !== null) {
      loadQueries();
    }
  };
  
  const handleExecutionComplete = () => {
    // Optionally reload the query to update execution count
    if (state.selectedQuery) {
      fetch(`/api/library/queries/${state.selectedQuery.id}`)
        .then(res => res.json())
        .then(query => {
          dispatch(libraryActions.updateQuery(query));
        })
        .catch(error => {
          console.error('Error refreshing query:', error);
        });
    }
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingQuery(null);
  };
  
  const handleToggleImportExport = () => {
    setShowImportExport(!showImportExport);
    setShowForm(false);
    setShowExecution(false);
  };
  
  const handleImportComplete = () => {
    setShowImportExport(false);
    loadQueries();
  };
  
  return (
    <div className={`library library--${theme}`}>
      <Sidebar />
      
      <main className="library__main">
        <Header title="Query Library" />
        
        <div className="library__container">
          {state.error && (
            <div className="library__error">
              {state.error}
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}
          
          <div className="library__layout">
            <div className="library__sidebar">
              <CategorySidebar />
            </div>
            
            <div className="library__content">
              <div className="library__header">
                <SearchFilters />
                
                <div className="library__actions">
                  <button 
                    className="library__add-button"
                    onClick={handleAddQuery}
                  >
                    Add Query
                  </button>
                  
                  <button 
                    className="library__import-export-button"
                    onClick={handleToggleImportExport}
                  >
                    Import/Export
                  </button>
                  
                  <div className="library__view-toggle">
                    <button 
                      className={`view-toggle__button ${state.view === 'list' ? 'active' : ''}`}
                      onClick={() => dispatch(libraryActions.setView('list'))}
                      aria-label="List view"
                    >
                      <span className="icon-list"></span>
                    </button>
                    
                    <button 
                      className={`view-toggle__button ${state.view === 'grid' ? 'active' : ''}`}
                      onClick={() => dispatch(libraryActions.setView('grid'))}
                      aria-label="Grid view"
                    >
                      <span className="icon-grid"></span>
                    </button>
                  </div>
                </div>
              </div>
              
              {showImportExport ? (
                <ImportExport onComplete={handleImportComplete} />
              ) : showForm ? (
                <QueryForm 
                  query={editingQuery}
                  onSave={handleSaveQuery}
                  onCancel={handleCancelForm}
                />
              ) : showExecution && state.selectedQuery ? (
                <QueryExecution 
                  query={state.selectedQuery}
                  onExecutionComplete={handleExecutionComplete}
                />
              ) : state.selectedQuery && !showExecution ? (
                <QueryDetail 
                  query={state.selectedQuery}
                  onEdit={() => handleEditQuery(state.selectedQuery)}
                  onExecute={() => handleExecuteQuery(state.selectedQuery)}
                  onBack={() => dispatch(libraryActions.selectQuery(null))}
                />
              ) : (
                <QueryList 
                  queries={state.queries}
                  loading={state.loading.queries}
                  view={state.view}
                  onSelectQuery={handleSelectQuery}
                  onExecuteQuery={handleExecuteQuery}
                  pagination={state.pagination}
                  onPageChange={(page) => dispatch(libraryActions.setPagination({ page }))}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Library;
```

#### SCSS Styling
```scss
// Library.scss
@import '../../styles/variables';
@import '../../styles/mixins';

.library {
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
  
  &__layout {
    display: flex;
    height: calc(100vh - 180px);
    
    @include media-breakpoint-down(md) {
      flex-direction: column;
      height: auto;
    }
  }
  
  &__sidebar {
    width: 280px;
    border-right: 1px solid var(--border-color);
    overflow-y: auto;
    
    @include media-breakpoint-down(md) {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid var(--border-color);
      max-height: 300px;
    }
  }
  
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  &__header {
    padding: $spacing-md;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @include media-breakpoint-down(sm) {
      flex-direction: column;
      align-items: stretch;
      gap: $spacing-sm;
    }
  }
  
  &__actions {
    display: flex;
    gap: $spacing-sm;
    
    @include media-breakpoint-down(sm) {
      justify-content: space-between;
    }
  }
  
  &__add-button,
  &__import-export-button {
    padding: $spacing-sm $spacing-md;
    border-radius: $border-radius;
    cursor: pointer;
    font-weight: 500;
  }
  
  &__add-button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    
    &:hover {
      background-color: var(--primary-color-dark);
    }
  }
  
  &__import-export-button {
    background-color: transparent;
    border: 1px solid var(--border-color);
    
    &:hover {
      background-color: var(--hover-color);
    }
  }
  
  &__view-toggle {
    display: flex;
    border: 1px solid var(--border-color);
    border-radius: $border-radius;
    overflow: hidden;
    
    .view-toggle__button {
      padding: $spacing-sm;
      background-color: transparent;
      border: none;
      cursor: pointer;
      
      &:hover {
        background-color: var(--hover-color);
      }
      
      &.active {
        background-color: var(--primary-color);
        color: white;
      }
    }
  }
}

// QueryItem.scss
.query-item {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: $border-radius;
  margin-bottom: $spacing-sm;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  &--selected {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 1px var(--primary-color);
  }
  
  &--list {
    padding: $spacing-md;
  }
  
  &--grid {
    padding: $spacing-sm;
    height: 200px;
    display: flex;
    flex-direction: column;
  }
  
  &--compact {
    padding: $spacing-xs;
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }
  
  &__header {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-sm;
    
    .query-item--compact & {
      margin-bottom: 0;
      flex: 1;
    }
  }
  
  &__type {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
  }
  
  &__title {
    flex: 1;
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    
    .query-item--grid & {
      font-size: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
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
      
      &.active {
        color: var(--primary-color);
      }
    }
  }
  
  &__preview {
    margin-bottom: $spacing-sm;
    overflow: hidden;
    
    .query-item--grid & {
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      font-size: 0.85rem;
    }
  }
  
  &__content {
    background-color: var(--code-bg);
    padding: $spacing-sm;
    border-radius: $border-radius;
    font-family: monospace;
    font-size: 0.85rem;
    overflow: hidden;
    white-space: pre-wrap;
    margin: 0;
  }
  
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--text-secondary);
    
    .query-item--compact & {
      display: none;
    }
  }
  
  &__category {
    background-color: var(--tag-bg);
    padding: 2px 6px;
    border-radius: 12px;
  }
  
  &__tags {
    display: flex;
    gap: $spacing-xs;
  }
  
  &__tag {
    background-color: var(--tag-bg);
    padding: 2px 6px;
    border-radius: 12px;
  }
  
  &__tag-more {
    color: var(--text-secondary);
  }
  
  &__meta {
    display: flex;
    gap: $spacing-sm;
    font-size: 0.75rem;
  }
}

// QueryExecution.scss
.query-execution {
  background-color: var(--card-bg);
  border-radius: $border-radius;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &__content {
    padding: $spacing-md;
  }
  
  h3 {
    margin-top: 0;
    margin-bottom: $spacing-md;
    font-size: 1.2rem;
  }
  
  h4 {
    margin-top: 0;
    margin-bottom: $spacing-sm;
    font-size: 1rem;
  }
  
  h5 {
    margin-top: 0;
    margin-bottom: $spacing-xs;
    font-size: 0.9rem;
  }
  
  &__query {
    margin-bottom: $spacing-md;
  }
  
  &__parameters {
    margin-bottom: $spacing-md;
    
    .query-execution__parameter {
      margin-bottom: $spacing-sm;
      
      label {
        display: block;
        margin-bottom: $spacing-xs;
        font-weight: 500;
      }
      
      input {
        width: 100%;
        padding: $spacing-sm;
        border: 1px solid var(--border-color);
        border-radius: $border-radius;
        background-color: var(--input-bg);
        color: var(--text-color);
        
        &:focus {
          border-color: var(--primary-color);
          outline: none;
        }
      }
    }
    
    .query-execution__parameter-description {
      margin: 0 0 $spacing-xs;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }
  }
  
  &__actions {
    margin-bottom: $spacing-md;
    
    .query-execution__execute {
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
      
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
  
  &__result {
    margin-bottom: $spacing-md;
    border: 1px solid var(--border-color);
    border-radius: $border-radius;
    overflow: hidden;
  }
  
  &__result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-sm $spacing-md;
    background-color: var(--card-header-bg);
    border-bottom: 1px solid var(--border-color);
    
    h4 {
      margin: 0;
    }
    
    .query-execution__result-time {
      font-size: 0.85rem;
      color: var(--text-secondary);
    }
  }
  
  &__result-content {
    padding: $spacing-md;
  }
  
  &__error {
    padding: $spacing-md;
    color: var(--error-text);
    background-color: var(--error-bg);
    border-radius: $border-radius;
    
    p {
      margin: 0;
    }
  }
  
  &__notes {
    padding: $spacing-md;
    border-top: 1px solid var(--border-color);
    
    h5 {
      margin-top: 0;
      margin-bottom: $spacing-xs;
    }
    
    p {
      margin: 0;
      font-size: 0.9rem;
    }
  }
  
  &__add-notes {
    padding: $spacing-md;
    border-top: 1px solid var(--border-color);
    
    textarea {
      width: 100%;
      padding: $spacing-sm;
      border: 1px solid var(--border-color);
      border-radius: $border-radius;
      background-color: var(--input-bg);
      color: var(--text-color);
      resize: vertical;
      margin-bottom: $spacing-sm;
      
      &:focus {
        border-color: var(--primary-color);
        outline: none;
      }
    }
    
    button {
      padding: $spacing-xs $spacing-sm;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: $border-radius;
      cursor: pointer;
      
      &:hover {
        background-color: var(--primary-color-dark);
      }
      
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
  
  &__empty {
    padding: $spacing-md;
    text-align: center;
    color: var(--text-secondary);
  }
  
  &__history {
    margin-top: $spacing-md;
  }
  
  &__history-list {
    border: 1px solid var(--border-color);
    border-radius: $border-radius;
    overflow: hidden;
  }
  
  &__history-item {
    display: flex;
    align-items: center;
    padding: $spacing-sm $spacing-md;
    cursor: pointer;
    border-bottom: 1px solid var(--border-color);
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background-color: var(--hover-color);
    }
    
    &.active {
      background-color: var(--primary-color-light);
    }
    
    &.success .query-execution__history-status {
      color: var(--success-color);
    }
    
    &.error .query-execution__history-status {
      color: var(--error-text);
    }
  }
  
  &__history-status {
    margin-right: $spacing-sm;
  }
  
  &__history-time {
    flex: 1;
    font-size: 0.85rem;
  }
  
  &__history-duration {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
}
```

### Reference Implementations
- [GitHub Gists](https://gist.github.com/)
- [Postman Collections](https://www.postman.com/collection/)
- [Jupyter Notebooks](https://jupyter.org/)
- [VS Code Snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

### Recommended Libraries
- **React CodeMirror**: For code editing and syntax highlighting
- **React DnD**: For drag-and-drop organization
- **React Tags Input**: For tag management
- **React Virtualized**: For efficient rendering of large query collections
- **React Select**: For advanced dropdown and filtering components

### Documentation Links
- [React Context API Documentation](https://reactjs.org/docs/context.html)
- [CodeMirror Documentation](https://codemirror.net/docs/)
- [CSS Grid Layout Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
