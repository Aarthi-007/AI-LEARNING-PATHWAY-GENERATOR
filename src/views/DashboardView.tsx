import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export const DashboardView = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const fetchHistory = async () => {
        try {
          const q = query(
            collection(db, 'roadmaps'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
          );
          const querySnapshot = await getDocs(q);
          const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setHistory(docs);
        } catch (err) {
          console.error("Firebase not configured or error fetching:", err);
          if (user.uid === 'demo-user-123') {
            // Provide high-fidelity mock data for the demo user
            setHistory([
              {
                id: 'mock-1',
                learningGoal: 'Advanced Neural Architectures',
                steps: [{ title: 'Transformers & Attention' }, { title: 'Optimization' }]
              },
              {
                id: 'mock-2',
                learningGoal: 'Full-Stack Web Dev',
                steps: Array(18).fill({})
              },
              {
                id: 'mock-3',
                learningGoal: 'Data Science Fundamentals',
                steps: Array(24).fill({})
              },
              {
                id: 'mock-4',
                learningGoal: 'Cybersecurity Shield',
                steps: Array(20).fill({})
              }
            ]);
          } else {
            // Return empty state for fresh users
            setHistory([]);
          }
        }
      };
      fetchHistory();
    }
  }, [user]);

  const activeRoadmap = history.length > 0 ? history[0] : null;
  const isDemo = user?.uid === 'demo-user-123';

  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="neomorph-raised p-6 rounded-2xl flex flex-col items-center text-center group">
          <div className="w-12 h-12 neomorph-inset rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          </div>
          <span className="text-3xl font-bold text-on-surface">{isDemo ? '12' : '0'}</span>
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Streak Days</span>
        </div>
        <div className="neomorph-raised p-6 rounded-2xl flex flex-col items-center text-center group">
          <div className="w-12 h-12 neomorph-inset rounded-full flex items-center justify-center text-tertiary mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <span className="text-3xl font-bold text-on-surface">{isDemo ? '48.5' : '0'}</span>
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Total Hours</span>
        </div>
        <div className="neomorph-raised p-6 rounded-2xl flex flex-col items-center text-center group">
          <div className="w-12 h-12 neomorph-inset rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">verified_user</span>
          </div>
          <span className="text-3xl font-bold text-on-surface">{isDemo ? '9' : '0'}</span>
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Skills Mastered</span>
        </div>
        <div className="neomorph-raised p-6 rounded-2xl flex flex-col items-center text-center group">
          <div className="w-12 h-12 neomorph-inset rounded-full flex items-center justify-center text-tertiary mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">auto_stories</span>
          </div>
          <span className="text-3xl font-bold text-on-surface">{history.length}</span>
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Paths Completed</span>
        </div>
      </section>

      {/* Hero Row: Continue Learning */}
      <section className="space-y-6">
        <h3 className="text-xl font-headline font-bold text-on-surface flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full"></span>
          Continue Learning
        </h3>
        
        {activeRoadmap ? (
          <div className="neomorph-raised rounded-3xl overflow-hidden group relative flex flex-col lg:flex-row min-h-[400px]">
            <div className="lg:w-3/5 h-[250px] lg:h-auto overflow-hidden bg-black flex items-center justify-center">
              {activeRoadmap.videoUrl ? (
                <video src={activeRoadmap.videoUrl} autoPlay loop muted className="w-full h-full object-cover opacity-80" />
              ) : (
                <div className="w-full h-full hero-gradient" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background"></div>
            </div>
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-background z-10">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4">Current Module</span>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface leading-tight mb-4">{activeRoadmap.learningGoal}</h2>
              <p className="text-on-surface-variant mb-8 max-w-lg line-clamp-2">Master the complexities of {activeRoadmap.learningGoal} and advance your career with this curated path.</p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-on-surface">
                    <span>15% Complete</span>
                    <span className="text-primary">Next: {activeRoadmap.steps[0]?.title || 'Introduction'}</span>
                  </div>
                  <div className="w-full h-3 neomorph-inset rounded-full p-0.5">
                    <div className="h-full bg-primary rounded-full w-[15%]" style={{ boxShadow: "0 0 12px rgba(99, 102, 241, 0.4)" }}></div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => navigate(`/paths/${activeRoadmap.id}`, { state: { roadmap: activeRoadmap } })}
                    className="neomorph-raised px-8 py-4 bg-background rounded-2xl text-primary font-bold flex items-center gap-3 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    Resume Lesson
                  </button>
                  <span className="text-xs text-on-surface-variant italic">Last Accessed: Today</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="neomorph-raised rounded-3xl p-12 text-center flex flex-col items-center justify-center border border-dashed border-outline-variant">
            <span className="material-symbols-outlined text-6xl text-outline mb-4">explore</span>
            <h2 className="text-2xl font-bold mb-2">No Active Paths</h2>
            <p className="text-on-surface-variant mb-6">Start a new learning goal to generate your personalized AI roadmap.</p>
            <button 
              onClick={() => navigate('/generate')}
              className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Start New Goal
            </button>
          </div>
        )}
      </section>

      {/* Your Paths Row */}
      {history.length > 1 && (
        <section className="space-y-6">
          <div className="flex justify-between items-end px-2">
            <h3 className="text-xl font-headline font-bold text-on-surface flex items-center gap-2">
              <span className="w-1 h-6 bg-tertiary rounded-full"></span>
              Your Paths
            </h3>
            <Link to="/paths" className="text-sm font-bold text-primary hover:underline">View All</Link>
          </div>
          
          <div className="flex gap-8 overflow-x-auto py-6 px-2 hide-scrollbar">
            {history.slice(1).map((item, idx) => (
              <div 
                key={item.id}
                onClick={() => navigate(`/paths/${item.id}`, { state: { roadmap: item } })}
                className="flex-none w-72 neomorph-raised rounded-2xl p-4 group cursor-pointer hover:translate-y-[-4px] transition-transform duration-300"
              >
                <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-primary opacity-50">menu_book</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <h4 className="font-bold text-on-surface mb-1 truncate">{item.learningGoal}</h4>
                <div className="flex justify-between items-center text-xs text-on-surface-variant font-medium">
                  <span>{item.steps?.length || 0} Lessons</span>
                  <span className="text-tertiary">Beginner</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended for You */}
      <section className="space-y-6 pb-20 md:pb-10">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-headline font-bold text-on-surface flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            Recommended for You
          </h3>
          <span className="bg-primary-container text-on-primary-fixed px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">AI Generated</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="neomorph-raised p-2 rounded-3xl group cursor-pointer" onClick={() => navigate('/generate')}>
            <div className="relative h-48 rounded-2xl overflow-hidden bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-primary opacity-40 group-hover:scale-110 transition-transform">bolt</span>
              <div className="absolute top-4 right-4 neomorph-raised bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">New</div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-sm text-tertiary">bolt</span>
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">Fast-Track Potential</span>
              </div>
              <h4 className="text-xl font-headline font-bold text-on-surface mb-2">ML in Fintech</h4>
              <p className="text-sm text-on-surface-variant line-clamp-2">Based on your interest in Data Science and Neural Architectures.</p>
            </div>
          </div>
          
          <div className="neomorph-raised p-2 rounded-3xl group cursor-pointer" onClick={() => navigate('/generate')}>
            <div className="relative h-48 rounded-2xl overflow-hidden bg-tertiary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-tertiary opacity-40 group-hover:scale-110 transition-transform">trending_up</span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-sm text-primary">trending_up</span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Trending Skill</span>
              </div>
              <h4 className="text-xl font-headline font-bold text-on-surface mb-2">Micro-Services with Go</h4>
              <p className="text-sm text-on-surface-variant line-clamp-2">Expand your backend capabilities with highly efficient concurrent programming.</p>
            </div>
          </div>
          
          <div className="neomorph-raised p-2 rounded-3xl group cursor-pointer" onClick={() => navigate('/generate')}>
            <div className="relative h-48 rounded-2xl overflow-hidden bg-indigo-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-indigo-500 opacity-40 group-hover:scale-110 transition-transform">star</span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-sm text-tertiary">star</span>
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">Recommended Mentor</span>
              </div>
              <h4 className="text-xl font-headline font-bold text-on-surface mb-2">Visual Storytelling</h4>
              <p className="text-sm text-on-surface-variant line-clamp-2">Unlock the power of narrative in digital product design with Sarah Chen.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
