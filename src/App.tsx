import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Anchor } from 'lucide-react';

import OceanBackground from './components/OceanBackground';
import Navigation from './components/Navigation';
import CustomCursor from './components/Cursor';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Planner from './components/Planner';
import Shop from './components/Shop';
import Blog from './components/Blog';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer to update active section on scroll
  useEffect(() => {
    if (loading) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-[#000b1e] text-white overflow-x-hidden font-sans selection:bg-[#00f0ff]/30">
      <CustomCursor />
      
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] bg-gradient-to-b from-[#00f0ff] to-[#000b1e] flex flex-col items-center justify-center overflow-hidden"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative mb-8"
            >
              <Anchor className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/50 blur-sm rounded-full" />
            </motion.div>
            
            <div className="text-4xl font-bold text-white mb-4 tracking-widest font-heading drop-shadow-lg">
              SUBMERGING
            </div>
            
            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden relative border border-white/30">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#39ff14] shadow-[0_0_15px_rgba(57,255,20,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 text-white/80 font-mono text-sm">{progress}% Depth Reached</div>
          </motion.div>
        )}
      </AnimatePresence>

      <OceanBackground />

      {/* Liquid Glass Overlay for the entire background */}
      <div className="fixed inset-0 pointer-events-none z-0 backdrop-filter backdrop-blur-[4px] saturate-150 bg-gradient-to-b from-transparent to-[#000b1e]/50" />

      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="relative z-10 w-full flex flex-col">
        <section id="home" className="min-h-screen relative">
          <Home setActiveSection={setActiveSection} />
        </section>
        
        <section id="gallery" className="min-h-screen relative liquid-glass-panel my-20 mx-4 md:mx-12 rounded-3xl">
          <Gallery />
        </section>
        
        <section id="services" className="min-h-screen relative liquid-glass-panel my-20 mx-4 md:mx-12 rounded-3xl">
          <Planner />
        </section>
        
        <section id="stock" className="min-h-screen relative liquid-glass-panel my-20 mx-4 md:mx-12 rounded-3xl">
          <Shop />
        </section>
        
        <section id="contact" className="min-h-screen relative liquid-glass-panel my-20 mx-4 md:mx-12 rounded-3xl">
          <Blog />
        </section>
        
        <Footer />
      </main>
    </div>
  );
}
