import { create } from 'zustand';
import { User, SignUpData } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  logout: () => void;
}

// Dummy user data with realistic storage values
const dummyUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  storageUsed: 524288000, // 500MB in bytes
  storageLimit: 1073741824, // 1GB in bytes
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'user@example.com' && password === 'password') {
      set({ user: dummyUser, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  signup: async (data: SignUpData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would validate the email doesn't exist
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email: data.email,
      name: data.name,
      storageUsed: 0,
      storageLimit: 1073741824, // 1GB in bytes
    };
    
    set({ user: newUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));