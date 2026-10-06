import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setIsLoading(true);
      setError(null);
      const res = await authService.login({ email, password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto my-12 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-block bg-red-600 text-white font-black text-2xl px-3 py-1 rounded shadow">
          N
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
        <p className="text-slate-500 text-xs">Log in to access your custom news watchlist and discussion comments.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="reader@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-bold py-3 rounded-xl shadow-lg transition"
        >
          {isLoading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>

      <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
        Don't have an account yet?{' '}
        <Link to="/register" className="text-red-600 font-bold hover:underline">
          Register Here
        </Link>
      </div>
    </div>
  );
};
