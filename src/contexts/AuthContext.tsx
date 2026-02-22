import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'mentee' | 'mentora' | 'admin' | null;

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isOnboarded: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string, role?: UserRole) => {
    // Simulated login - in production, this would be an API call
    const detectedRole = role || (email.includes('admin') ? 'admin' : email.includes('mentora') ? 'mentora' : 'mentee');
    
    setUser({
      id: '1',
      email,
      name: email.split('@')[0],
      role: detectedRole,
      isOnboarded: detectedRole === 'admin', // Admin doesn't need onboarding
    });
  };

  const register = async (email: string, _password: string, name: string, role: UserRole) => {
    setUser({
      id: '1',
      email,
      name,
      role,
      isOnboarded: role === 'admin',
    });
  };

  const logout = () => {
    setUser(null);
  };

  const completeOnboarding = () => {
    if (user) {
      setUser({ ...user, isOnboarded: true });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
