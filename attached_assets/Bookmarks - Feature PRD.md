# Bookmarks - Feature PRD

## Overview

### Feature Description
The Bookmarks feature allows users to save, organize, and quickly access important content from their Code Buddy interactions. Users can bookmark useful code snippets, optimization suggestions, chat conversations, and other valuable resources for future reference. The feature provides a structured way to manage these saved items with customizable categories, tags, and search capabilities, creating a personalized knowledge repository that enhances productivity and learning.

### Purpose and Goals
- Provide a centralized location for saving and organizing valuable content
- Enable quick retrieval of previously useful code snippets and solutions
- Support knowledge retention and reuse across projects
- Allow customizable organization through categories, tags, and notes
- Facilitate sharing of bookmarked content with team members
- Create a personalized learning resource that grows with usage

### User Value Proposition
The Bookmarks feature enhances the developer experience by:
- Reducing time spent searching for previously discovered solutions
- Creating a personalized knowledge base of code examples and best practices
- Enabling efficient knowledge transfer between projects and team members
- Supporting continuous learning through organized reference materials
- Providing quick access to frequently used code patterns and techniques
- Allowing customization to match individual workflow and organization preferences

### Scope
This PRD covers the Bookmarks feature of the Code Buddy application, including:
- Bookmark creation and management interface
- Organization system with categories and tags
- Search and filtering capabilities
- Bookmark content display and interaction
- Import/export functionality
- Sharing options
- Responsive design considerations

## User Stories

### Primary User Stories
1. As a developer, I want to bookmark useful code snippets so I can quickly reference them in future projects.
2. As a developer, I want to organize my bookmarks with custom categories and tags so I can find them efficiently.
3. As a developer, I want to search across my bookmarked content so I can quickly find specific information.
4. As a developer, I want to add personal notes to bookmarks so I can remember why they were useful or how to apply them.
5. As a developer, I want to export my bookmarks so I can share them with colleagues or transfer them between devices.
6. As a developer, I want to see a preview of bookmarked content so I can quickly identify the right bookmark without opening it.
7. As a developer, I want to bookmark entire conversations or specific messages so I can reference complete solutions.

### Edge Cases
1. As a user with hundreds of bookmarks, I want efficient navigation and filtering so I can manage a large collection without performance issues.
2. As a user working across multiple devices, I want my bookmarks to be synchronized so I have consistent access to my saved content.
3. As a user with specific organizational needs, I want to create nested categories so I can implement a hierarchical organization system.
4. As a user with accessibility needs, I want the bookmarks interface to be fully navigable via keyboard and screen reader.
5. As a user who accidentally bookmarks content, I want to easily remove or edit bookmarks so I can maintain a clean collection.

### User Flow
1. User identifies valuable content during a Code Buddy interaction (chat, optimization, etc.)
2. User clicks the bookmark icon associated with the content
3. System displays a bookmark creation dialog with:
   - Auto-populated content preview
   - Category selection (existing or new)
   - Tag input field
   - Optional notes field
4. User completes the form and saves the bookmark
5. System confirms the bookmark was saved
6. Later, user navigates to the Bookmarks feature from the sidebar
7. User can:
   - Browse bookmarks by category
   - Filter by tags or other criteria
   - Search for specific content
   - View, edit, or delete bookmarks
   - Export selected bookmarks
   - Share bookmarks with team members

## Requirements

### Functional Requirements

#### Bookmark Creation and Management
- FR1.1: Provide bookmark buttons/icons in all relevant areas of the application (chat messages, code snippets, optimization suggestions)
- FR1.2: Display a bookmark creation dialog with fields for category, tags, and notes
- FR1.3: Support editing of existing bookmarks (category, tags, notes, title)
- FR1.4: Enable deletion of bookmarks with confirmation
- FR1.5: Allow batch operations on multiple bookmarks (delete, categorize, export)
- FR1.6: Implement bookmark creation keyboard shortcuts

#### Organization System
- FR2.1: Support user-defined categories with custom names and optional descriptions
- FR2.2: Enable tagging of bookmarks with multiple user-defined tags
- FR2.3: Allow reordering of bookmarks within categories
- FR2.4: Support moving bookmarks between categories
- FR2.5: Provide default categories for common content types (Code Snippets, Chat Conversations, Optimization Suggestions)
- FR2.6: Allow category management (create, rename, delete, merge)
- FR2.7: Support nested categories (at least one level of subcategories)

#### Search and Filtering
- FR3.1: Implement full-text search across all bookmarked content
- FR3.2: Provide filtering by category, tag, date, and content type
- FR3.3: Support combined search and filter operations
- FR3.4: Display search results with relevant context and highlights
- FR3.5: Save frequent searches for quick access
- FR3.6: Sort bookmarks by various criteria (date, name, usage frequency)
- FR3.7: Implement type-ahead suggestions in search field

#### Content Display and Interaction
- FR4.1: Show preview of bookmarked content in list view
- FR4.2: Display full content with proper formatting when bookmark is selected
- FR4.3: For code snippets, maintain syntax highlighting and allow copying
- FR4.4: For chat conversations, preserve the interactive nature where applicable
- FR4.5: Support direct navigation to the original context of the bookmark
- FR4.6: Enable in-place editing of bookmarked content when appropriate
- FR4.7: Provide a reading mode for distraction-free viewing

#### Import/Export and Sharing
- FR5.1: Export bookmarks in common formats (JSON, HTML, Markdown)
- FR5.2: Import bookmarks from supported formats
- FR5.3: Generate shareable links for individual bookmarks
- FR5.4: Support exporting selected bookmarks or entire categories
- FR5.5: Enable direct sharing to common platforms (email, Slack, etc.)
- FR5.6: Provide options for controlling access to shared bookmarks

