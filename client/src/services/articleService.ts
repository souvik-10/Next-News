import api from './api';
import { Article, Pagination } from '../types';

export interface GetArticlesParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  tag?: string;
  sort?: 'newest' | 'popular';
}

export interface GetArticlesResponse {
  status: string;
  results: number;
  data: {
    articles: Article[];
    pagination: Pagination;
  };
}

export interface GetArticleResponse {
  status: string;
  data: {
    article: Article;
  };
}

export interface CreateArticleData {
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl?: string;
  author: string;
  tags?: string[];
  isBreaking?: boolean;
  readTimeMinutes?: number;
}

export const articleService = {
  async getArticles(params: GetArticlesParams = {}): Promise<GetArticlesResponse> {
    const response = await api.get<GetArticlesResponse>('/articles', { params });
    return response.data;
  },

  async getBreakingNews(): Promise<{ status: string; data: { articles: Article[] } }> {
    const response = await api.get('/articles/breaking');
    return response.data;
  },

  async getArticleByIdOrSlug(idOrSlug: string): Promise<GetArticleResponse> {
    const response = await api.get<GetArticleResponse>(`/articles/${idOrSlug}`);
    return response.data;
  },

  async createArticle(data: CreateArticleData): Promise<GetArticleResponse> {
    const response = await api.post<GetArticleResponse>('/articles', data);
    return response.data;
  },
};
