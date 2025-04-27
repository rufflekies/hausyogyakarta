// api.ts
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, 
});

// Interceptor for adding token to requests
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// AUTH API
export const authApi = {
  register: async (userData: { name: string; email: string; password: string }) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/api/auth/login', credentials);
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },

  updateProfile: async (profileData: { name?: string; email?: string; password?: string }) => {
    const response = await api.put('/api/auth/profile', profileData);
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
  },

  getAllUsers: async (page = 1, limit = 5) => {
    const response = await api.get(`/api/auth/users?page=${page}&limit=${limit}`);
    return {
      data: {
        data: response.data.data,
        pagination: response.data.pagination
      }
    };
  },

  deleteUser: async (userId: number) => {
    const response = await api.delete(`/api/auth/users/${userId}`);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const categoriesApi = {
  createCategory: async (categoryData: { name: string; parentId?: number }) => {
    const response = await api.post('/api/categories', categoryData);
    return response.data;
  },

  getAllCategories: async (page = 1, limit = 10) => {
    const response = await api.get(`/api/categories?page=${page}&limit=${limit}`);
    return {
      data: {
        data: response.data.data,
        pagination: response.data.pagination
      }
    };
  },

  updateCategory: async (categoryId: number, categoryData: { name?: string; parentId?: number }) => {
    const response = await api.put(`/api/categories/${categoryId}`, categoryData);
    return response.data;
  },

  deleteCategory: async (categoryId: number) => {
    const response = await api.delete(`/api/categories/${categoryId}`);
    return response.data;
  },
};

// ORDERS API
export const ordersApi = {
  createOrder: async (orderData: { 
    items: { productId: number; quantity: number; size?: string }[]; 
    address: string 
  }) => {
    const response = await api.post('/api/orders', orderData);
    return response.data;
  },

  getAllOrders: async (page = 1, limit = 5) => {
    const response = await api.get(`/api/orders?page=${page}&limit=${limit}`);
    return {
      data: {
        data: response.data.data,
        pagination: response.data.pagination
      }
    };
  },

  updateOrderStatus: async (orderId: number, statusData: { status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' }) => {
    const response = await api.put(`/api/orders/${orderId}/status`, statusData);
    return response.data;
  },
};

// PRODUCTS API
export const productsApi = {
  createProduct: async (productData: FormData) => {
    const response = await api.post('/api/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getAllProducts: async (page = 1, limit = 5, category?: number, search?: string) => {
    let url = `/api/products?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    
    const response = await api.get(url);
    return response.data;
  },

  getProductById: async (productId: number) => {
    const response = await api.get(`/api/products/${productId}`);
    return response.data;
  },

  updateProduct: async (productId: number, productData: FormData) => {
    const response = await api.put(`/api/products/${productId}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteProduct: async (productId: number) => {
    const response = await api.delete(`/api/products/${productId}`);
    return response.data;
  },
};

export default api;