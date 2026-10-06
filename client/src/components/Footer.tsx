import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-red-600 text-white font-black text-lg px-2 py-0.5 rounded">
                N
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                NEXT<span className="text-red-500">NEWS</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed">
              Real-time full-stack news platform providing high-impact journalism, breaking updates, and in-depth analytical coverage across global industries.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/?category=Technology" className="hover:text-white transition">Technology</Link></li>
              <li><Link to="/?category=Business" className="hover:text-white transition">Business & Finance</Link></li>
              <li><Link to="/?category=World" className="hover:text-white transition">World Affairs</Link></li>
              <li><Link to="/?category=Science" className="hover:text-white transition">Science & Discovery</Link></li>
              <li><Link to="/?category=Culture" className="hover:text-white transition">Culture & Society</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition">Home Dashboard</Link></li>
              <li><Link to="/watchlist" className="hover:text-white transition">Personal Watchlist</Link></li>
              <li><Link to="/profile" className="hover:text-white transition">Account Profile</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Architecture</h4>
            <div className="space-y-2 text-slate-400">
              <p>Node.js · Express.js · React · TypeScript · MongoDB · Tailwind CSS · JWT</p>
              <div className="pt-2 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono text-emerald-400">Real-time SSE Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Next News. All rights reserved.</p>
          <p className="text-slate-400 text-[11px]">Designed for high-performance responsive news consumption.</p>
        </div>
      </div>
    </footer>
  );
};
