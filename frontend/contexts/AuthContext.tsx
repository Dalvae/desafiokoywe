"use client";

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface AuthContextType {
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface JWTPayload extends JwtPayload {
  sub: string;
  email: string;
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
    const token = localStorage.getItem('accessToken');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('accessToken', data.access_token);
      setUser({ token: data.access_token });
      router.push('/'); // Redirect to home page after login
    } catch (error: any) {
      console.error('Login failed:', error);
      alert('Login failed: ' + (error.response?.data?.message || error.message || 'An unexpected error occurred'));
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const data = await authService.register(email, password);
      localStorage.setItem('accessToken', data.access_token);
      setUser({ token: data.access_token });
      router.push('/'); // Redirect to home page after registration
    } catch (error: any) {
      console.error('Registration failed:', error);
      alert('Registration failed: ' + (error.response?.data?.message || error.message || 'An unexpected error occurred'));
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
