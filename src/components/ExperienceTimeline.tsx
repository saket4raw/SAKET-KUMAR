import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { profileData } from '../data';

export const ExperienceTimeline: React.FC = () => {
  const { experience } = profileData;

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm font-mono text-neon-blue uppercase tracking-[0.3em] mb-4">Professional Journey</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold">Experience</h3>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="mb-16 last:mb-0 pl-8 relative"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-neon-blue shadow-[0_0_10px_rgba(0,242,255,0.8)]" />
              
              <div className="glass p-6 md:p-8 rounded-2xl border border-white/5 hover:border-neon-blue/20 transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h4 className="text-2xl font-display font-bold text-white group-hover:text-neon-blue transition-colors">
                      {exp.role}
                    </h4>
                    <div className="flex items-center gap-2 text-white/60 mt-1">
                      <Briefcase size={14} className="text-neon-blue" />
                      <span className="text-sm font-medium">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/40">
                    <Calendar size={12} />
                    {exp.duration}
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                      <ChevronRight size={14} className="text-neon-blue mt-1 shrink-0" />
                      {resp}
                    </li>
                  ))}
                </ul>

                {/* Impact Badges - Decorative for LIC */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded bg-neon-blue/10 text-neon-blue text-[10px] font-mono uppercase tracking-wider">Financial Planning</span>
                  <span className="px-2 py-1 rounded bg-neon-blue/10 text-neon-blue text-[10px] font-mono uppercase tracking-wider">Risk Assessment</span>
                  <span className="px-2 py-1 rounded bg-neon-blue/10 text-neon-blue text-[10px] font-mono uppercase tracking-wider">Client Analysis</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
