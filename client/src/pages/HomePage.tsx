import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { articleService } from '../services/articleService';
import { Article, Pagination } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { ArticleSkeleton } from '../components/ArticleSkeleton';

export const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;

  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<'newest' | 'popular'>('newest');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [category, search, sort]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await articleService.getArticles({
          page,
          limit: 7,
          category,
          search,
          sort,
        });
        setArticles(res.data.articles);
        setPagination(res.data.pagination);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load news articles.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [page, category, search, sort]);

  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="space-y-8">
      {/* Search Header Banner (if search active) */}
      {search && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Search Results for <span className="text-red-600">"{search}"</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">Found {pagination?.total || 0} matching stories</p>
          </div>
        </div>
      )}

      {/* Category Header Banner */}
      {!search && category && (
        <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
              Category
            </span>
            <h1 className="text-3xl font-black mt-3">{category} News</h1>
            <p className="text-slate-400 text-sm mt-1">
              Latest stories, analysis, and breaking updates in {category}.
            </p>
          </div>
        </div>
      )}

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {search ? 'Matching News' : category ? `${category} Headlines` : 'Top Stories & Latest News'}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Sort by:</span>
          <div className="bg-white p-1 rounded-xl border border-slate-200 flex space-x-1 shadow-sm">
            <button
              onClick={() => setSort('newest')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                sort === 'newest' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setSort('popular')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                sort === 'popular' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Most Popular
            </button>
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-8">
          <div className="h-96 bg-slate-200 rounded-2xl animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <ArticleSkeleton key={n} />
            ))}
          </div>
        </div>
      ) : articles.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Articles Found</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            We couldn't find any news articles matching your current filter criteria.
          </p>
          <a href="/" className="inline-block bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl">
            Clear Filters
          </a>
        </div>
      ) : (
        <>
          {/* Featured Hero Article */}
          {featuredArticle && page === 1 && !search && (
            <ArticleCard article={featuredArticle} featured={true} />
          )}

          {/* Grid of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(page === 1 && !search ? remainingArticles : articles).map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center items-center space-x-2 pt-8">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs disabled:opacity-50 hover:bg-white transition"
              >
                Previous
              </button>
              <span className="text-xs font-semibold text-slate-600 px-3">
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                disabled={page === pagination.pages}
                onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs disabled:opacity-50 hover:bg-white transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
