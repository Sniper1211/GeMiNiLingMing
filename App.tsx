
import React, { useState } from 'react';
import { Header, Footer } from './components/Layout';
import { NameCard } from './components/NameCard';
import { Gender, Style, NamingRequest, GenerationState, NamingType } from './types';
import { generateNames } from './services/geminiService';

const App: React.FC = () => {
  const [form, setForm] = useState<NamingRequest>({
    type: NamingType.PERSON,
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
      alert("请输入必要信息（姓氏/行业/前缀）");
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

  const isPersonOrPet = form.type === NamingType.PERSON || form.type === NamingType.PET;

  return (
    <div className="min-h-screen tech-gradient flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="px-6 py-12 md:py-24 max-w-6xl mx-auto text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 blur-[120px] rounded-full -z-10"></div>
          
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-6 floating">
            AI 赋能 · 万物有名
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            为美好赋予 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">独特的</span> 称谓
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            无论是新生儿、公司品牌还是心爱萌宠，结合传统文化底蕴与现代 AI 技术，为您提供富有深度、音韵优美的好名字。
          </p>

          {/* Form Section */}
          <div className="glass-panel max-w-3xl mx-auto rounded-3xl p-8 md:p-10 shadow-2xl relative">
            <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-slate-400 mb-2">取名类型</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as NamingType })}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all"
                >
                  {Object.values(NamingType).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  {isPersonOrPet ? '姓氏' : '行业/前缀/关键词'}
                </label>
                <input
                  type="text"
                  placeholder={isPersonOrPet ? "如：张" : "如：科技、餐饮、未来"}
                  value={form.surname}
                  onChange={(e) => setForm({ ...form, surname: e.target.value })}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600"
                />
              </div>

              {isPersonOrPet && (
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-400 mb-2">性别</label>
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
              )}

              <div className={`col-span-2 ${isPersonOrPet ? 'md:col-span-1' : ''}`}>
                <label className="block text-sm font-medium text-slate-400 mb-2">风格倾向</label>
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

              {form.type === NamingType.PERSON && (
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-400 mb-2">出生年份 (可选)</label>
                  <input
                    type="number"
                    placeholder="2024"
                    value={form.birthYear || ''}
                    onChange={(e) => setForm({ ...form, birthYear: parseInt(e.target.value) || undefined })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>
              )}

              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">其他偏好 (可选)</label>
                <textarea
                  placeholder={
                    form.type === NamingType.COMPANY 
                    ? "例如：希望能体现创新、全球化，或者包含'智'字..." 
                    : "例如：希望名字里带“水”，或者寓意博学多才..."
                  }
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
                      <span>智能推演中...</span>
                    </>
                  ) : (
                    <span>立即生成名字</span>
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
                打破传统局限，我们的 AI 系统融合了《诗经》、《楚辞》等中华经典与现代品牌营销学理论，为您提供既有文化深度又符合时代审美的名字。
              </p>
            </article>
            <article>
              <h3 className="text-lg font-bold mb-4 text-cyan-400">取名之道，意蕴先行</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                一个好名字是个人、品牌或企业的核心资产。它不仅是一个代号，更是愿景的寄托，能在第一时间传递出独特的气质与价值。
              </p>
            </article>
            <article>
              <h3 className="text-lg font-bold mb-4 text-cyan-400">多维度智能分析</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                我们的算法在生成名字的同时，会综合考量音律节奏、字形结构、文化寓意以及五行属性，力求在各个维度上达到完美平衡。
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