### Technical Requirements
- TR1.1: Implement responsive design that adapts to desktop, tablet, and mobile viewports
- TR1.2: Ensure theme implementation follows the design system color palette for light/dark modes
- TR1.3: Optimize bookmark storage for efficient retrieval and searching
- TR1.4: Implement client-side caching to improve performance with large bookmark collections
- TR1.5: Support offline access to bookmarked content when possible
- TR1.6: Ensure accessibility compliance for screen readers and keyboard navigation
- TR1.7: Implement efficient state management for bookmark operations

### Dependencies
- DE1.1: Authentication system for user identification and data access
- DE1.2: Storage system for bookmark data and content
- DE1.3: Search indexing system for efficient content retrieval
- DE1.4: Sharing and permission system for collaborative features
- DE1.5: Code syntax highlighting library for code snippet display

### Constraints
- CO1.1: Must maintain visual consistency with the overall Code Buddy design system
- CO1.2: Must support all modern browsers (Chrome, Firefox, Safari, Edge)
- CO1.3: Must be fully responsive for screen sizes from 320px to 1440px+
- CO1.4: Must comply with WCAG 2.1 AA accessibility standards
- CO1.5: Individual bookmark size must not exceed 1MB for performance reasons
- CO1.6: Search operations must complete within 2 seconds for collections up to 1000 bookmarks

## UI/UX Specifications

### UI Components
1. **Bookmarks Page Layout**
   - Sidebar with categories and tags
   - Main content area with bookmark list and detail view
   - Search and filter controls at the top
   - Action buttons for batch operations

2. **Bookmark List Item**
   - Title/preview of content
   - Category and tags indicators
   - Creation/modification date
   - Content type icon
   - Quick action buttons (edit, delete, share)

3. **Bookmark Detail View**
   - Full content display with proper formatting
   - Metadata section (category, tags, dates)
   - User notes
   - Action buttons (edit, delete, share, export)
   - Navigation to original context

4. **Bookmark Creation/Edit Dialog**
   - Content preview
   - Title input field
   - Category selector (with create new option)
   - Tags input field with suggestions
   - Notes text area
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
   - Content type filter
   - Sort order selector

7. **Import/Export Interface**
   - Format selection
   - Selection controls for partial export
   - File picker for import
   - Progress indicator
   - Success/error feedback

### Interaction Design
- Bookmark list should support both list and grid views
- Category sidebar should be collapsible to maximize screen space
- Detail view should open in-place or in a side panel depending on screen size
- Drag-and-drop should be supported for organizing bookmarks
- Search should update results in real-time as the user types
- Bookmark creation should be accessible from anywhere in the application
- Context menus should provide quick access to common actions

### Responsive Design Considerations
- **Desktop (1024px+)**
  - Three-column layout: categories, bookmark list, detail view
  - Expanded metadata and action buttons
  - Grid view option for bookmarks
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
// Bookmark
interface Bookmark {
  id: string;
  userId: string;
  title: string;
  contentType: 'code' | 'chat' | 'optimization' | 'note' | 'other';
  content: string;
  originalContext?: {
    feature: string;
    itemId: string;
    url?: string;
  };
  categoryId: string;
  tags: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt?: Date;
  accessCount: number;
  isStarred: boolean;
  isShared: boolean;
  sharedWith?: string[]; // User IDs
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
  bookmarkCount: number;
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
    contentTypes?: string[];
    dateRange?: {
      start?: Date;
      end?: Date;
    };
  };
  sortBy: 'title' | 'createdAt' | 'updatedAt' | 'lastAccessedAt' | 'accessCount';
  sortDirection: 'asc' | 'desc';
  isSaved: boolean;
  name?: string; // For saved searches
  createdAt?: Date;
  updatedAt?: Date;
}

// Bookmark Export
interface BookmarkExport {
  version: string;
  exportDate: Date;
  userId: string;
  bookmarks: Bookmark[];
  categories: Category[];
  tags: Tag[];
}

