import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, Code2, Database, Layout, PieChart } from 'lucide-react';
import { profileData } from '../data';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export const SkillsDashboard: React.FC = () => {
  const { skills } = profileData;

  const radarData = skills.technical.map(s => ({
    subject: s.name,
    A: s.level,
    fullMark: 100,
  }));

  return (
    <section id="skills" className="py-24 px-6 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-mono text-neon-blue uppercase tracking-[0.3em] mb-4">Analytical Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold">Skills Dashboard</h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Technical Skills Radar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-1 glass p-8 rounded-3xl flex flex-col items-center justify-center min-h-[400px]"
          >
            <h4 className="text-lg font-display font-bold mb-8 flex items-center gap-2">
              <PieChart size={20} className="text-neon-blue" />
              Technical Proficiency
            </h4>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Skill Level"
                    dataKey="A"
                    stroke="#00f2ff"
                    fill="#00f2ff"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Skill Bars & Functional Skills */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl"
            >
              <h4 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
                <BarChart3 size={20} className="text-neon-blue" />
                Core Competencies
              </h4>
              <div className="space-y-6">
                {skills.technical.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/80 font-medium">{skill.name}</span>
                      <span className="text-neon-blue font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass p-8 rounded-3xl"
            >
              <h4 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
                <Layout size={20} className="text-neon-blue" />
                Functional Expertise
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {skills.functional.map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-neon-blue/30 transition-all"
                  >
                    <div className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_8px_rgba(0,242,255,0.5)]" />
                    <span className="text-sm text-white/70">{skill}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 p-4 rounded-2xl bg-neon-blue/5 border border-neon-blue/10">
                <div className="flex items-center gap-2 text-neon-blue text-xs font-mono uppercase tracking-wider mb-2">
                  <Database size={14} />
                  Data Stack
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  Leveraging modern tools to transform raw financial data into actionable business intelligence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
