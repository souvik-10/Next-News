export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  createdAt?: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  author: string;
  tags: string[];
  viewsCount: number;
  readTimeMinutes: number;
  isBreaking: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  articleId: string;
  userId: {
    _id: string;
    name: string;
    avatarUrl?: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
}
