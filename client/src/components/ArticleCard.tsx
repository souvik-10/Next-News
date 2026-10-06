import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { useAuth } from '../hooks/useAuth';
import { watchlistService } from '../services/watchlistService';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  const { isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    if (isAuthenticated) {
      watchlistService.checkWatchlistStatus(article._id).then((res) => {
        if (isMounted && res.data) {
          setIsSaved(res.data.isSaved);
        }
      }).catch(() => {});
    }
    return () => {
      isMounted = false;
    };
  }, [article._id, isAuthenticated]);

  const handleToggleWatchlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;

    setIsLoading(true);
    try {
      if (isSaved) {
        await watchlistService.removeFromWatchlist(article._id);
        setIsSaved(false);
      } else {
        await watchlistService.addToWatchlist(article._id);
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Failed to update watchlist', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (featured) {
    return (
      <div className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col lg:flex-row mb-8 transition hover:border-slate-700">
        <div className="lg:w-3/5 relative min-h-[300px] lg:min-h-[420px]">
          <img
            src={article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent lg:hidden" />
        </div>

        <div className="lg:w-2/5 p-6 lg:p-8 flex flex-col justify-between z-10">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="bg-red-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                {article.category}
              </span>
              {article.isBreaking && (
                <span className="text-red-400 text-xs font-bold flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>Breaking</span>
                </span>
              )}
            </div>

            <Link to={`/article/${article.slug || article._id}`}>
              <h2 className="text-2xl lg:text-3xl font-black text-white group-hover:text-red-400 transition leading-tight mb-4">
                {article.title}
              </h2>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
              {article.summary}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">{article.author}</p>
                <p className="text-xs text-slate-400">{formattedDate} · {article.readTimeMinutes} min read</p>
              </div>
            </div>

            {isAuthenticated && (
              <button
                onClick={handleToggleWatchlist}
                disabled={isLoading}
                title={isSaved ? 'Remove from Watchlist' : 'Save to Watchlist'}
                className={`p-2 rounded-full transition ${
                  isSaved
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <img
            src={article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md">
              {article.category}
            </span>
          </div>
          {isAuthenticated && (
            <button
              onClick={handleToggleWatchlist}
              disabled={isLoading}
              title={isSaved ? 'Remove from Watchlist' : 'Save to Watchlist'}
              className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition ${
                isSaved
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-900/60 text-white hover:bg-slate-900'
              }`}
            >
              <svg className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          )}
        </div>

        <div className="p-5">
          <Link to={`/article/${article.slug || article._id}`}>
            <h3 className="font-bold text-slate-900 group-hover:text-red-600 transition leading-snug line-clamp-2 mb-2 text-lg">
              {article.title}
            </h3>
          </Link>
          <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
            {article.summary}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>{article.author}</span>
        <span>{article.readTimeMinutes} min read</span>
      </div>
    </div>
  );
};