// User Preferences
interface BookmarkPreferences {
  defaultView: 'list' | 'grid';
  defaultSortBy: 'title' | 'createdAt' | 'updatedAt' | 'lastAccessedAt' | 'accessCount';
  defaultSortDirection: 'asc' | 'desc';
  showPreview: boolean;
  previewSize: 'small' | 'medium' | 'large';
  sidebarExpanded: boolean;
  defaultCategory: string;
}
```

### API Requirements
1. **Get Bookmarks**
   - Endpoint: `GET /api/bookmarks`
   - Query Parameters: 
     - `categoryId` (optional)
     - `tags` (optional, comma-separated)
     - `query` (optional search term)
     - `contentType` (optional)
     - `sortBy` and `sortDirection` (optional)
     - `page` and `limit` (for pagination)
   - Response: Array of Bookmark objects with pagination metadata

2. **Get Bookmark**
   - Endpoint: `GET /api/bookmarks/{bookmarkId}`
   - Response: Bookmark object

3. **Create Bookmark**
   - Endpoint: `POST /api/bookmarks`
   - Request Body: Bookmark object (without id)
   - Response: Created Bookmark object

4. **Update Bookmark**
   - Endpoint: `PUT /api/bookmarks/{bookmarkId}`
   - Request Body: Partial Bookmark object
   - Response: Updated Bookmark object

5. **Delete Bookmark**
   - Endpoint: `DELETE /api/bookmarks/{bookmarkId}`
   - Response: Success confirmation

6. **Get Categories**
   - Endpoint: `GET /api/bookmarks/categories`
   - Response: Array of Category objects

7. **Create Category**
   - Endpoint: `POST /api/bookmarks/categories`
   - Request Body: Category object (without id)
   - Response: Created Category object

8. **Update Category**
   - Endpoint: `PUT /api/bookmarks/categories/{categoryId}`
   - Request Body: Partial Category object
   - Response: Updated Category object

9. **Delete Category**
   - Endpoint: `DELETE /api/bookmarks/categories/{categoryId}`
   - Query Parameters: `moveBookmarksTo` (optional categoryId)
   - Response: Success confirmation

10. **Get Tags**
    - Endpoint: `GET /api/bookmarks/tags`
    - Response: Array of Tag objects

11. **Search Bookmarks**
    - Endpoint: `POST /api/bookmarks/search`
    - Request Body: SearchQuery object
    - Response: Array of Bookmark objects with pagination metadata

12. **Export Bookmarks**
    - Endpoint: `POST /api/bookmarks/export`
    - Request Body: 
      ```
      {
        format: 'json' | 'html' | 'markdown',
        bookmarkIds?: string[], // If not provided, export all
        categoryIds?: string[] // If not provided, export all
      }
      ```
    - Response: BookmarkExport object or file download

13. **Import Bookmarks**
    - Endpoint: `POST /api/bookmarks/import`
    - Request Body: FormData with file
    - Response: Import summary with success/failure counts

14. **Get User Preferences**
    - Endpoint: `GET /api/bookmarks/preferences`
    - Response: BookmarkPreferences object

15. **Update User Preferences**
    - Endpoint: `PUT /api/bookmarks/preferences`
    - Request Body: Partial BookmarkPreferences object
    - Response: Updated BookmarkPreferences object

### State Management
The Bookmarks feature will use React Context for global state management:

```jsx
// BookmarksContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  bookmarks: [],
  categories: [],
  tags: [],
  selectedBookmark: null,
  selectedCategory: null,
  selectedTags: [],
  searchQuery: '',
  filters: {
    contentType: null,
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
  preferences: {
    defaultView: 'list',
    defaultSortBy: 'updatedAt',
    defaultSortDirection: 'desc',
    showPreview: true,
    previewSize: 'medium',
    sidebarExpanded: true,
    defaultCategory: null
  },
  loading: {
    bookmarks: false,
    categories: false,
    tags: false,
    operations: false
  },
  error: null
};

// Action types
const ActionTypes = {
  SET_BOOKMARKS: 'SET_BOOKMARKS',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_TAGS: 'SET_TAGS',
  SELECT_BOOKMARK: 'SELECT_BOOKMARK',
  SELECT_CATEGORY: 'SELECT_CATEGORY',
  SELECT_TAGS: 'SELECT_TAGS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_FILTERS: 'SET_FILTERS',
  SET_SORT: 'SET_SORT',
  SET_VIEW: 'SET_VIEW',
  SET_PAGINATION: 'SET_PAGINATION',
  SET_PREFERENCES: 'SET_PREFERENCES',
  ADD_BOOKMARK: 'ADD_BOOKMARK',
  UPDATE_BOOKMARK: 'UPDATE_BOOKMARK',
  REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
  ADD_CATEGORY: 'ADD_CATEGORY',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  REMOVE_CATEGORY: 'REMOVE_CATEGORY',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  RESET_STATE: 'RESET_STATE'
};

// Reducer
const bookmarksReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_BOOKMARKS:
      return { ...state, bookmarks: action.payload };
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ActionTypes.SET_TAGS:
      return { ...state, tags: action.payload };
    case ActionTypes.SELECT_BOOKMARK:
      return { ...state, selectedBookmark: action.payload };
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
    case ActionTypes.SET_PREFERENCES:
      return { 
        ...state, 
        preferences: { ...state.preferences, ...action.payload } 
      };
    case ActionTypes.ADD_BOOKMARK:
      return { 
        ...state, 
        bookmarks: [action.payload, ...state.bookmarks] 
      };
    case ActionTypes.UPDATE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.map(bookmark => 
          bookmark.id === action.payload.id ? { ...bookmark, ...action.payload } : bookmark
        ),
        selectedBookmark: state.selectedBookmark?.id === action.payload.id 
          ? { ...state.selectedBookmark, ...action.payload } 
          : state.selectedBookmark
      };
    case ActionTypes.REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== action.payload),
        selectedBookmark: state.selectedBookmark?.id === action.payload 
          ? null 
          : state.selectedBookmark
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
const BookmarksContext = createContext();

// Provider component
export const BookmarksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookmarksReducer, initialState);
  
  return (
    <BookmarksContext.Provider value={{ state, dispatch }}>
      {children}
    </BookmarksContext.Provider>
  );
};

// Custom hook for using the bookmarks context
export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};

