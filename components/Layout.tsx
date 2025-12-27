
import React from 'react';

export const Header: React.FC = () => (
  <header className="fixed top-0 w-full z-50 border-b border-white/10 glass-panel px-6 py-4 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-cyan-500 rounded-lg rotate-45 flex items-center justify-center">
        <span className="text-white font-bold -rotate-45">灵</span>
      </div>
      <h1 className="text-xl font-bold tracking-tighter text-cyan-400">灵名 AI <span className="text-white/50 font-normal text-sm ml-2">LING MING AI</span></h1>
    </div>
    <nav className="hidden md:flex gap-8 text-sm text-slate-300">
      <a href="#" className="hover:text-cyan-400 transition-colors">智能取名</a>
      <a href="#" className="hover:text-cyan-400 transition-colors">文学典故</a>
      <a href="#" className="hover:text-cyan-400 transition-colors">姓名解析</a>
      <a href="#" className="hover:text-cyan-400 transition-colors">关于我们</a>
    </nav>
    <button className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm px-4 py-2 rounded-full transition-all">
      立即开始
    </button>
  </header>
);

export const Footer: React.FC = () => (
  <footer className="border-t border-white/10 bg-slate-950 py-12 px-6">
    <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
      <div className="col-span-2">
        <h2 className="text-xl font-bold mb-4 text-cyan-400">灵名 AI (LING MING)</h2>
        <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
          融合了大型语言模型与千年中华起名智慧，我们致力于为您寻找那个能够陪伴一生的美好符号。
          传承经典，启迪未来。
        </p>
      </div>
      <div>
        <h3 className="font-bold mb-4">快速链接</h3>
        <ul className="text-slate-400 text-sm space-y-2">
          <li>宝宝取名大全</li>
          <li>诗经楚辞起名</li>
          <li>五行八字排盘</li>
          <li>公司命名建议</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-4">联系我们</h3>
        <p className="text-slate-400 text-sm">合作邮箱：contact@lingming.ai</p>
        <p className="text-slate-400 text-sm mt-2">© 2024 灵名 AI. 保留所有权利。</p>
      </div>
    </div>
  </footer>
);
