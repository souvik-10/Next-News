import api from './api';
import { Comment } from '../types';

export interface GetCommentsResponse {
  status: string;
  results: number;
  data: {
    comments: Comment[];
  };
}

export interface AddCommentResponse {
  status: string;
  data: {
    comment: Comment;
  };
}

export const commentService = {
  async getComments(articleId: string): Promise<GetCommentsResponse> {
    const response = await api.get<GetCommentsResponse>(`/articles/${articleId}/comments`);
    return response.data;
  },

  async addComment(articleId: string, content: string): Promise<AddCommentResponse> {
    const response = await api.post<AddCommentResponse>(`/articles/${articleId}/comments`, { content });
    return response.data;
  },

  async deleteComment(articleId: string, commentId: string): Promise<{ status: string; message: string }> {
    const response = await api.delete(`/articles/${articleId}/comments/${commentId}`);
    return response.data;
  },
};
