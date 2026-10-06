import api from './api';
import { User } from '../types';

export type { User };

export interface AuthResponse {
  status: string;
  data: {
    user: User;
    token: string;
  };
}

export const authService = {
  async register(data: any): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async login(data: any): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async getMe(): Promise<{ status: string; data: { user: User } }> {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
