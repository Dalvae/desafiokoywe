"use client";

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

interface AuthContextType {
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check for token in local storage on initial load
    const token = localStorage.getItem('accessToken');
    if (token) {
      // You might want to validate the token with the server
      // For simplicity, we'll assume it's valid
      setUser({ token });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login(email, password);

      localStorage.setItem('accessToken', data.access_token);
      setUser({ token: data.access_token });
      router.push('/quote'); // Redirect to quote page after login
    } catch (error: any) {
      console.error('Login failed:', error);
      alert('Login failed: ' + error.response?.data?.message || error.message);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const data = await authService.register(email, password);

      localStorage.setItem('accessToken', data.access_token);
      setUser({ token: data.access_token });
      router.push('/quote'); // Redirect to quote page after registration
    } catch (error: any) {
      console.error('Registration failed:', error);
      alert('Registration failed: ' +  error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    router.push('/'); // Redirect to home page after logout
  };

  const value = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
