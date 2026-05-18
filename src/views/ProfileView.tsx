import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const ProfileView = () => {
  const { user } = useAuth();
  const isDemo = user?.uid === 'demo-user-123';

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full neomorph-raised p-2 bg-background overflow-hidden border-4 border-surface">
            <div className="w-full h-full rounded-full bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-primary opacity-50" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface tracking-tight">
                {user?.displayName || 'Learning Architect'}
              </h2>
              <p className="text-on-surface-variant font-medium mt-1">Joined March 2024 • Pro Member</p>
            </div>
            <button className="px-6 py-2 rounded-xl neomorph-raised text-secondary font-semibold hover:text-primary transition-colors active:scale-95">
              Edit Profile
            </button>
          </div>
          <p className="text-on-surface leading-relaxed max-w-2xl">
            AI Researcher and full-stack developer focusing on decentralized protocols and autonomous neural networks. Currently mastering Advanced LLM Architectures and Cryptographic Security.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full neomorph-inset text-sm font-medium text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">location_on</span> SF, California
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full neomorph-inset text-sm font-medium text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">link</span> pathway.ai/profile
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview Bento */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl neomorph-raised bg-background flex flex-col items-center justify-center space-y-2">
          <span className="text-4xl font-headline font-extrabold text-primary">{isDemo ? '12' : '0'}</span>
          <span className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">Paths Finished</span>
        </div>
        <div className="p-6 rounded-2xl neomorph-raised bg-background flex flex-col items-center justify-center space-y-2">
          <span className="text-4xl font-headline font-extrabold text-tertiary">{isDemo ? '142' : '0'}</span>
          <span className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">Badges Earned</span>
        </div>
        <div className="p-6 rounded-2xl neomorph-raised bg-background flex flex-col items-center justify-center space-y-2">
          <span className="text-4xl font-headline font-extrabold text-indigo-400">{isDemo ? '98%' : '-'}</span>
          <span className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">Focus Score</span>
        </div>
      </section>

      {/* Activity Heatmap */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-headline font-semibold text-on-surface">Learning Activity</h3>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-surface-container"></div>
              <div className="w-3 h-3 rounded-sm bg-primary/20"></div>
              <div className="w-3 h-3 rounded-sm bg-primary/50"></div>
              <div className="w-3 h-3 rounded-sm bg-primary"></div>
            </div>
            <span>More</span>
          </div>
        </div>
        <div className="p-6 rounded-2xl neomorph-raised bg-background overflow-x-auto">
          <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-[800px]">
            {/* Simulate heatmap grid */}
            {Array.from({ length: 364 }).map((_, i) => {
              if (!isDemo) return <div key={i} className="w-3.5 h-3.5 rounded-sm bg-surface-container" />;
              const colors = ['bg-surface-container', 'bg-primary/20', 'bg-primary/40', 'bg-primary/70', 'bg-primary'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              return <div key={i} className={`w-3.5 h-3.5 rounded-sm ${color}`} />;
            })}
          </div>
        </div>
      </section>

      {/* Bottom Layout: Skills & Paths */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="space-y-6">
          <h3 className="text-xl font-headline font-semibold text-on-surface">Skills Mastered</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {isDemo ? [
              { icon: 'neurology', label: 'Neural Nets' },
              { icon: 'terminal', label: 'Python Pro' },
              { icon: 'database', label: 'Big Data' },
              { icon: 'encrypted', label: 'Cryptography' },
              { icon: 'cloud_done', label: 'Cloud Arch' },
              { icon: 'auto_awesome', label: 'Generative AI' }
            ].map((skill, i) => (
              <div key={i} className="p-4 rounded-xl neomorph-raised bg-background flex flex-col items-center text-center space-y-3 group hover:shadow-[4px_4px_8px_rgba(0,0,0,0.04)] transition-all">
                <div className="w-12 h-12 rounded-full neomorph-inset flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{skill.icon}</span>
                </div>
                <span className="text-sm font-semibold text-on-surface">{skill.label}</span>
              </div>
            )) : (
              <div className="col-span-full py-8 text-center text-on-surface-variant text-sm">No skills mastered yet. Start learning to earn skills.</div>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-headline font-semibold text-on-surface">Completed Paths</h3>
          <div className="space-y-4">
            {isDemo ? [
              { title: 'Intro to Machine Learning', date: 'May 12, 2024', icon: 'rocket_launch' },
              { title: 'Graph Neural Networks', date: 'April 28, 2024', icon: 'lan' },
              { title: 'AI Ethics and Safety', date: 'March 15, 2024', icon: 'security' },
            ].map((path, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl neomorph-raised bg-background">
                <div className="w-12 h-12 rounded-xl neomorph-inset flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{path.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-on-surface">{path.title}</h4>
                  <p className="text-xs text-on-surface-variant">Completed on {path.date}</p>
                </div>
                <div className="text-primary">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
              </div>
            )) : (
              <div className="py-8 text-center text-on-surface-variant text-sm border border-dashed border-outline-variant rounded-2xl">No completed paths yet. Keep learning!</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
