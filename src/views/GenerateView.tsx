import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, BrainCircuit, Layers, RefreshCw, BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { generateLearningRoadmap } from '../services/geminiService';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const GenerateView = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [skills, setSkills] = useState('');
  const [mode, setMode] = useState<'fast' | 'deep'>('fast');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await generateLearningRoadmap(goal, level, skills, mode);

      const roadmapData = {
        ...result,
        videoUrl: '',
        userId: user?.uid || 'anonymous',
        createdAt: new Date().toISOString(),
      };

      if (user && user.uid !== 'demo-user-123') {
        try {
          const docRef = await addDoc(collection(db, 'roadmaps'), {
            ...roadmapData,
            savedAt: serverTimestamp()
          });
          navigate(`/paths/${docRef.id}`, { state: { roadmap: { ...roadmapData, id: docRef.id } } });
        } catch (fbErr: any) {
          console.error('Firebase save failed:', fbErr);
          // Permission errors surface here — fall back to temp navigation
          const tempId = `temp-${Date.now()}`;
          navigate(`/paths/${tempId}`, { state: { roadmap: { ...roadmapData, id: tempId } } });
        }
      } else {
        // Skip Firebase for unauthenticated users and our UI Demo Mock User
        const tempId = `temp-${Date.now()}`;
        navigate(`/paths/${tempId}`, { state: { roadmap: { ...roadmapData, id: tempId } } });
      }
    } catch (err: any) {
      const msg = err?.message || 'Failed to generate roadmap. Please try again.';
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight text-on-surface mb-4">
          What do you want to master?
        </h1>
        <p className="text-on-surface-variant text-lg">
          Enter your goal and we'll build a personalized learning journey using neural-network intelligence.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-6 bg-background neomorph-raised p-8 rounded-3xl border border-white/40">
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Target className="w-4 h-4" />
            Learning Goal
          </label>
          <input
            required
            type="text"
            placeholder="e.g. Quantum Computing, Digital Marketing, Italian Cooking"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border-none neomorph-inset focus:ring-2 focus:ring-primary/40 text-on-surface bg-background"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" />
              Knowledge Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border-none neomorph-inset focus:ring-2 focus:ring-primary/40 text-on-surface bg-background"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              AI Intelligence
            </label>
            <div className="flex p-1 bg-surface-container-low rounded-xl neomorph-inset">
              <button
                type="button"
                onClick={() => setMode('fast')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all ${
                  mode === 'fast' 
                    ? 'bg-background neomorph-raised text-primary' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <RefreshCw className={`w-3 h-3 ${mode === 'fast' ? 'animate-spin-slow' : ''}`} />
                Fast
              </button>
              <button
                type="button"
                onClick={() => setMode('deep')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all ${
                  mode === 'deep' 
                    ? 'bg-background neomorph-raised text-primary' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <BrainCircuit className="w-3 h-3" />
                Deep
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Known Skills (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Python, Basic Math"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border-none neomorph-inset focus:ring-2 focus:ring-primary/40 text-on-surface bg-background"
          />
        </div>



        <button
          disabled={loading}
          type="submit"
          className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-[0_0_15px_rgba(99,102,241,0.4)]"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Designing your pathway...
            </>
          ) : (
            <>
              Generate Roadmap
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {error && (
          <p className="text-error text-sm text-center font-medium">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};
