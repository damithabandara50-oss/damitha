import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info } from 'lucide-react';

const species = [
  {
    id: 'lionfish',
    name: 'Volitan Lionfish',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000',
    ph: '8.1 - 8.4',
    temp: '24-28°C',
    temperament: 'Semi-aggressive',
    tankSize: '120 Gallons',
    description: 'A venomous marine fish characterized by red, white, and black bands, showy pectoral fins, and spiky fin rays.',
  },
  {
    id: 'clownfish',
    name: 'Ocellaris Clownfish',
    image: 'https://images.unsplash.com/photo-1534043464124-3be32fe000cb?auto=format&fit=crop&q=80&w=1000',
    ph: '8.1 - 8.4',
    temp: '23-28°C',
    temperament: 'Peaceful',
    tankSize: '20 Gallons',
    description: 'A popular aquarium fish known for its symbiotic relationship with sea anemones and bright orange coloration.',
  },
  {
    id: 'mandarin',
    name: 'Green Mandarin',
    image: 'https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?auto=format&fit=crop&q=80&w=1000',
    ph: '8.1 - 8.4',
    temp: '24-26°C',
    temperament: 'Peaceful',
    tankSize: '30 Gallons',
    description: 'A small, brightly colored member of the dragonet family, popular in the saltwater aquarium trade.',
  },
];

export default function Gallery() {
  const [selectedSpecies, setSelectedSpecies] = useState<typeof species[0] | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-32 px-8 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-4">
          The Hatchery
        </h1>
        <p className="text-xl text-cyan-100/80 max-w-2xl mx-auto">
          Explore our curated collection of rare and exotic marine life.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {species.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={() => setSelectedSpecies(item)}
            className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-[4/5] bg-black/20 backdrop-blur-sm border border-white/10"
          >
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
              <div className="flex items-center text-cyan-300 text-sm font-medium">
                <Info className="w-4 h-4 mr-2" />
                View 3D Specs
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedSpecies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
              onClick={() => setSelectedSpecies(null)}
            />
            
            <motion.div
              layoutId={`card-${selectedSpecies.id}`}
              className="relative w-full max-w-5xl bg-gradient-to-br from-slate-900/90 to-blue-900/90 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedSpecies(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* 3D Viewer Simulation Area */}
              <div className="w-full md:w-3/5 relative aspect-square md:aspect-auto bg-black/40 flex items-center justify-center overflow-hidden group">
                <motion.img
                  src={selectedSpecies.image}
                  alt={selectedSpecies.name}
                  className="w-full h-full object-cover opacity-80 mix-blend-screen"
                  animate={{
                    rotateY: [0, 10, -10, 0],
                    rotateX: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm text-cyan-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Interactive 3D Model Active
                </div>
              </div>

              {/* Data Overlay */}
              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-white mb-6">{selectedSpecies.name}</h2>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  {selectedSpecies.description}
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-cyan-400 text-xs uppercase tracking-wider mb-1 font-semibold">pH Level</div>
                    <div className="text-xl text-white font-mono">{selectedSpecies.ph}</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-cyan-400 text-xs uppercase tracking-wider mb-1 font-semibold">Temperature</div>
                    <div className="text-xl text-white font-mono">{selectedSpecies.temp}</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-cyan-400 text-xs uppercase tracking-wider mb-1 font-semibold">Temperament</div>
                    <div className="text-xl text-white font-mono">{selectedSpecies.temperament}</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-cyan-400 text-xs uppercase tracking-wider mb-1 font-semibold">Tank Size</div>
                    <div className="text-xl text-white font-mono">{selectedSpecies.tankSize}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
