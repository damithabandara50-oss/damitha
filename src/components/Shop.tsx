import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ShoppingCart } from 'lucide-react';

const products = [
  { id: 1, name: 'Premium Live Rock', price: 89.99, category: 'Saltwater', stock: true, image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=500' },
  { id: 2, name: 'Neon Tetra School (x10)', price: 24.99, category: 'Freshwater', stock: true, image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=500' },
  { id: 3, name: 'Cleaner Shrimp', price: 34.99, category: 'Invertebrates', stock: false, image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=500' },
  { id: 4, name: 'Hammer Coral Frag', price: 120.00, category: 'Coral Reef Safe', stock: true, image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=500' },
  { id: 5, name: 'Discus Fish Pair', price: 150.00, category: 'Freshwater', stock: true, image: 'https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?auto=format&fit=crop&q=80&w=500' },
  { id: 6, name: 'Clownfish Pair', price: 65.00, category: 'Saltwater', stock: false, image: 'https://images.unsplash.com/photo-1534043464124-3be32fe000cb?auto=format&fit=crop&q=80&w=500' },
];

const categories = ['All', 'Saltwater', 'Freshwater', 'Invertebrates', 'Coral Reef Safe'];

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts = products.filter(
    (p) => activeFilter === 'All' || p.category === activeFilter
  );

  return (
    <div className="min-h-screen pt-24 pb-32 px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-4">
            Marine Tech
          </h1>
          <p className="text-xl text-cyan-100/80 max-w-2xl">
            Premium supplies and livestock for your aquatic ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 overflow-x-auto w-full md:w-auto">
          <Filter className="w-5 h-5 text-cyan-400 ml-2 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === cat
                  ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              key={product.id}
              className="group relative flex flex-col items-center"
            >
              {/* Water Drop Shape Container */}
              <div
                className="relative w-full aspect-[3/4] overflow-hidden bg-white/5 backdrop-blur-sm border border-white/20 shadow-2xl transition-transform duration-500 group-hover:-translate-y-4"
                style={{
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Stock Status */}
                <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      product.stock ? 'bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]' : 'bg-gray-500'
                    }`}
                  />
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                    {product.stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Product Info */}
                <div className="absolute bottom-8 left-0 w-full px-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">{product.name}</h3>
                  <p className="text-cyan-300 font-mono text-lg mb-4">${product.price.toFixed(2)}</p>
                  
                  <button
                    disabled={!product.stock}
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold transition-all ${
                      product.stock
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]'
                        : 'bg-white/10 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {product.stock ? 'Add to Cart' : 'Unavailable'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
