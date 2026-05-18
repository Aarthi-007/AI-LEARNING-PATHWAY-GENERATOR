import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Pass credentials to our mock auth which will simulate an API delay
      await login(email, password);
      // AuthContext login function will resolve successfully
      navigate('/explore');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await login('demo-google@pathway.ai', 'google-auth');
      navigate('/explore');
    } catch (err) {
      setError('Google authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0C0C14] text-white selection:bg-primary/30 selection:text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Neural Background Pattern */}
      <div className="absolute inset-0 neural-bg opacity-40"></div>
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Animated Accents (Abstract Shapes) */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-tertiary/10 rounded-full blur-[120px]"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10 flex flex-col items-center">
          <Link to="/" className="inline-flex items-center space-x-3 mb-6 hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <span className="text-2xl font-headline font-extrabold text-white tracking-tight">PathwayAI</span>
          </Link>
          <h1 className="text-3xl font-headline font-bold text-white mb-2">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm text-on-surface-variant max-w-xs mx-auto">
            {isLogin ? 'Enter your credentials to continue your mastery journey.' : 'Join thousands of learners achieving their goals with AI.'}
          </p>
        </div>

        <div className="bg-[#12121e] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-tertiary"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {error && (
              <div className="p-3 bg-error/10 border border-error/30 rounded-xl flex items-center space-x-3 text-error text-sm">
                <span className="material-symbols-outlined text-lg">error</span>
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-[#0a0a10] border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-white/20 transition-all outline-none"
                  placeholder="you@example.com"
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/20">mail</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Password</label>
                {isLogin && <a href="#" className="text-xs text-primary hover:text-white transition-colors">Forgot password?</a>}
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-[#0a0a10] border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-white/20 transition-all outline-none"
                  placeholder="••••••••"
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/20">lock</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative px-4 bg-[#12121e] text-xs font-medium text-white/40 uppercase tracking-wider">
              Or continue with
            </div>
          </div>

          <div className="mt-6">
            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full py-4 bg-white text-black rounded-xl font-bold flex items-center justify-center space-x-3 hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Google</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-on-surface-variant">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }} 
              className="text-primary font-bold hover:text-white transition-colors underline decoration-primary/30 underline-offset-4"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
