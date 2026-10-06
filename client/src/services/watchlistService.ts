import api from './api';
import { Article } from '../types';

export interface GetWatchlistResponse {
  status: string;
  results: number;
  data: {
    watchlist: Article[];
  };
}

export const watchlistService = {
  async getWatchlist(): Promise<GetWatchlistResponse> {
    const response = await api.get<GetWatchlistResponse>('/watchlist');
    return response.data;
  },

  async addToWatchlist(articleId: string): Promise<{ status: string; message: string }> {
    const response = await api.post('/watchlist', { articleId });
    return response.data;
  },

  async removeFromWatchlist(articleId: string): Promise<{ status: string; message: string }> {
    const response = await api.delete(`/watchlist/${articleId}`);
    return response.data;
  },

  async checkWatchlistStatus(articleId: string): Promise<{ status: string; data: { isSaved: boolean } }> {
    const response = await api.get(`/watchlist/status/${articleId}`);
    return response.data;
  },
};
