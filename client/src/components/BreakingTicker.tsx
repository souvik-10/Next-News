import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { articleService } from '../services/articleService';
import { Article } from '../types';
import { useRealTimeNews } from '../hooks/useRealTimeNews';

export const BreakingTicker: React.FC = () => {
  const [breakingArticles, setBreakingArticles] = useState<Article[]>([]);
  const { isConnected, latestBreakingNews } = useRealTimeNews();

  useEffect(() => {
    const fetchBreaking = async () => {
      try {
        const res = await articleService.getBreakingNews();
        setBreakingArticles(res.data.articles);
      } catch (err) {
        console.error('Failed to fetch breaking news', err);
      }
    };
    fetchBreaking();
  }, []);

  useEffect(() => {
    if (latestBreakingNews) {
      setBreakingArticles((prev) => [
        {
          _id: latestBreakingNews.id,
          title: latestBreakingNews.title,
          category: latestBreakingNews.category,
          slug: latestBreakingNews.slug,
          summary: '',
          content: '',
          imageUrl: '',
          author: 'Live Editor',
          tags: [],
          viewsCount: 0,
          readTimeMinutes: 1,
          isBreaking: true,
          createdAt: latestBreakingNews.createdAt,
          updatedAt: latestBreakingNews.createdAt,
        },
        ...prev,
      ]);
    }
  }, [latestBreakingNews]);

  if (breakingArticles.length === 0) return null;

  return (
    <div className="bg-red-900/90 text-white border-b border-red-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center space-x-3 overflow-hidden">
        
        {/* Live Indicator */}
        <div className="flex items-center space-x-1.5 shrink-0 bg-red-600 px-2.5 py-0.5 rounded font-black tracking-wider uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span>Breaking</span>
        </div>

        {/* Ticker Item */}
        <div className="flex-1 truncate space-x-4">
          {breakingArticles.map((art) => (
            <Link
              key={art._id}
              to={`/article/${art.slug || art._id}`}
              className="hover:underline font-medium text-red-100 transition inline-block mr-6"
            >
              <span className="font-bold text-white mr-1.5">[{art.category}]</span>
              {art.title}
            </Link>
          ))}
        </div>

        {/* Real-time Status Badge */}
        <div className="hidden lg:flex items-center space-x-1 shrink-0 text-xs text-red-200">
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
          <span className="font-mono">{isConnected ? 'LIVE FEED' : 'RECONNECTING'}</span>
        </div>
      </div>
    </div>
  );
};
