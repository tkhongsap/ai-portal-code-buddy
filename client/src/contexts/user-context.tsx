import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

interface UserContextType {
  user: Partial<User>;
  isLoading: boolean;
  setUser: (user: Partial<User>) => void;
  logOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user/me', { credentials: 'include' });
        
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          // Use a demo user if not logged in
          setUser({
            id: 1, 
            username: 'alexmorgan', 
            displayName: 'Alex Morgan', 
            role: 'Developer'
          });
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        // Use a demo user if there's an error
        setUser({
          id: 1, 
          username: 'alexmorgan', 
          displayName: 'Alex Morgan', 
          role: 'Developer'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logOut = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout', {});
      setUser({});
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, setUser, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
