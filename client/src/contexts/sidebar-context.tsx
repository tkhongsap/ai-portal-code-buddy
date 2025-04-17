import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SidebarContextType {
  isExpanded: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // On initial load, check localStorage for sidebar state
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarExpanded');
    if (savedState !== null) {
      setIsExpanded(savedState === 'true');
    }
    
    // Setup keyboard shortcut for toggling sidebar (Ctrl + \)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '\\') {
        toggleSidebar();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsExpanded(prev => {
      const newState = !prev;
      localStorage.setItem('sidebarExpanded', String(newState));
      return newState;
    });
  };
  
  // Explicitly expand sidebar
  const expandSidebar = () => {
    setIsExpanded(true);
    localStorage.setItem('sidebarExpanded', 'true');
  };
  
  // Explicitly collapse sidebar
  const collapseSidebar = () => {
    setIsExpanded(false);
    localStorage.setItem('sidebarExpanded', 'false');
  };
  
  return (
    <SidebarContext.Provider 
      value={{ 
        isExpanded, 
        toggleSidebar,
        expandSidebar,
        collapseSidebar
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};