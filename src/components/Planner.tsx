import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Waves, Move } from 'lucide-react';

const items = [
  { id: 'rock1', type: 'rock', name: 'Dragon Stone', color: 'bg-stone-600', w: 120, h: 80 },
  { id: 'wood1', type: 'wood', name: 'Spider Wood', color: 'bg-amber-800', w: 150, h: 100 },
  { id: 'plant1', type: 'plant', name: 'Anubias', color: 'bg-emerald-500', w: 60, h: 90 },
  { id: 'plant2', type: 'plant', name: 'Java Fern', color: 'bg-green-600', w: 80, h: 120 },
];

export default function Planner() {
  const [current, setCurrent] = useState(50); // Water current 0-100
  const [placedItems, setPlacedItems] = useState<{ id: string; item: typeof items[0]; x: number; y: number }[]>([]);

  const handleDragEnd = (event: any, info: any, item: typeof items[0]) => {
    // Basic drop logic
    const dropZone = document.getElementById('tank-canvas');
    if (dropZone) {
      const rect = dropZone.getBoundingClientRect();
      if (
        info.point.x > rect.left &&
        info.point.x < rect.right &&
        info.point.y > rect.top &&
        info.point.y < rect.bottom
      ) {
        setPlacedItems([
          ...placedItems,
          {
            id: `${item.id}-${Date.now()}`,
            item,
            x: info.point.x - rect.left - item.w / 2,
            y: info.point.y - rect.top - item.h / 2,
          },
        ]);
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-8 max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-8">
      {/* Sidebar Tools */}
      <div className="w-full md:w-1/4 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Aquascape Planner</h2>
          <p className="text-sm text-cyan-200/70">Drag items into the tank to design your layout.</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Waves className="w-4 h-4" /> Water Current
          </h3>
          <input
            type="range"
            min="0"
            max="100"
            value={current}
            onChange={(e) => setCurrent(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-white/10 rounded-full h-2 appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-white/50">
            <span>Calm</span>
            <span>Strong</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Inventory</h3>
          <div className="grid grid-cols-2 gap-3">
            {items.map((item) => (
              <motion.div
                key={item.id}
                drag
                dragSnapToOrigin
                onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                whileDrag={{ scale: 1.1, zIndex: 50 }}
                className="relative cursor-grab active:cursor-grabbing aspect-square bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center p-2 hover:bg-white/10 transition-colors group"
              >
                <div
                  className={`${item.color} rounded-lg shadow-inner`}
                  style={{ width: item.w / 3, height: item.h / 3 }}
                />
                <span className="text-[10px] text-center mt-2 text-white/70 group-hover:text-white">
                  {item.name}
                </span>
                <Move className="absolute top-2 right-2 w-3 h-3 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tank Canvas */}
      <div className="w-full md:w-3/4 bg-gradient-to-b from-cyan-900/20 to-blue-900/40 backdrop-blur-sm border-2 border-white/20 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col">
        <div className="absolute top-0 left-0 w-full h-4 bg-cyan-400/20 blur-sm" />
        
        <div id="tank-canvas" className="flex-1 relative w-full h-full p-8">
          {placedItems.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-white/20 text-2xl font-light pointer-events-none">
              Drop items here
            </div>
          )}

          {placedItems.map((placed) => (
            <motion.div
              key={placed.id}
              drag
              dragMomentum={false}
              initial={{ x: placed.x, y: placed.y, scale: 0 }}
              animate={{ scale: 1 }}
              className={`absolute cursor-grab active:cursor-grabbing ${placed.item.color} rounded-2xl shadow-xl border border-white/10`}
              style={{
                width: placed.item.w,
                height: placed.item.h,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {placed.item.type === 'plant' && (
                <motion.div
                  className="w-full h-full origin-bottom"
                  animate={{
                    rotate: [0, current * 0.1, -current * 0.05, 0],
                    skewX: [0, current * 0.05, -current * 0.02, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Substrate / Sand */}
        <div className="h-24 w-full bg-gradient-to-t from-stone-800 to-stone-700/80 border-t border-white/10 relative z-10">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
        </div>
      </div>
    </div>
  );
}
