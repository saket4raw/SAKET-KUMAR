import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SplashScreen } from './components/SplashScreen';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar, ContactSection } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsDashboard } from './components/SkillsDashboard';
import { FinancialVisuals } from './components/FinancialVisuals';
import { EducationSection } from './components/EducationSection';

export default function App() {
  const [loading, setLoading] = useState(true);
  const scrollProgress = useScrollProgress();

  return (
    <div className="relative min-h-screen font-sans">
      <AnimatePresence>
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AnimatedBackground />
          <Navbar />
          
          <main>
            <Hero />
            
            <div className="max-w-7xl mx-auto px-6">
              <FinancialVisuals />
            </div>

            <ExperienceTimeline />
            <SkillsDashboard />
            <EducationSection />
            <ContactSection />
          </main>

          <footer className="py-12 px-6 border-t border-white/5 text-center">
            <div className="max-w-7xl mx-auto">
              <p className="text-white/20 text-xs font-mono uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Saket Kumar. Built with Precision & Analytics.
              </p>
            </div>
          </footer>

          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-neon-blue z-[60] origin-left"
            style={{ scaleX: scrollProgress }}
          />
        </motion.div>
      )}
    </div>
  );
}

// Custom hook for scroll progress
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress(currentScroll / scrollHeight);
      }
    };

    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return progress;
}
