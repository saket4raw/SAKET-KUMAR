import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, ExternalLink, BookOpen } from 'lucide-react';
import { profileData } from '../data';

export const EducationSection: React.FC = () => {
  const { education, certifications, projects } = profileData;

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-mono text-neon-blue uppercase tracking-[0.3em] mb-4">Academic Background</h2>
            <h3 className="text-4xl font-display font-bold mb-12">Education</h3>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-8 border-l border-white/10">
                  <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-white/20" />
                  <div className="mb-1 text-neon-blue font-mono text-xs">{edu.year}</div>
                  <h4 className="text-xl font-display font-bold text-white">{edu.degree}</h4>
                  <p className="text-white/60 text-sm mb-2">{edu.institution}</p>
                  {edu.specialization && (
                    <span className="inline-block px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-wider">
                      {edu.specialization}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications & Projects */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-mono text-neon-blue uppercase tracking-[0.3em] mb-4">Validation & Projects</h2>
            <h3 className="text-4xl font-display font-bold mb-12">Certifications</h3>

            <div className="grid grid-cols-1 gap-4 mb-16">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="glass p-4 rounded-2xl flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors">
                    <Award size={20} className="text-neon-blue" />
                  </div>
                  <span className="text-sm text-white/80 font-medium">{cert}</span>
                </motion.div>
              ))}
            </div>

            {/* Academic Project */}
            <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <BookOpen size={24} className="text-neon-blue" />
              Academic Project
            </h3>
            {projects.map((project, index) => (
              <div key={index} className="glass p-6 rounded-2xl border-l-4 border-l-neon-blue">
                <h4 className="text-lg font-display font-bold mb-3">{project.name}</h4>
                <p className="text-sm text-white/60 leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] font-mono text-neon-blue uppercase tracking-wider px-2 py-1 rounded bg-neon-blue/5 border border-neon-blue/10">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
