"use client";

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import jwtDecode from 'jwt-decode';

interface AuthContextType {
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface JWTPayload {
  exp: number;
  iat: number;
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
      checkTokenExpiration(token);
    }
  }, []);

  const checkTokenExpiration = (token: string) => {
    try {
      const decodedToken: JWTPayload = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
      const currentTime = Date.now();
      const timeLeft = expirationTime - currentTime;

      if (timeLeft <= 0) {
        // Token has expired
        console.log('Token has expired');
        logout();
        return;
      }

      // Set a timeout to logout when the token expires
      setTimeout(() => {
        console.log('Token expired, logging out');
        logout();
      }, timeLeft);
    } catch (error) {
      console.error('Error decoding token:', error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('accessToken', data.access_token);
      setUser({ token: data.access_token });
      checkTokenExpiration(data.access_token);
      router.push('/quote'); // Redirect to quote page after login
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
      checkTokenExpiration(data.access_token);
      router.push('/quote'); // Redirect to quote page after registration
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
