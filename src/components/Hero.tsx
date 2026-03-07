import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Linkedin, Mail, MapPin } from 'lucide-react';
import { profileData } from '../data';

export const Hero: React.FC = () => {
  const { basics } = profileData;

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="px-4 py-1 rounded-full border border-neon-blue/30 bg-neon-blue/5 text-neon-blue text-xs font-mono uppercase tracking-widest mb-6"
          >
            Available for Opportunities
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-4 text-gradient">
            {basics.name}
          </h1>
          
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-xl md:text-2xl font-light text-white/80 mb-2">
              {basics.label}
            </h2>
            <p className="text-neon-blue font-mono text-sm uppercase tracking-wider">
              {basics.subLabel}
            </p>
          </div>

          <p className="max-w-2xl text-white/60 text-lg leading-relaxed mb-10">
            {basics.summary}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-white/40 text-sm bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <MapPin size={14} className="text-neon-blue" />
              {basics.location}
            </div>
            <a href={`mailto:${basics.email}`} className="flex items-center gap-2 text-white/40 text-sm bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:border-neon-blue/30 hover:text-white transition-colors">
              <Mail size={14} className="text-neon-blue" />
              {basics.email}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.a
              href="#experience"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full flex items-center gap-2 hover:bg-neon-blue hover:text-white transition-colors"
            >
              View Experience <ArrowRight size={18} />
            </motion.a>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 text-white border border-white/10 font-semibold rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              Download Resume <Download size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-blue to-transparent" />
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] vertical-text">Scroll</span>
      </motion.div>
    </section>
  );
};
