import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/theme-context";
import { useUser } from "@/contexts/user-context";
import { MenuIcon, HomeIcon, MessageSquareIcon, CodeIcon, BarChartIcon, LayoutDashboardIcon, BookmarkIcon, ClockIcon, UserCogIcon, SettingsIcon, LogOutIcon, SunIcon, MoonIcon, BellIcon, PanelLeftCloseIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

const NavItem = ({ href, icon, children, active }: NavItemProps) => {
  return (
    <li>
      <Link href={href}>
        <a className={`flex items-center px-3 py-2 text-sm rounded-lg mb-1 ${
          active ? "bg-primary bg-opacity-10 text-primary" : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}>
          {icon}
          <span>{children}</span>
        </a>
      </Link>
    </li>
  );
};

const SidebarContent = () => {
  const [location] = useLocation();
  const { user } = useUser();
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center border-b border-gray-200 dark:border-gray-800">
        <div className="h-8 w-8 rounded mr-3 bg-primary text-white flex items-center justify-center">
          <CodeIcon size={16} />
        </div>
        <h1 className="text-lg font-bold text-primary">Code Buddy</h1>
      </div>
      
      <ScrollArea className="flex-1 pt-4 px-3">
        <div className="mb-6">
          <h2 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 px-3 mb-2">Main</h2>
          <ul>
            <NavItem href="/" icon={<HomeIcon className="mr-3" size={16} />} active={location === "/"}>AI Portal Home</NavItem>
            <NavItem href="/chat" icon={<MessageSquareIcon className="mr-3" size={16} />} active={location === "/chat"}>Chat Assistant</NavItem>
            <NavItem href="/optimization" icon={<CodeIcon className="mr-3" size={16} />} active={location === "/optimization"}>Code Optimization</NavItem>
            <NavItem href="/score" icon={<BarChartIcon className="mr-3" size={16} />} active={location === "/score"}>Score Your Code</NavItem>
            <NavItem href="/dashboard" icon={<LayoutDashboardIcon className="mr-3" size={16} />} active={location === "/dashboard"}>Dashboard</NavItem>
          </ul>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 px-3 mb-2">Library</h2>
          <ul>
            <NavItem href="/bookmarks" icon={<BookmarkIcon className="mr-3" size={16} />} active={location === "/bookmarks"}>Bookmarks</NavItem>
            <NavItem href="/history" icon={<ClockIcon className="mr-3" size={16} />} active={location === "/history"}>Query History</NavItem>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 px-3 mb-2">Account</h2>
          <ul>
            <NavItem href="/profile" icon={<UserCogIcon className="mr-3" size={16} />} active={location === "/profile"}>Profile Settings</NavItem>
            <NavItem href="/preferences" icon={<SettingsIcon className="mr-3" size={16} />} active={location === "/preferences"}>Preferences</NavItem>
          </ul>
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-3">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="User profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                {user.displayName?.[0] || user.username?.[0] || "U"}
              </div>
            )}
          </div>
          <div className="text-sm">
            <p className="font-medium">{user.displayName || user.username || "User"}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.role || "Developer"}</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
            <LogOutIcon size={16} />
          </Button>
        </div>
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
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 lg:w-72 bg-white dark:bg-[#1E1E1E] border-r border-gray-200 dark:border-gray-800 h-full transition-all">
        <SidebarContent />
      </aside>
      
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="default" 
            size="icon" 
            className="md:hidden fixed bottom-4 left-4 z-20 rounded-full shadow-lg"
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
  );
};

export default Layout;
