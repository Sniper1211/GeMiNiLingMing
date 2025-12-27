
import React from 'react';
import { NameResult } from '../types';

interface Props {
  result: NameResult;
}

export const NameCard: React.FC<Props> = ({ result }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl hover:border-cyan-500/50 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2">
        <div className="flex gap-1">
          {result.elements.map(e => (
            <span key={e} className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {e}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-3xl font-bold font-serif text-white group-hover:text-cyan-400 transition-colors">
          {result.fullName}
        </h3>
        {result.source && (
          <p className="text-xs text-amber-500/80 mt-1 font-serif">
            {result.source}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">寓意解析</h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {result.meaning}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">文化深度</h4>
          <p className="text-xs text-slate-400 italic">
            {result.analysis}
          </p>
        </div>
      </div>

      <button className="mt-6 w-full py-2 text-xs border border-white/10 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
        <span>复制名字</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      </button>
    </div>
  );
};
