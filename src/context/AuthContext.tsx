import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppUser, DashboardTab, UserRole } from '../types';
import { INITIAL_APP_USERS, ALL_DASHBOARD_TABS } from '../data/topicPermissions';

interface AuthContextType {
  currentUser: AppUser | null;
  isAuthenticated: boolean;
  users: AppUser[];
  login: (email: string, password?: string) => { success: boolean; message?: string };
  register: (data: {
    name: string;
    email: string;
    password?: string;
    company?: string;
    phone?: string;
    allowedTabs: DashboardTab[];
    role?: UserRole;
  }) => { success: boolean; message?: string };
  logout: () => void;
  switchUser: (userId: string) => void;
  updateUserPermissions: (userId: string, allowedTabs: DashboardTab[], role?: UserRole) => void;
  addNewUser: (user: Omit<AppUser, 'id' | 'createdAt'>) => void;
  deleteUser: (userId: string) => void;
  hasAccess: (tab: DashboardTab) => boolean;
  isCurrentAdmin: boolean;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  userAccessModalOpen: boolean;
  setUserAccessModalOpen: (open: boolean) => void;
  lockedTopicRequested: DashboardTab | null;
  setLockedTopicRequested: (tab: DashboardTab | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'aic_users_registry_v2';
const CURRENT_USER_KEY = 'aic_current_user_v2';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize users list
  const [users, setUsers] = useState<AppUser[]>(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_APP_USERS;
  });

  // Initialize current user
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    try {
      const savedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.email) return parsed;
      }
    } catch {
      // ignore
    }
    // Default logged-in account to Abu Talib for smooth preview, or user can easily switch/logout
    return INITIAL_APP_USERS[0];
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [userAccessModalOpen, setUserAccessModalOpen] = useState<boolean>(false);
  const [lockedTopicRequested, setLockedTopicRequested] = useState<DashboardTab | null>(null);

  // Sync users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch {
      // ignore
    }
  }, [users]);

  // Sync currentUser to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const login = (email: string): { success: boolean; message?: string } => {
    const trimmed = email.trim().toLowerCase();
    const existing = users.find(u => u.email.toLowerCase() === trimmed);
    if (!existing) {
      return { success: false, message: 'No registered user found with this email address. Please register a new account.' };
    }
    
    // Update last login
    const updatedUser = { ...existing, lastLoginAt: new Date().toISOString() };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    setAuthModalOpen(false);
    return { success: true };
  };

  const register = (data: {
    name: string;
    email: string;
    password?: string;
    company?: string;
    phone?: string;
    allowedTabs: DashboardTab[];
    role?: UserRole;
  }): { success: boolean; message?: string } => {
    const trimmedEmail = data.email.trim().toLowerCase();
    if (!trimmedEmail) {
      return { success: false, message: 'Valid email address is required.' };
    }

    const duplicate = users.find(u => u.email.toLowerCase() === trimmedEmail);
    if (duplicate) {
      return { success: false, message: 'An account with this email already exists. Please sign in.' };
    }

    // Default to blueprint and cro if none selected
    const initialTabs = data.allowedTabs.length > 0 
      ? data.allowedTabs 
      : (['blueprint', 'cro'] as DashboardTab[]);

    const newUser: AppUser = {
      id: `user-${Date.now()}`,
      name: data.name.trim() || 'New Agency User',
      email: trimmedEmail,
      role: data.role || 'client',
      company: data.company?.trim() || 'Client Organization',
      phone: data.phone?.trim() || '',
      allowedTabs: initialTabs,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      notes: `Registered directly via AIC portal. Assigned ${initialTabs.length} topic permissions.`,
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setAuthModalOpen(true);
  };

  const switchUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      const updated = { ...target, lastLoginAt: new Date().toISOString() };
      setCurrentUser(updated);
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    }
  };

  const updateUserPermissions = (userId: string, allowedTabs: DashboardTab[], role?: UserRole) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const updated = {
            ...u,
            allowedTabs,
            role: role || u.role,
          };
          if (currentUser?.id === userId) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return u;
      })
    );
  };

  const addNewUser = (user: Omit<AppUser, 'id' | 'createdAt'>) => {
    const created: AppUser = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setUsers(prev => [created, ...prev]);
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    if (currentUser?.id === userId) {
      // Fallback to first remaining or null
      const remaining = users.filter(u => u.id !== userId);
      setCurrentUser(remaining[0] || null);
    }
  };

  const hasAccess = (tab: DashboardTab): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;
    return currentUser.allowedTabs.includes(tab);
  };

  const isCurrentAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        users,
        login,
        register,
        logout,
        switchUser,
        updateUserPermissions,
        addNewUser,
        deleteUser,
        hasAccess,
        isCurrentAdmin,
        authModalOpen,
        setAuthModalOpen,
        userAccessModalOpen,
        setUserAccessModalOpen,
        lockedTopicRequested,
        setLockedTopicRequested,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
