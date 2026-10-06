import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto my-16 bg-white p-10 rounded-2xl border border-slate-200 text-center shadow-sm space-y-4">
      <div className="text-red-600 font-black text-6xl">404</div>
      <h1 className="text-2xl font-black text-slate-900">Page Not Found</h1>
      <p className="text-slate-500 text-sm">
        The news story or page you are looking for does not exist or has been moved.
      </p>
      <div className="pt-4">
        <Link
          to="/"
          className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow transition"
        >
          Return to Headlines
        </Link>
      </div>
    </div>
  );
};
