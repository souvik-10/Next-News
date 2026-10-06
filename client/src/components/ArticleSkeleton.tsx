import React from 'react';

export const ArticleSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 animate-pulse flex flex-col justify-between">
      <div>
        <div className="aspect-video bg-slate-200" />
        <div className="p-5 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-6 bg-slate-200 rounded w-full" />
          <div className="h-6 bg-slate-200 rounded w-4/5" />
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-2/3" />
        </div>
      </div>
      <div className="px-5 py-3 border-t border-slate-100 flex justify-between">
        <div className="h-3 bg-slate-200 rounded w-20" />
        <div className="h-3 bg-slate-200 rounded w-16" />
      </div>
    </div>
  );
};
