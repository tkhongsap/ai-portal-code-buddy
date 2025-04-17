import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/theme-context";
import { useUser } from "@/contexts/user-context";
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context";
import { 
  MenuIcon, 
  HomeIcon, 
  MessageSquareIcon, 
  CodeIcon, 
  BarChartIcon, 
  LayoutDashboardIcon, 
  BookmarkIcon, 
  ClockIcon, 
  UserCogIcon, 
  SettingsIcon, 
  LogOutIcon, 
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ href, icon, label, active }: NavItemProps) => {
  const { isExpanded } = useSidebar();
  const itemRef = useRef<HTMLLIElement>(null);
  const [, navigate] = useLocation();
  
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const handleMouseEnter = () => {
    if (!isExpanded) {
      // Only show tooltip after 600ms hover - FR-2.3 requirement
      hoverTimeout.current = setTimeout(() => {
        setShowTooltip(true);
      }, 600);
    }
  };
  
  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setShowTooltip(false);
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
  };
  
  return (
    <li 
      ref={itemRef}
      className="cb-sidebar-nav-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        onClick={handleClick}
        className={`cb-sidebar-nav-link ${active ? 'cb-sidebar-nav-link--active' : ''}`}
        aria-current={active ? 'page' : undefined}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate(href);
          }
        }}
      >
        <span className="cb-sidebar-nav-icon">{icon}</span>
        <span className="cb-sidebar-nav-text">{label}</span>
        
        {!isExpanded && (
          <span className="cb-sidebar-tooltip" role="tooltip">
            {label}
          </span>
        )}
      </div>
    </li>
  );
};

const SidebarToggle = () => {
  const { isExpanded, toggleSidebar } = useSidebar();
  
  return (
    <button 
      type="button"
      onClick={toggleSidebar}
      className="cb-sidebar-toggle"
      aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
    >
      {isExpanded ? (
        <ChevronLeftIcon size={16} />
      ) : (
        <ChevronRightIcon size={16} />
      )}
    </button>
  );
};

const SidebarContent = () => {
  const [location] = useLocation();
  const { user } = useUser();
  const { isExpanded, expandSidebar } = useSidebar();
  
  // Handle hover that would expand the sidebar
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleMouseEnter = () => {
    if (!isExpanded) {
      // Expand sidebar after 600ms hover - FR-2.3 requirement
      hoverTimeoutRef.current = setTimeout(() => {
        expandSidebar();
      }, 600);
    }
  };
  
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };
  
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      className={`cb-sidebar ${isExpanded ? 'cb-sidebar--expanded' : 'cb-sidebar--collapsed'}`}
      ref={sidebarRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cb-sidebar-header">
        <div className="cb-sidebar-logo">
          <div className="cb-sidebar-logo-icon">
            <CodeIcon size={16} />
          </div>
          <span className="cb-sidebar-logo-text">Code Buddy</span>
        </div>
        <SidebarToggle />
      </div>
      
      <ScrollArea className="cb-sidebar-content">
        <div className="mb-6">
          <h2 className="cb-sidebar-section-heading">Main</h2>
          <ul className="cb-sidebar-nav">
            <NavItem 
              href="/" 
              icon={<HomeIcon size={16} />} 
              label="Home" 
              active={location === "/"} 
            />
            <NavItem 
              href="/chat" 
              icon={<MessageSquareIcon size={16} />} 
              label="Chat Assistant" 
              active={location === "/chat"} 
            />
            <NavItem 
              href="/optimization" 
              icon={<CodeIcon size={16} />} 
              label="Code Optimization" 
              active={location === "/optimization"} 
            />
            <NavItem 
              href="/score" 
              icon={<BarChartIcon size={16} />} 
              label="Score Your Code" 
              active={location === "/score"} 
            />
            <NavItem 
              href="/dashboard" 
              icon={<LayoutDashboardIcon size={16} />} 
              label="Dashboard" 
              active={location === "/dashboard"} 
            />
          </ul>
        </div>
        
        <div className="mb-6">
          <h2 className="cb-sidebar-section-heading">Library</h2>
          <ul className="cb-sidebar-nav">
            <NavItem 
              href="/bookmarks" 
              icon={<BookmarkIcon size={16} />} 
              label="Bookmarks" 
              active={location === "/bookmarks"} 
            />
            <NavItem 
              href="/history" 
              icon={<ClockIcon size={16} />} 
              label="Query History" 
              active={location === "/history"} 
            />
          </ul>
        </div>
        
        <div>
          <h2 className="cb-sidebar-section-heading">Account</h2>
          <ul className="cb-sidebar-nav">
            <NavItem 
              href="/profile" 
              icon={<UserCogIcon size={16} />} 
              label="Profile Settings" 
              active={location === "/profile"} 
            />
            <NavItem 
              href="/preferences" 
              icon={<SettingsIcon size={16} />} 
              label="Preferences" 
              active={location === "/preferences"} 
            />
          </ul>
        </div>
      </ScrollArea>
      
      <div className="cb-sidebar-footer">
        <div className="cb-sidebar-user">
          <div className="cb-sidebar-user-avatar">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="User profile" className="w-full h-full object-cover" />
            ) : (
              <span>
                {user.displayName?.[0] || user.username?.[0] || "U"}
              </span>
            )}
          </div>
          <div className="cb-sidebar-user-info">
            <div className="cb-sidebar-user-name">{user.displayName || user.username || "User"}</div>
            <div className="cb-sidebar-user-role">{user.role || "Developer"}</div>
          </div>
        </div>
        <button 
          className="cb-sidebar-action" 
          aria-label="Log out"
          title="Log out"
        >
          <LogOutIcon size={16} />
        </button>
      </div>
    </div>
  );
};

const Layout = ({ children }: LayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkSize();
    window.addEventListener("resize", checkSize);
    
    return () => window.removeEventListener("resize", checkSize);
  }, []);
  
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block h-full">
          <SidebarContent />
        </aside>
        
        {/* Mobile Sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="default" 
              size="icon" 
              className="md:hidden fixed bottom-4 left-4 z-20 rounded-full shadow-lg"
              aria-label="Open navigation menu"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-4/5 max-w-xs">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
