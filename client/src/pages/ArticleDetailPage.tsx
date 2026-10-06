import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articleService } from '../services/articleService';
import { watchlistService } from '../services/watchlistService';
import { Article } from '../types';
import { CommentSection } from '../components/CommentSection';
import { useAuth } from '../hooks/useAuth';

export const ArticleDetailPage: React.FC = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const { isAuthenticated } = useAuth();

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!idOrSlug) return;
      try {
        setIsLoading(true);
        setError(null);
        const res = await articleService.getArticleByIdOrSlug(idOrSlug);
        setArticle(res.data.article);

        if (isAuthenticated) {
          try {
            const statusRes = await watchlistService.checkWatchlistStatus(res.data.article._id);
            setIsSaved(statusRes.data.isSaved);
          } catch (e) {
            // Ignore status error if unauthenticated
          }
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load article details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [idOrSlug, isAuthenticated]);

  const handleWatchlistToggle = async () => {
    if (!article || !isAuthenticated) return;
    try {
      setIsWatchlistLoading(true);
      if (isSaved) {
        await watchlistService.removeFromWatchlist(article._id);
        setIsSaved(false);
      } else {
        await watchlistService.addToWatchlist(article._id);
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Watchlist toggle error', err);
    } finally {
      setIsWatchlistLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse py-8">
        <div className="h-6 bg-slate-200 rounded w-1/6" />
        <div className="h-10 bg-slate-200 rounded w-4/5" />
        <div className="h-4 bg-slate-200 rounded w-1/3" />
        <div className="h-96 bg-slate-200 rounded-2xl" />
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Article Not Found</h2>
        <p className="text-slate-600 text-sm mb-6">{error || "The article you requested could not be located."}</p>
        <Link to="/" className="inline-block bg-red-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow">
          Return to Headlines
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="max-w-4xl mx-auto py-4">
      {/* Article Header Metadata */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <Link
            to={`/?category=${encodeURIComponent(article.category)}`}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase px-3 py-1 rounded-full transition"
          >
            {article.category}
          </Link>

          {isAuthenticated ? (
            <button
              onClick={handleWatchlistToggle}
              disabled={isWatchlistLoading}
              className={`flex items-center space-x-2 text-xs font-bold px-4 py-2 rounded-xl transition ${
                isSaved
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              <svg className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>{isSaved ? 'Saved to Watchlist' : 'Add to Watchlist'}</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="text-xs text-slate-500 hover:text-red-600 font-semibold"
            >
              Log in to save to Watchlist
            </Link>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed font-medium">
          {article.summary}
        </p>

        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-black flex items-center justify-center text-sm">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-slate-900">{article.author}</p>
              <p className="text-slate-500">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-slate-500 font-medium">
            <span>{article.readTimeMinutes} min read</span>
            <span>·</span>
            <span>{article.viewsCount} views</span>
          </div>
        </div>
      </div>

      {/* Main Image */}
      {article.imageUrl && (
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-base sm:text-lg space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
        {article.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tags:</span>
          {article.tags.map((tag) => (
            <Link
              key={tag}
              to={`/?tag=${encodeURIComponent(tag)}`}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold px-3 py-1 rounded-md transition"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Comments Section */}
      <CommentSection articleId={article._id} />
    </article>
  );
};
