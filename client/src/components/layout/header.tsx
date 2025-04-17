import { useUser } from "@/contexts/user-context";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MenuIcon, BellIcon, SearchIcon } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const Header = () => {
  const { user } = useUser();
  
  return (
    <header className="h-16 flex items-center px-4 border-b" style={{
      backgroundColor: 'var(--cb-surface-100)',
      borderColor: 'var(--cb-line)'
    }}>
      <Button variant="ghost" size="icon" className="md:hidden mr-3">
        <MenuIcon size={20} />
      </Button>
      
      <div className="relative flex-1 max-w-2xl">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="h-4 w-4" style={{ color: 'var(--cb-text-low)' }} />
        </div>
        <Input 
          type="search" 
          className="pl-10" 
          placeholder="Search queries, code snippets, tips..." 
          style={{
            backgroundColor: 'color-mix(in srgb, var(--cb-line) 20%, var(--cb-surface-100))'
          }}
        />
      </div>
      
      <div className="flex items-center ml-3 gap-1">
        <Button variant="ghost" size="icon">
          <BellIcon size={20} />
        </Button>
        
        {/* Using our new ThemeToggle component */}
        <ThemeToggle />
        
        <div className="ml-2 md:hidden">
          <Link href="/profile">
            <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer" style={{
              backgroundColor: 'var(--cb-secondary-400)'
            }}>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="User profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ color: 'var(--cb-primary-500)' }}>
                  {user.displayName?.[0] || user.username?.[0] || "U"}
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
