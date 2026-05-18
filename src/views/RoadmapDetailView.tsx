import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export const RoadmapDetailView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roadmap = location.state?.roadmap;

  if (!roadmap) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-4">No Roadmap Found</h2>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2 bg-primary text-white rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="flex-1">
        <header className="mb-12">
          <Link to="/dashboard" className="flex items-center text-primary font-medium text-sm mb-4 group">
            <span className="material-symbols-outlined text-sm mr-1 group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-headline font-semibold text-on-surface mb-2 tracking-tight">{roadmap.learningGoal}</h1>
          <p className="text-on-surface-variant font-body">Follow this curated path to master your goals.</p>
        </header>

        <div className="relative pl-12 space-y-16">
          <div className="absolute left-[23px] top-4 bottom-4 w-1.5 bg-gradient-to-b from-primary to-tertiary rounded-full shadow-[0_0_12px_rgba(124,58,237,0.4)]"></div>

          {roadmap.steps.map((step: any, idx: number) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-background neomorph-raised border-2 border-tertiary flex items-center justify-center z-10 shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                <span className="text-tertiary font-bold text-xs">{String(idx + 1).padStart(2, '0')}</span>
              </div>
              <div className="bg-background neomorph-raised rounded-xl p-6 lg:p-8 ml-4 group-hover:scale-[1.01] transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-headline font-semibold text-on-surface">{step.title}</h3>
                      {idx === 0 && (
                        <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider">Active</span>
                      )}
                    </div>
                    <p className="text-sm text-on-surface-variant mb-6">{step.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {step.topics?.map((topic: string, tid: number) => (
                        <span key={tid} className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface-variant neomorph-inset">{topic}</span>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {step.resources?.length > 0 && (
                        <div className="flex flex-col gap-2">
                          <span className="text-xs font-bold uppercase text-outline">Resources</span>
                          <div className="flex flex-col gap-2">
                            {step.resources.map((res: any, rid: number) => (
                              <a key={rid} href={res.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                <span className="material-symbols-outlined text-sm">{res.type === 'video' ? 'play_circle' : 'description'}</span>
                                {res.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="w-full h-1.5 bg-surface-container-low neomorph-inset rounded-full overflow-hidden mt-4">
                        <div className="h-full bg-tertiary rounded-full shadow-[0_0_8px_rgba(124,58,237,0.5)]" style={{ width: idx === 0 ? '65%' : '0%' }}></div>
                      </div>
                    </div>
                  </div>
                  {idx === 0 ? (
                    <button className="px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all shadow-[0_0_10px_rgba(99,102,241,0.2)] active:scale-95">
                      Mark Complete
                    </button>
                  ) : (
                    <div className="text-on-surface-variant opacity-50">
                      <span className="material-symbols-outlined">lock</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="w-full lg:w-80 space-y-8">
        <div className="bg-background neomorph-raised rounded-2xl p-8">
          <h2 className="font-headline font-semibold text-on-surface mb-6">Your Progress</h2>
          <div className="relative flex items-center justify-center mb-8">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle className="text-surface-container-low" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12"></circle>
              <circle className="text-primary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="330" strokeLinecap="round" strokeWidth="12"></circle>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-on-surface">25%</span>
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Total</span>
            </div>
          </div>
        </div>

        <div className="bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-2xl p-6 shadow-[inset_4px_4px_8px_rgba(124,58,237,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.4)] border border-tertiary/20">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-on-tertiary-fixed-variant" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
            <span className="text-sm font-bold uppercase tracking-wider">AI Insight</span>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            "Based on your goal to master {roadmap.learningGoal}, focus heavily on the first two modules. Building a strong foundational base is critical."
          </p>
        </div>
      </aside>
    </div>
  );
};
