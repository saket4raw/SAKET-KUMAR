import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Linkedin, Mail, Phone } from 'lucide-react';
import { profileData } from '../data';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-display font-bold tracking-tighter"
        >
          SK<span className="text-neon-blue">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 p-1 glass rounded-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-5 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href={profileData.basics.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full glass hover:text-neon-blue transition-colors">
            <Linkedin size={18} />
          </a>
          <a href={`mailto:${profileData.basics.email}`} className="px-6 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-neon-blue hover:text-white transition-colors">
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 glass rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-darker border-t border-white/5 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-display font-medium text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/5" />
              <div className="flex items-center gap-4">
                <a href={profileData.basics.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-full glass">
                  <Linkedin size={20} />
                </a>
                <a href={`mailto:${profileData.basics.email}`} className="flex-1 py-3 rounded-xl bg-white text-black text-center font-bold">
                  Contact Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const ContactSection: React.FC = () => {
  const { basics, extra, languages } = profileData;

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="glass p-8 md:p-16 rounded-[3rem] relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/10 blur-[100px] rounded-full -mr-48 -mt-48" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-sm font-mono text-neon-blue uppercase tracking-[0.3em] mb-4">Get In Touch</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">
                Let's Build Something <span className="text-neon-blue">Impactful.</span>
              </h3>
              <p className="text-white/60 text-lg mb-12 max-w-md">
                Currently open to roles in Financial Analytics, Business Intelligence, and Risk Analysis.
              </p>

              <div className="space-y-6">
                <a href={`mailto:${basics.email}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors">
                    <Mail size={24} className="text-neon-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Email</p>
                    <p className="text-lg font-medium">{basics.email}</p>
                  </div>
                </a>
                <a href={`tel:${basics.phone}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors">
                    <Phone size={24} className="text-neon-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Phone</p>
                    <p className="text-lg font-medium">{basics.phone}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass-darker p-8 rounded-3xl">
              <h4 className="text-xl font-display font-bold mb-8">Additional Information</h4>
              <div className="space-y-6">
                {extra.map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-white/40 text-sm">{item.label}</span>
                    <span className="text-white/80 font-medium">{item.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-white/40 text-sm">Languages</span>
                  <div className="flex gap-2">
                    {languages.map((l, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10">{l}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-xs font-mono text-white/20 uppercase tracking-[0.2em] mb-4">Connect on Social</p>
                <div className="flex gap-4">
                  <a href={basics.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-neon-blue/20 transition-all text-sm">
                    <Linkedin size={16} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
