import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'Aquarium Gallery', id: 'gallery' },
  { name: 'Maintenance Services', id: 'services' },
  { name: 'Tropical Fish Stock', id: 'stock' },
  { name: 'Contact Us', id: 'contact' },
];

export default function Navigation({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (id: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 liquid-glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold font-heading tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
          FASHION SHOP
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-cyan-300' : 'text-white/70 hover:text-cyan-100'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-2 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full liquid-glass border-t border-cyan-500/20 flex flex-col py-4"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
              className={`py-3 px-6 text-left font-semibold ${
                activeSection === item.id ? 'text-cyan-300 bg-cyan-900/20' : 'text-white/80'
              }`}
            >
              {item.name}
            </button>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
