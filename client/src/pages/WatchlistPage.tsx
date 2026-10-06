import React, { useState, useEffect } from 'react';
import { watchlistService } from '../services/watchlistService';
import { Article } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { ArticleSkeleton } from '../components/ArticleSkeleton';

export const WatchlistPage: React.FC = () => {
  const [watchlist, setWatchlist] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await watchlistService.getWatchlist();
        setWatchlist(res.data.watchlist);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load your watchlist.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-lg flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-red-500 mb-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.125L5 18V4z" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider">Personal Library</span>
          </div>
          <h1 className="text-3xl font-black">My Saved Watchlist</h1>
          <p className="text-slate-400 text-sm mt-1">
            Read and organize stories you have saved for later.
          </p>
        </div>
        <div className="hidden sm:block bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 text-center">
          <span className="text-2xl font-black text-red-500 block">{watchlist.length}</span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Saved Articles</span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm font-semibold rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <ArticleSkeleton key={n} />
          ))}
        </div>
      ) : watchlist.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Your Watchlist is Empty</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            Bookmark interesting articles while browsing to read them anytime in your personal watchlist.
          </p>
          <a href="/" className="inline-block bg-red-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow">
            Explore News Headlines
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};
