import api from './api';
import { User } from '../types';

export interface ProfileResponse {
  status: string;
  data: {
    user: User;
  };
}

export const userService = {
  async getProfile(): Promise<ProfileResponse> {
    const response = await api.get<ProfileResponse>('/users/profile');
    return response.data;
  },

  async updateProfile(data: { name?: string; bio?: string }): Promise<ProfileResponse> {
    const response = await api.put<ProfileResponse>('/users/profile', data);
    return response.data;
  },

  async uploadAvatar(formData: FormData): Promise<{ status: string; data: { avatarUrl: string; user: User } }> {
    const response = await api.post('/users/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
