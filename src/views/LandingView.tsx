import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const LandingView = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-[#0C0C14] text-white selection:bg-primary/30 selection:text-white min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-8 py-6 w-full absolute top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <span className="text-xl font-headline font-extrabold text-white tracking-tight">PathwayAI</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-8">
            <Link to={user ? "/explore" : "/login"} className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">Explore</Link>
            <Link to={user ? "/dashboard" : "/login"} className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">Roadmap</Link>
            <Link to={user ? "/community" : "/login"} className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">Community</Link>
          </nav>
          {user ? (
            <Link 
              to="/dashboard"
              className="bg-[#0C0C14] text-white px-6 py-2.5 rounded-full border border-tertiary/50 hover:border-tertiary transition-all duration-300 text-sm font-semibold shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link 
              to="/login"
              className="bg-[#0C0C14] text-white px-6 py-2.5 rounded-full border border-tertiary/50 hover:border-tertiary transition-all duration-300 text-sm font-semibold shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
            >
              Sign In
            </Link>
          )}
        </div>
        <button className="md:hidden text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0C0C14] px-4">
        <div className="absolute inset-0 neural-bg opacity-40"></div>
        <div className="absolute inset-0 hero-gradient"></div>
        
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-tertiary/5 rounded-full blur-[120px]"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8 mt-16">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary-fixed-dim">Next-Gen Learning Engine</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-headline font-extrabold text-white leading-none tracking-[-0.04em]">
            What do you want to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">master today?</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#64748B] font-medium max-w-2xl mx-auto leading-relaxed">
            Your AI mentor. Built for mastery. Personalized learning paths powered by cognitive science and neural-network intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button 
              onClick={() => {
                if (!user) {
                  navigate('/login');
                } else {
                  navigate('/generate');
                }
              }}
              className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-xl font-bold text-lg shadow-[0_10px_30px_rgba(99,102,241,0.4)] hover:translate-y-[-2px] transition-all active:scale-95 text-center"
            >
              Start Your Path
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg backdrop-blur-sm hover:bg-white/10 transition-all active:scale-95">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-60">
          <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Scroll to Explore</span>
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-white animate-bounce">expand_more</span>
          </div>
        </div>
      </main>

      {/* Bento Grid Section */}
      <section className="relative z-20 px-8 py-24 max-w-7xl mx-auto bg-[#0C0C14]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
          <div className="md:col-span-8 md:row-span-2 bg-[#12121e] rounded-3xl p-10 border border-white/5 flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop" alt="AI Interface" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C14] via-[#0C0C14]/40 to-transparent"></div>
            <div className="relative z-10 space-y-4">
              <div className="bg-primary px-3 py-1 rounded text-[10px] font-bold text-white uppercase inline-block">Adaptive Learning</div>
              <h2 className="text-3xl font-bold text-white">Dynamic Neural Curriculums</h2>
              <p className="text-on-surface-variant max-w-lg">Our engine analyzes your cognitive pace to adjust difficulty in real-time, ensuring you stay in the flow state for optimal retention.</p>
            </div>
          </div>
          <div className="md:col-span-4 md:row-span-1 bg-[#12121e] rounded-3xl p-8 border border-white/5 flex flex-col justify-between hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 bg-tertiary/20 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary">timeline</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Micro-Milestones</h3>
              <p className="text-sm text-on-surface-variant">Gamified progression system designed to keep dopamine levels high.</p>
            </div>
          </div>
          <div className="md:col-span-4 md:row-span-1 bg-gradient-to-br from-primary/20 to-tertiary/20 rounded-3xl p-8 border border-white/10 flex flex-col justify-center items-center text-center backdrop-blur-xl">
            <div className="text-4xl font-black text-white mb-2 tracking-tighter">98%</div>
            <p className="text-xs uppercase tracking-widest font-bold text-primary-fixed-dim">Concept Retention Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
};
