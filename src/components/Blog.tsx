import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

const posts = [
  { id: 1, title: 'The Art of Aquascaping', excerpt: 'Learn the fundamental principles of creating a balanced, natural-looking underwater landscape.', date: 'Oct 12, 2023', author: 'Dr. Marina Reef', image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Maintaining Optimal pH Levels', excerpt: 'A deep dive into water chemistry and why stability is more important than chasing the perfect number.', date: 'Nov 05, 2023', author: 'Oceanic Labs', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Rare Corals of the Indo-Pacific', excerpt: 'Discovering the vibrant, elusive species that are transforming modern reef keeping.', date: 'Dec 20, 2023', author: 'Coral Conservation Society', image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=800' },
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-8 max-w-7xl mx-auto relative z-10">
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-4">
          The Deep Dive
        </h1>
        <p className="text-xl text-cyan-100/80 max-w-2xl mx-auto">
          Insights, guides, and stories from the depths of the marine keeping world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="group bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-black/50 transition-colors flex flex-col"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-cyan-300 text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                Read Article
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-4 text-white/50 text-sm mb-4">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.date}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-slate-300 leading-relaxed mb-8 flex-1">
                {post.excerpt}
              </p>
              
              <button className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors mt-auto w-fit">
                Dive In <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
