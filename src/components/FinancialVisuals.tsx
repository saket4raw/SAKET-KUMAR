import React from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';
import { TrendingUp, DollarSign, Activity, BarChart } from 'lucide-react';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1100 },
];

export const FinancialVisuals: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {[
        { label: 'Portfolio Growth', value: '+24.8%', icon: TrendingUp, color: 'text-neon-blue' },
        { label: 'Assets Managed', value: '₹12.5M', icon: DollarSign, color: 'text-neon-purple' },
        { label: 'Risk Score', value: 'Low', icon: Activity, color: 'text-neon-green' },
        { label: 'KPI Accuracy', value: '99.2%', icon: BarChart, color: 'text-white' },
      ].map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass p-6 rounded-2xl border border-white/5 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div className="h-8 w-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="currentColor" 
                    fill="transparent" 
                    className={stat.color}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <p className="text-xs font-mono text-white/40 uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
