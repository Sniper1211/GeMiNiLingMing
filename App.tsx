
import React, { useState } from 'react';
import { Header, Footer } from './components/Layout';
import { NameCard } from './components/NameCard';
import { Gender, Style, NamingRequest, GenerationState, NameResult } from './types';
import { generateNames } from './services/geminiService';

const App: React.FC = () => {
  const [form, setForm] = useState<NamingRequest>({
    surname: '',
    gender: Gender.MALE,
    style: Style.POETIC,
    preferences: '',
  });

  const [state, setState] = useState<GenerationState>({
    loading: false,
    results: [],
    error: null,
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.surname) {
      alert("请输入姓氏");
      return;
    }

    setState({ loading: true, results: [], error: null });
    try {
      const data = await generateNames(form);
      setState({ loading: false, results: data, error: null });
      // Scroll to results
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    } catch (err: any) {
      setState({ loading: false, results: [], error: err.message });
    }
  };

  return (
    <div className="min-h-screen tech-gradient flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="px-6 py-12 md:py-24 max-w-6xl mx-auto text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 blur-[120px] rounded-full -z-10"></div>
          
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-6 floating">
            AI 赋能 · 经典传承
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            为生命赋予 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">更美好的</span> 起始
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            结合《诗经》、《楚辞》、历代诗词与先进的 AI 技术，为您提供具有文化深度、音韵之美和时代气息的名字。
          </p>

          {/* Form Section */}
          <div className="glass-panel max-w-3xl mx-auto rounded-3xl p-8 md:p-10 shadow-2xl relative">
            <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-400 mb-2">孩子姓氏</label>
                <input
                  type="text"
                  placeholder="如：张"
                  value={form.surname}
                  onChange={(e) => setForm({ ...form, surname: e.target.value })}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-400 mb-2">孩子性别</label>
                <div className="grid grid-cols-3 gap-2">
                  {[Gender.MALE, Gender.FEMALE, Gender.UNISEX].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setForm({ ...form, gender: g })}
                      className={`py-3 rounded-xl text-sm border transition-all ${
                        form.gender === g
                          ? 'bg-cyan-600 border-cyan-500 text-white'
                          : 'bg-slate-900/50 border-white/10 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-400 mb-2">起名风格</label>
                <select
                  value={form.style}
                  onChange={(e) => setForm({ ...form, style: e.target.value as Style })}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all"
                >
                  {Object.values(Style).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-400 mb-2">出生年份 (可选)</label>
                <input
                  type="number"
                  placeholder="2024"
                  value={form.birthYear || ''}
                  onChange={(e) => setForm({ ...form, birthYear: parseInt(e.target.value) || undefined })}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">其他偏好 (可选)</label>
                <textarea
                  placeholder="例如：希望名字里带“水”，或者寓意博学多才..."
                  value={form.preferences}
                  onChange={(e) => setForm({ ...form, preferences: e.target.value })}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 h-24 focus:outline-none focus:border-cyan-500 transition-all resize-none placeholder:text-slate-600"
                ></textarea>
              </div>

              <div className="col-span-2 mt-4">
                <button
                  disabled={state.loading}
                  className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-cyan-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {state.loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>大师正在推演中...</span>
                    </>
                  ) : (
                    <span>立即开启智能取名</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Results Section */}
        {state.results.length > 0 && (
          <section id="results" className="px-6 py-20 bg-slate-950/50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">为您推荐的名字</h3>
                <div className="w-20 h-1 bg-cyan-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {state.results.map((res, idx) => (
                  <NameCard key={idx} result={res} />
                ))}
              </div>

              <div className="mt-16 text-center">
                <p className="text-slate-500 text-sm mb-6">如果不满意？您可以尝试调整偏好再次生成</p>
                <button
                  onClick={handleGenerate}
                  className="px-8 py-3 border border-cyan-500/30 rounded-full hover:bg-cyan-500/10 transition-colors text-cyan-400 font-semibold"
                >
                  换一批名字
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Error State */}
        {state.error && (
          <div className="max-w-md mx-auto p-4 mb-12 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-center">
            {state.error}
          </div>
        )}

        {/* SEO Info Section */}
        <section className="px-6 py-24 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <article>
              <h3 className="text-lg font-bold mb-4 text-cyan-400">为什么选择灵名 AI？</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                传统的取名方式往往受限于个人的知识储备。我们的 AI 系统不仅涵盖了《全唐诗》、《全宋词》等数百万首文学作品，还能根据现代音韵美感进行多维度筛选。
              </p>
            </article>
            <article>
              <h3 className="text-lg font-bold mb-4 text-cyan-400">取名之道，意蕴先行</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                一个好名字是父母给予孩子的第一份人生礼物。它不仅是一个代号，更是家族期望的寄托，甚至可能潜移默化地影响一个人的性格与气质。
              </p>
            </article>
            <article>
              <h3 className="text-lg font-bold mb-4 text-cyan-400">结合五行八字</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                我们的算法在生成名字的同时，会综合考量汉字的自然属性（五行），力求名字在文化寓意与音律节奏之间达到完美平衡。
              </p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
