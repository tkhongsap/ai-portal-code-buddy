import { useState } from "react";
import { useTheme } from "@/contexts/theme-context";
import { useUser } from "@/contexts/user-context";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MenuIcon, SunIcon, MoonIcon, BellIcon, SearchIcon } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  
  return (
    <header className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E1E1E]">
      <Button variant="ghost" size="icon" className="md:hidden mr-3 text-gray-500 dark:text-gray-400">
        <MenuIcon size={20} />
      </Button>
      
      <div className="relative flex-1 max-w-2xl">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-400" />
        </div>
        <Input 
          type="search" 
          className="bg-gray-50 dark:bg-gray-700 pl-10" 
          placeholder="Search queries, code snippets, tips..." 
        />
      </div>
      
      <div className="flex items-center ml-3 gap-1">
        <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
          <BellIcon size={20} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500 dark:text-gray-400"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </Button>
        
        <div className="ml-2 md:hidden">
          <Link href="/profile">
            <a>
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="User profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    {user.displayName?.[0] || user.username?.[0] || "U"}
                  </div>
                )}
              </div>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
