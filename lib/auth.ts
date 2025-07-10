import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'moderator' | 'patient';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@hospital.com',
    name: 'Dr. Sarah Admin',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    email: 'moderator@hospital.com',
    name: 'Nurse Manager',
    role: 'moderator',
    createdAt: '2024-01-02T00:00:00Z',
    lastLogin: '2024-01-15T09:15:00Z',
  },
  {
    id: '3',
    email: 'patient@email.com',
    name: 'John Patient',
    role: 'patient',
    createdAt: '2024-01-03T00:00:00Z',
    lastLogin: '2024-01-15T08:45:00Z',
  },
];

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock authentication
        const user = mockUsers.find((u) => u.email === email);
        if (user && password === 'password') {
          set({
            user: { ...user, lastLogin: new Date().toISOString() },
            isAuthenticated: true,
          });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      register: async (userData) => {
        // Mock registration
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        set({ user: newUser, isAuthenticated: true });
      },
    }),
    {
      name: 'Blockchain-auth',
    }
  )
);