// Action creators
export const bookmarksActions = {
  setBookmarks: (bookmarks) => ({
    type: ActionTypes.SET_BOOKMARKS,
    payload: bookmarks
  }),
  setCategories: (categories) => ({
    type: ActionTypes.SET_CATEGORIES,
    payload: categories
  }),
  setTags: (tags) => ({
    type: ActionTypes.SET_TAGS,
    payload: tags
  }),
  selectBookmark: (bookmark) => ({
    type: ActionTypes.SELECT_BOOKMARK,
    payload: bookmark
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
  setPreferences: (preferences) => ({
    type: ActionTypes.SET_PREFERENCES,
    payload: preferences
  }),
  addBookmark: (bookmark) => ({
    type: ActionTypes.ADD_BOOKMARK,
    payload: bookmark
  }),
  updateBookmark: (bookmark) => ({
    type: ActionTypes.UPDATE_BOOKMARK,
    payload: bookmark
  }),
  removeBookmark: (bookmarkId) => ({
    type: ActionTypes.REMOVE_BOOKMARK,
    payload: bookmarkId
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
   - Implement pagination for bookmark lists
   - Use infinite scrolling for large collections
   - Prefetch adjacent pages for smoother navigation
   - Cache frequently accessed bookmarks

2. **Search Performance**
   - Implement debouncing for search input
   - Use client-side filtering for small collections
   - Optimize server-side search for large collections
   - Consider using a dedicated search index for full-text search

3. **Rendering Efficiency**
   - Use virtualized lists for large bookmark collections
   - Implement lazy loading for bookmark content
   - Optimize preview generation for different content types
   - Use memoization for expensive computations

4. **Storage Considerations**
   - Implement efficient storage strategies for large bookmark collections
   - Consider using IndexedDB for client-side caching
   - Optimize content storage to minimize redundancy
   - Implement compression for large text content

## Implementation Guidelines

### Component Structure
```
src/
├── pages/
│   └── Bookmarks/
│       ├── index.jsx                 # Main Bookmarks page component
│       ├── Bookmarks.scss            # Bookmarks page styles
│       └── components/               # Bookmarks-specific components
│           ├── BookmarksList.jsx     # List of bookmarks
│           ├── BookmarkItem.jsx      # Individual bookmark list item
│           ├── BookmarkDetail.jsx    # Detailed view of a bookmark
│           ├── CategorySidebar.jsx   # Sidebar with categories
│           ├── SearchFilters.jsx     # Search and filter controls
│           ├── BookmarkForm.jsx      # Create/edit bookmark form
│           ├── CategoryForm.jsx      # Create/edit category form
│           └── ImportExport.jsx      # Import/export interface
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx              # Sidebar navigation
│   │   └── Header.jsx               # Application header
│   └── common/
│       ├── TagInput.jsx             # Reusable tag input component
│       ├── CodeViewer.jsx           # Code display with syntax highlighting
│       └── EmptyState.jsx           # Empty state placeholder
└── context/
    └── BookmarksContext.jsx         # Bookmarks context provider
```

### Code Architecture
The Bookmarks feature will follow a component-based architecture with:

1. **Container Components**
   - Manage data fetching and state
   - Connect to API services and context providers
   - Handle business logic for bookmarks functionality
   - Examples: Bookmarks page, BookmarksList, CategorySidebar

2. **Presentational Components**
   - Focus on rendering UI based on props
   - Handle local UI state (hover, expand/collapse, etc.)
   - Examples: BookmarkItem, BookmarkDetail, TagInput

3. **Custom Hooks**
   - Extract reusable logic into custom hooks
   - Examples: `useBookmarkOperations`, `useCategories`, `useSearch`

### Reusable Components
1. **Bookmark Item Component**
```jsx
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useBookmarks, bookmarksActions } from '../../context/BookmarksContext';
import './BookmarkItem.scss';

const BookmarkItem = ({ 
  bookmark, 
  isSelected = false,
  view = 'list',
  onSelect
}) => {
  const { dispatch } = useBookmarks();
  
  const handleSelect = () => {
    if (onSelect) {
      onSelect(bookmark);
    }
  };
  
  const handleStar = (e) => {
    e.stopPropagation();
    dispatch(bookmarksActions.updateBookmark({
      id: bookmark.id,
      isStarred: !bookmark.isStarred
    }));
  };
  
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      dispatch(bookmarksActions.removeBookmark(bookmark.id));
    }
  };
  
  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'code':
        return 'icon-code';
      case 'chat':
        return 'icon-chat';
      case 'optimization':
        return 'icon-optimization';
      case 'note':
        return 'icon-note';
      default:
        return 'icon-bookmark';
    }
  };
  
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  };
  
  const getPreviewContent = () => {
    switch (bookmark.contentType) {
      case 'code':
        return (
          <pre className="bookmark-item__code-preview">
            {truncateText(bookmark.content, view === 'list' ? 100 : 50)}
          </pre>
        );
      case 'chat':
        return (
          <div className="bookmark-item__chat-preview">
            {truncateText(bookmark.content, view === 'list' ? 150 : 75)}
          </div>
        );
      default:
        return (
          <div className="bookmark-item__text-preview">
            {truncateText(bookmark.content, view === 'list' ? 200 : 100)}
          </div>
        );
    }
  };
  
  return (
    <div 
      className={`bookmark-item bookmark-item--${view} ${isSelected ? 'bookmark-item--selected' : ''}`}
      onClick={handleSelect}
    >
      <div className="bookmark-item__header">
        <div className="bookmark-item__type">
          <span className={getContentTypeIcon(bookmark.contentType)}></span>
        </div>
        
        <h3 className="bookmark-item__title">{bookmark.title}</h3>
        
        <div className="bookmark-item__actions">
          <button 
            className={`bookmark-item__star ${bookmark.isStarred ? 'active' : ''}`}
            onClick={handleStar}
            aria-label={bookmark.isStarred ? 'Unstar bookmark' : 'Star bookmark'}
          >
            <span className={bookmark.isStarred ? 'icon-star-filled' : 'icon-star'}></span>
          </button>
          
          <button 
            className="bookmark-item__delete"
            onClick={handleDelete}
            aria-label="Delete bookmark"
          >
            <span className="icon-delete"></span>
          </button>
        </div>
      </div>
      
      {view !== 'compact' && (
        <div className="bookmark-item__preview">
          {getPreviewContent()}
        </div>
      )}
      
      <div className="bookmark-item__footer">
        <div className="bookmark-item__category">
          {bookmark.categoryId && (
            <span className="bookmark-item__category-name">
              {bookmark.categoryName || 'Uncategorized'}
            </span>
          )}
        </div>
        
        <div className="bookmark-item__tags">
          {bookmark.tags && bookmark.tags.length > 0 && (
            bookmark.tags.slice(0, view === 'list' ? 3 : 1).map(tag => (
              <span key={tag} className="bookmark-item__tag">{tag}</span>
            ))
          )}
          
          {bookmark.tags && bookmark.tags.length > (view === 'list' ? 3 : 1) && (
            <span className="bookmark-item__tag-more">
              +{bookmark.tags.length - (view === 'list' ? 3 : 1)}
            </span>
          )}
        </div>
        
        <div className="bookmark-item__date">
          {formatDistanceToNow(new Date(bookmark.updatedAt), { addSuffix: true })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BookmarkItem);
```

2. **Category Sidebar Component**
```jsx
import React, { useState } from 'react';
import { useBookmarks, bookmarksActions } from '../../context/BookmarksContext';
import CategoryForm from './CategoryForm';
import './CategorySidebar.scss';

const CategorySidebar = () => {
  const { state, dispatch } = useBookmarks();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  const handleSelectCategory = (category) => {
    dispatch(bookmarksActions.selectCategory(category));
    dispatch(bookmarksActions.setPagination({ page: 1 }));
  };
  
  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };
  
  const handleEditCategory = (e, category) => {
    e.stopPropagation();
    setEditingCategory(category);
    setShowForm(true);
  };
  
  const handleDeleteCategory = async (e, categoryId) => {
    e.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }
    
    try {
      // If this category has bookmarks, ask where to move them
      const bookmarksInCategory = state.bookmarks.filter(b => b.categoryId === categoryId);
      
      if (bookmarksInCategory.length > 0) {
        const targetCategoryId = prompt(
          `This category contains ${bookmarksInCategory.length} bookmarks. ` +
          `Enter a category ID to move them to, or leave empty to delete them:`
        );
        
        await fetch(`/api/bookmarks/categories/${categoryId}?moveBookmarksTo=${targetCategoryId || ''}`, {
          method: 'DELETE'
        });
      } else {
        await fetch(`/api/bookmarks/categories/${categoryId}`, {
          method: 'DELETE'
        });
      }
      
      dispatch(bookmarksActions.removeCategory(categoryId));
      
      // If the deleted category was selected, select null
      if (state.selectedCategory?.id === categoryId) {
        dispatch(bookmarksActions.selectCategory(null));
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      dispatch(bookmarksActions.setError('Failed to delete category'));
    }
  };
  
  const handleSaveCategory = async (category) => {
    try {
      if (category.id) {
        // Update existing category
        const response = await fetch(`/api/bookmarks/categories/${category.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(category)
        });
        
        const updatedCategory = await response.json();
        dispatch(bookmarksActions.updateCategory(updatedCategory));
      } else {
        // Create new category
        const response = await fetch('/api/bookmarks/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(category)
        });
        
        const newCategory = await response.json();
        dispatch(bookmarksActions.addCategory(newCategory));
      }
      
      setShowForm(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      dispatch(bookmarksActions.setError('Failed to save category'));
    }
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCategory(null);
  };
  
  // Get parent categories (no parentId)
  const parentCategories = state.categories.filter(c => !c.parentId);
  
  // Get child categories by parent ID
  const getChildCategories = (parentId) => {
    return state.categories.filter(c => c.parentId === parentId);
  };
  
  // Render a category with its children
  const renderCategory = (category) => {
    const childCategories = getChildCategories(category.id);
    const isSelected = state.selectedCategory?.id === category.id;
    const bookmarkCount = state.bookmarks.filter(b => b.categoryId === category.id).length;
    
    return (
      <div key={category.id} className="category-tree">
        <div 
          className={`category-item ${isSelected ? 'category-item--selected' : ''}`}
          onClick={() => handleSelectCategory(category)}
        >
          <div className="category-item__icon">
            <span className={category.icon || 'icon-folder'}></span>
          </div>
          
          <div className="category-item__name">
            {category.name}
          </div>
          
          <div className="category-item__count">
            {bookmarkCount}
          </div>
          
          <div className="category-item__actions">
            <button 
              onClick={(e) => handleEditCategory(e, category)}
              aria-label="Edit category"
            >
              <span className="icon-edit"></span>
            </button>
            
            <button 
              onClick={(e) => handleDeleteCategory(e, category.id)}
              aria-label="Delete category"
              disabled={category.isDefault}
            >
              <span className="icon-delete"></span>
            </button>
          </div>
        </div>
        
        {childCategories.length > 0 && (
          <div className="category-children">
            {childCategories.map(child => renderCategory(child))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="category-sidebar">
      <div className="category-sidebar__header">
        <h2>Categories</h2>
        
        <button 
          className="category-sidebar__add-button"
          onClick={handleAddCategory}
        >
          <span className="icon-add"></span>
        </button>
      </div>
      
      {showForm ? (
        <CategoryForm 
          category={editingCategory} 
          categories={state.categories}
          onSave={handleSaveCategory} 
          onCancel={handleCancelForm} 
        />
      ) : (
        <>
          <div className="category-sidebar__all">
            <div 
              className={`category-item ${!state.selectedCategory ? 'category-item--selected' : ''}`}
              onClick={() => handleSelectCategory(null)}
            >
              <div className="category-item__icon">
                <span className="icon-all"></span>
              </div>
              
              <div className="category-item__name">
                All Bookmarks
              </div>
              
              <div className="category-item__count">
                {state.bookmarks.length}
              </div>
            </div>
          </div>
          
          <div className="category-sidebar__list">
            {state.loading.categories ? (
              <div className="category-sidebar__loading">Loading categories...</div>
            ) : parentCategories.length > 0 ? (
              parentCategories.map(category => renderCategory(category))
            ) : (
              <div className="category-sidebar__empty">
                <p>No categories yet</p>
                <button onClick={handleAddCategory}>Create Category</button>
              </div>
            )}
          </div>
          
          <div className="category-sidebar__tags">
            <h3>Tags</h3>
            
            <div className="tag-list">
              {state.tags.slice(0, 15).map(tag => (
                <div 
                  key={tag.id} 
                  className={`tag-item ${state.selectedTags.includes(tag.name) ? 'tag-item--selected' : ''}`}
                  onClick={() => {
                    const newSelectedTags = state.selectedTags.includes(tag.name)
                      ? state.selectedTags.filter(t => t !== tag.name)
                      : [...state.selectedTags, tag.name];
                    
                    dispatch(bookmarksActions.selectTags(newSelectedTags));
                    dispatch(bookmarksActions.setPagination({ page: 1 }));
                  }}
                >
                  <span className="tag-item__name">{tag.name}</span>
                  <span className="tag-item__count">{tag.bookmarkCount}</span>
                </div>
              ))}
              
              {state.tags.length > 15 && (
                <div className="tag-item tag-item--more">
                  +{state.tags.length - 15} more
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySidebar;
```

3. **Bookmark Form Component**
```jsx
import React, { useState, useEffect } from 'react';
import { useBookmarks, bookmarksActions } from '../../context/BookmarksContext';
import TagInput from '../../components/common/TagInput';
import './BookmarkForm.scss';

const BookmarkForm = ({ 
  bookmark = null, 
  initialContent = null,
  initialContentType = null,
  onSave,
  onCancel
}) => {
  const { state, dispatch } = useBookmarks();
  
  const [formData, setFormData] = useState({
    id: bookmark?.id || null,
    title: bookmark?.title || '',
    content: bookmark?.content || initialContent || '',
    contentType: bookmark?.contentType || initialContentType || 'note',
    categoryId: bookmark?.categoryId || state.preferences.defaultCategory || '',
    tags: bookmark?.tags || [],
    notes: bookmark?.notes || '',
    originalContext: bookmark?.originalContext || null,
    isStarred: bookmark?.isStarred || false
  });
  
  const [errors, setErrors] = useState({});
  
  // Update form when bookmark changes
  useEffect(() => {
    if (bookmark) {
      setFormData({
        id: bookmark.id,
        title: bookmark.title,
        content: bookmark.content,
        contentType: bookmark.contentType,
        categoryId: bookmark.categoryId,
        tags: bookmark.tags,
        notes: bookmark.notes,
        originalContext: bookmark.originalContext,
        isStarred: bookmark.isStarred
      });
    }
  }, [bookmark]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const handleTagsChange = (tags) => {
    setFormData(prev => ({ ...prev, tags }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      dispatch(bookmarksActions.setLoading({ operations: true }));
      
      if (formData.id) {
        // Update existing bookmark
        const response = await fetch(`/api/bookmarks/${formData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        const updatedBookmark = await response.json();
        dispatch(bookmarksActions.updateBookmark(updatedBookmark));
        
        if (onSave) {
          onSave(updatedBookmark);
        }
      } else {
        // Create new bookmark
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        const newBookmark = await response.json();
        dispatch(bookmarksActions.addBookmark(newBookmark));
        
        if (onSave) {
          onSave(newBookmark);
        }
      }
    } catch (error) {
      console.error('Error saving bookmark:', error);
      dispatch(bookmarksActions.setError('Failed to save bookmark'));
    } finally {
      dispatch(bookmarksActions.setLoading({ operations: false }));
    }
  };
  
  return (
    <form className="bookmark-form" onSubmit={handleSubmit}>
      <div className="bookmark-form__field">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter bookmark title"
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <div className="bookmark-form__error">{errors.title}</div>}
      </div>
      
      <div className="bookmark-form__field">
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
      
      <div className="bookmark-form__field">
        <label htmlFor="tags">Tags</label>
        <TagInput
          tags={formData.tags}
          onChange={handleTagsChange}
          suggestions={state.tags.map(tag => tag.name)}
          placeholder="Add tags..."
        />
      </div>
      
      {!bookmark && (
        <div className="bookmark-form__field">
          <label htmlFor="contentType">Content Type</label>
          <select
            id="contentType"
            name="contentType"
            value={formData.contentType}
            onChange={handleChange}
          >
            <option value="code">Code Snippet</option>
            <option value="chat">Chat Conversation</option>
            <option value="optimization">Optimization</option>
            <option value="note">Note</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}
      
      <div className="bookmark-form__field">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Enter or paste content here"
          rows={6}
          readOnly={!!bookmark} // Don't allow editing content of existing bookmarks
        />
      </div>
      
      <div className="bookmark-form__field">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add your notes about this bookmark..."
          rows={3}
        />
      </div>
      
      <div className="bookmark-form__actions">
        <button 
          type="button" 
          className="bookmark-form__cancel" 
          onClick={onCancel}
        >
          Cancel
        </button>
        
        <button 
          type="submit" 
          className="bookmark-form__save"
          disabled={state.loading.operations}
        >
          {state.loading.operations ? 'Saving...' : (formData.id ? 'Update' : 'Save')}
        </button>
      </div>
    </form>
  );
};

export default BookmarkForm;
```

### Testing Strategy
1. **Unit Tests**
   - Test individual components in isolation
   - Verify component rendering with different props
   - Test state changes and user interactions
   - Examples: BookmarkItem rendering, CategorySidebar behavior, BookmarkForm validation

2. **Integration Tests**
   - Test interactions between components
   - Verify context providers work correctly with consumers
   - Test API service integration
   - Examples: Bookmark creation flow, category management, search functionality

3. **End-to-End Tests**
   - Test complete user flows
   - Verify bookmark creation from different parts of the application
   - Test import/export functionality
   - Examples: Complete bookmark lifecycle, category organization, search and filtering

## Acceptance Criteria

### Functionality Criteria
- AC1.1: Users can create bookmarks from any relevant part of the application
- AC1.2: Bookmarks are organized into user-defined categories and tags
- AC1.3: Users can search and filter bookmarks by various criteria
- AC1.4: Bookmark content is displayed with proper formatting (code highlighting, etc.)
- AC1.5: Users can edit bookmark metadata (title, category, tags, notes)
- AC1.6: Users can export and import bookmarks in supported formats
- AC1.7: Nested categories are supported for hierarchical organization

### Performance Criteria
- AC2.1: Bookmark list loads within 2 seconds for collections up to 1000 bookmarks
- AC2.2: Search operations complete within 2 seconds
- AC2.3: UI remains responsive when performing operations on multiple bookmarks
- AC2.4: Category and tag filtering updates the display within 500ms
- AC2.5: Import/export operations provide progress feedback for large collections

### Quality Criteria
- AC3.1: UI matches the design specifications in both light and dark modes
- AC3.2: All text is legible with appropriate contrast ratios
- AC3.3: Interactive elements have clear hover and focus states
- AC3.4: Layout is responsive and functional across all target device sizes
- AC3.5: Code snippets maintain proper syntax highlighting in all supported languages

### Edge Case Handling
- AC4.1: Empty states provide clear guidance for users with no bookmarks
- AC4.2: Very large bookmarks are handled gracefully without performance issues
- AC4.3: Error states provide clear feedback and recovery options
- AC4.4: The interface remains usable during network interruptions
- AC4.5: Import validation provides clear feedback for invalid or incompatible files

## Development Resources

### Code Samples

#### Bookmarks Page Component
```jsx
import React, { useEffect, useState } from 'react';
import { useBookmarks, bookmarksActions } from '../../context/BookmarksContext';
import { useTheme } from '../../context/ThemeContext';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import CategorySidebar from './components/CategorySidebar';
import BookmarksList from './components/BookmarksList';
import BookmarkDetail from './components/BookmarkDetail';
import SearchFilters from './components/SearchFilters';
import BookmarkForm from './components/BookmarkForm';
import ImportExport from './components/ImportExport';
import { 
  fetchBookmarks, 
  fetchCategories,
  fetchTags
} from '../../services/bookmarksService';
import './Bookmarks.scss';

const Bookmarks = () => {
  const { state, dispatch } = useBookmarks();
  const { theme } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  
  // Load bookmarks, categories, and tags on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(bookmarksActions.setLoading({
          bookmarks: true,
          categories: true,
          tags: true
        }));
        
        // Fetch categories and tags first
        const [categories, tags] = await Promise.all([
          fetchCategories(),
          fetchTags()
        ]);
        
        dispatch(bookmarksActions.setCategories(categories));
        dispatch(bookmarksActions.setTags(tags));
        
        // Then fetch bookmarks with any active filters
        await loadBookmarks();
        
        dispatch(bookmarksActions.setError(null));
      } catch (error) {
        console.error('Error loading bookmarks data:', error);
        dispatch(bookmarksActions.setError('Failed to load bookmarks data. Please try again.'));
      } finally {
        dispatch(bookmarksActions.setLoading({
          categories: false,
          tags: false
        }));
      }
    };
    
    loadData();
    
    // Load user preferences
    const loadPreferences = async () => {
      try {
        const preferences = await fetch('/api/bookmarks/preferences').then(res => res.json());
        dispatch(bookmarksActions.setPreferences(preferences));
        
        // Apply preferences
        dispatch(bookmarksActions.setView(preferences.defaultView));
        dispatch(bookmarksActions.setSort(
          preferences.defaultSortBy, 
          preferences.defaultSortDirection
        ));
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    };
    
    loadPreferences();
  }, [dispatch]);
  
  // Load bookmarks when filters change
  useEffect(() => {
    loadBookmarks();
  }, [
    state.selectedCategory, 
    state.selectedTags, 
    state.searchQuery, 
    state.filters, 
    state.sortBy, 
    state.sortDirection,
    state.pagination.page
  ]);
  
  const loadBookmarks = async () => {
    try {
      dispatch(bookmarksActions.setLoading({ bookmarks: true }));
      
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
      
      if (state.filters.contentType) {
        params.append('contentType', state.filters.contentType);
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
      
      // Fetch bookmarks
      const result = await fetchBookmarks(params);
      
      dispatch(bookmarksActions.setBookmarks(result.bookmarks));
      dispatch(bookmarksActions.setPagination({
        total: result.total
      }));
      
      // If a bookmark was selected but is no longer in the results, deselect it
      if (state.selectedBookmark && !result.bookmarks.find(b => b.id === state.selectedBookmark.id)) {
        dispatch(bookmarksActions.selectBookmark(null));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      dispatch(bookmarksActions.setError('Failed to load bookmarks'));
    } finally {
      dispatch(bookmarksActions.setLoading({ bookmarks: false }));
    }
  };
  
  const handleSelectBookmark = (bookmark) => {
    dispatch(bookmarksActions.selectBookmark(bookmark));
  };
  
  const handleAddBookmark = () => {
    setEditingBookmark(null);
    setShowForm(true);
  };
  
  const handleEditBookmark = (bookmark) => {
    setEditingBookmark(bookmark);
    setShowForm(true);
  };
  
  const handleSaveBookmark = (bookmark) => {
    setShowForm(false);
    setEditingBookmark(null);
    
    // If we're in a filtered view, reload bookmarks to ensure the new/updated
    // bookmark appears if it matches the current filters
    if (state.selectedCategory || state.selectedTags.length > 0 || 
        state.searchQuery || state.filters.contentType) {
      loadBookmarks();
    }
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingBookmark(null);
  };
  
  const handleToggleImportExport = () => {
    setShowImportExport(!showImportExport);
  };
  
  const handleImportComplete = () => {
    setShowImportExport(false);
    loadBookmarks();
  };
  
  return (
    <div className={`bookmarks bookmarks--${theme}`}>
      <Sidebar />
      
      <main className="bookmarks__main">
        <Header title="Bookmarks" />
        
        <div className="bookmarks__container">
          {state.error && (
            <div className="bookmarks__error">
              {state.error}
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}
          
          <div className="bookmarks__layout">
            <div className="bookmarks__sidebar">
              <CategorySidebar />
            </div>
            
            <div className="bookmarks__content">
              <div className="bookmarks__header">
                <SearchFilters />
                
                <div className="bookmarks__actions">
                  <button 
                    className="bookmarks__add-button"
                    onClick={handleAddBookmark}
                  >
                    Add Bookmark
                  </button>
                  
                  <button 
                    className="bookmarks__import-export-button"
                    onClick={handleToggleImportExport}
                  >
                    Import/Export
                  </button>
                  
                  <div className="bookmarks__view-toggle">
                    <button 
                      className={`view-toggle__button ${state.view === 'list' ? 'active' : ''}`}
                      onClick={() => dispatch(bookmarksActions.setView('list'))}
                      aria-label="List view"
                    >
                      <span className="icon-list"></span>
                    </button>
                    
                    <button 
                      className={`view-toggle__button ${state.view === 'grid' ? 'active' : ''}`}
                      onClick={() => dispatch(bookmarksActions.setView('grid'))}
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
                <BookmarkForm 
                  bookmark={editingBookmark}
                  onSave={handleSaveBookmark}
                  onCancel={handleCancelForm}
                />
              ) : state.selectedBookmark ? (
                <BookmarkDetail 
                  bookmark={state.selectedBookmark}
                  onEdit={handleEditBookmark}
                  onBack={() => dispatch(bookmarksActions.selectBookmark(null))}
                />
              ) : (
                <BookmarksList 
                  bookmarks={state.bookmarks}
                  loading={state.loading.bookmarks}
                  view={state.view}
                  onSelectBookmark={handleSelectBookmark}
                  pagination={state.pagination}
                  onPageChange={(page) => dispatch(bookmarksActions.setPagination({ page }))}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bookmarks;
```

#### SCSS Styling
```scss
// Bookmarks.scss
@import '../../styles/variables';
@import '../../styles/mixins';

.bookmarks {
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

// BookmarkItem.scss
.bookmark-item {
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
    
    .bookmark-item--compact & {
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
    
    .bookmark-item--grid & {
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
    
    .bookmark-item--grid & {
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      font-size: 0.85rem;
    }
  }
  
  &__code-preview {
    background-color: var(--code-bg);
    padding: $spacing-sm;
    border-radius: $border-radius;
    font-family: monospace;
    font-size: 0.85rem;
    overflow: hidden;
    white-space: pre-wrap;
    margin: 0;
  }
  
  &__chat-preview,
  &__text-preview {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--text-secondary);
    
    .bookmark-item--compact & {
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
  
  &__date {
    font-size: 0.75rem;
  }
}

// CategorySidebar.scss
.category-sidebar {
  padding: $spacing-md;
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-md;
    
    h2 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
  
  &__add-button {
    background: transparent;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    padding: $spacing-xs;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background-color: var(--hover-color);
    }
  }
  
  &__all {
    margin-bottom: $spacing-sm;
  }
  
  &__list {
    margin-bottom: $spacing-md;
  }
  
  &__loading,
  &__empty {
    padding: $spacing-md;
    text-align: center;
    color: var(--text-secondary);
    
    button {
      margin-top: $spacing-sm;
      padding: $spacing-xs $spacing-sm;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: $border-radius;
      cursor: pointer;
      
      &:hover {
        background-color: var(--primary-color-dark);
      }
    }
  }
  
  &__tags {
    h3 {
      margin-top: 0;
      margin-bottom: $spacing-sm;
      font-size: 1rem;
      font-weight: 500;
    }
  }
}

.category-item {
  display: flex;
  align-items: center;
  padding: $spacing-xs $spacing-sm;
  border-radius: $border-radius;
  cursor: pointer;
  
  &:hover {
    background-color: var(--hover-color);
  }
  
  &--selected {
    background-color: var(--primary-color-light);
    
    .category-item__name {
      color: var(--primary-color);
      font-weight: 500;
    }
  }
  
  &__icon {
    margin-right: $spacing-sm;
    color: var(--text-secondary);
  }
  
  &__name {
    flex: 1;
  }
  
  &__count {
    background-color: var(--tag-bg);
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 0.8rem;
    margin-right: $spacing-sm;
  }
  
  &__actions {
    display: none;
    gap: $spacing-xs;
    
    .category-item:hover & {
      display: flex;
    }
    
    button {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      padding: 2px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      
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
}

.category-children {
  margin-left: $spacing-md;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;
}

.tag-item {
  background-color: var(--tag-bg);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    background-color: var(--hover-color);
  }
  
  &--selected {
    background-color: var(--primary-color-light);
    color: var(--primary-color);
  }
  
  &__count {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0 4px;
    border-radius: 8px;
    font-size: 0.7rem;
  }
  
  &--more {
    color: var(--text-secondary);
  }
}
```

### Reference Implementations
- [Notion Bookmarks](https://www.notion.so/)
- [Pocket](https://getpocket.com/)
- [Raindrop.io](https://raindrop.io/)
- [GitHub Stars](https://github.com/stars)

### Recommended Libraries
- **React DnD**: For drag-and-drop organization
- **React Tags Input**: For tag management
- **React Syntax Highlighter**: For code snippet display
- **React Virtualized**: For efficient rendering of large bookmark collections
- **React Select**: For advanced dropdown and filtering components

### Documentation Links
- [React Context API Documentation](https://reactjs.org/docs/context.html)
- [React DnD Documentation](https://react-dnd.github.io/react-dnd/about)
- [CSS Grid Layout Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (for client-side caching)
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
