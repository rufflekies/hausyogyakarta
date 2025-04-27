import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

export type User = {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await authApi.getProfile();
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await authApi.register({ name, email, password });
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    authApi.logout();
    setUser(null);
    router.push('/');
  };

  // Function to check if user is admin
  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin,
  };
};