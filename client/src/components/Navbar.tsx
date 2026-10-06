import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CreateArticleModal } from './CreateArticleModal';

const categories = ['All', 'Technology', 'Business', 'World', 'Science', 'Culture'];

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleCategoryClick = (cat: string) => {
    if (cat === 'All') {
      navigate('/');
    } else {
      navigate(`/?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg border-b border-slate-800">
        {/* Top Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-red-600 text-white font-black text-xl px-2.5 py-1 rounded shadow group-hover:bg-red-500 transition-colors">
                N
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                NEXT<span className="text-red-500">NEWS</span>
              </span>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search breaking news, topics, authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 text-slate-100 placeholder-slate-400 text-sm rounded-full pl-4 pr-10 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Action Navigation */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow transition flex items-center space-x-1"
                  >
                    <span>+ Post Story</span>
                  </button>

                  <Link
                    to="/watchlist"
                    className="flex items-center space-x-1 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition"
                  >
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.125L5 18V4z" />
                    </svg>
                    <span className="hidden sm:inline">Watchlist</span>
                  </Link>

                  <div className="relative flex items-center space-x-3 pl-2 border-l border-slate-700">
                    <Link to="/profile" className="flex items-center space-x-2 group">
                      {user?.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-red-500/50 group-hover:ring-red-500 transition"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-red-500/50 group-hover:ring-red-500 transition">
                          {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                      <span className="hidden lg:inline text-sm font-semibold text-slate-200 group-hover:text-white">
                        {user?.name}
                      </span>
                    </Link>

                    <button
                      onClick={logout}
                      title="Logout"
                      className="text-slate-400 hover:text-red-400 p-1 rounded-md transition"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-slate-300 hover:text-white text-sm font-semibold px-3 py-1.5 transition"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Category Navigation Bar */}
          <div className="flex items-center justify-between border-t border-slate-800 py-2.5 overflow-x-auto no-scrollbar">
            <nav className="flex space-x-1 sm:space-x-2">
              {categories.map((cat) => {
                const isActive = (cat === 'All' && !searchParams.get('category')) || currentCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                      isActive
                        ? 'bg-red-600 text-white shadow'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Post Story Modal */}
      <CreateArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          navigate('/');
          window.location.reload();
        }}
      />
    </>
  );
};
