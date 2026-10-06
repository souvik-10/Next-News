import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { commentService } from '../services/commentService';
import { Comment } from '../types';
import { useRealTimeNews } from '../hooks/useRealTimeNews';

interface CommentSectionProps {
  articleId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { latestComment } = useRealTimeNews();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const res = await commentService.getComments(articleId);
        setComments(res.data.comments);
      } catch (err: any) {
        console.error('Failed to load comments', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [articleId]);

  // Real-time updates for comments
  useEffect(() => {
    if (latestComment && latestComment.articleId === articleId) {
      setComments((prev) => {
        const exists = prev.some((c) => c._id === latestComment.comment._id);
        if (exists) return prev;
        return [latestComment.comment, ...prev];
      });
    }
  }, [latestComment, articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    try {
      setIsSubmitting(true);
      setError(null);
      const res = await commentService.addComment(articleId, newCommentText.trim());
      setComments((prev) => [res.data.comment, ...prev.filter((c) => c._id !== res.data.comment._id)]);
      setNewCommentText('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await commentService.deleteComment(articleId, commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err: any) {
      console.error('Failed to delete comment', err);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
          <span>Discussion & Comments</span>
          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full">
            {comments.length}
          </span>
        </h3>
      </div>

      {/* Post Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          {error && (
            <div className="p-3 mb-3 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-200">
              {error}
            </div>
          )}
          <div className="flex gap-3">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-slate-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-red-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <div className="flex-1">
              <textarea
                rows={3}
                placeholder="Share your opinion on this news story..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                maxLength={1000}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400 font-mono">
                  {1000 - newCommentText.length} characters left
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting || !newCommentText.trim()}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold px-5 py-2 rounded-lg shadow transition"
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center mb-8">
          <p className="text-slate-600 text-sm mb-3">Join the discussion by logging into your account.</p>
          <a
            href="/login"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition"
          >
            Log In to Comment
          </a>
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse flex gap-3 p-4 rounded-xl bg-slate-50">
              <div className="w-9 h-9 bg-slate-200 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-1/4" />
                <div className="h-3 bg-slate-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm italic">
          No comments yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => {
            const isOwner = user?.id === (typeof comment.userId === 'object' ? comment.userId._id : comment.userId);
            const authorName = typeof comment.userId === 'object' ? comment.userId.name : 'User';
            const avatarUrl = typeof comment.userId === 'object' ? comment.userId.avatarUrl : undefined;

            return (
              <div
                key={comment._id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex gap-3 group"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={authorName}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {authorName.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-900">{authorName}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {isOwner && (
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 transition text-xs font-semibold"
                        title="Delete comment"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{comment.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
