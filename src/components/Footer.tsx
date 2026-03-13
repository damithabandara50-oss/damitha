import React, { useEffect, useState } from 'react';
import { Heart, Waves } from 'lucide-react';

export default function Footer() {
  const [coralRestored, setCoralRestored] = useState(14582);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoralRestored(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative z-20 bg-black/80 backdrop-blur-xl border-t border-white/10 pt-16 pb-32 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center gap-2">
            <Waves className="w-6 h-6 text-cyan-400" />
            The Living Reef
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            A digital ecosystem dedicated to premium aquascaping, rare marine life, and ocean conservation.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">The Hatchery</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Marine Tech</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Aquascape Design</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">The Deep Dive</a></li>
          </ul>
        </div>

        <div className="space-y-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 p-6 rounded-2xl border border-cyan-500/20">
          <h4 className="text-lg font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 animate-pulse" />
            Marine Conservation
          </h4>
          <p className="text-slate-300 text-sm">
            A portion of every purchase goes directly to coral reef restoration projects worldwide.
          </p>
          <div className="pt-4">
            <div className="text-3xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
              {coralRestored.toLocaleString()}
            </div>
            <div className="text-xs text-cyan-400 uppercase tracking-widest mt-1">
              Corals Restored (Simulated)
            </div>
          </div>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-slate-500 text-xs">
        &copy; {new Date().getFullYear()} The Living Reef. All rights reserved.
      </div>
    </footer>
  );
}
