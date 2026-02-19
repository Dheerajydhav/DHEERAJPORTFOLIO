import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Mail, MessageCircle, FileText, 
  ChevronRight, ArrowUpRight, Film, Cpu, Zap, Monitor, Compass, MapPin, Download, Play
} from 'lucide-react';
import { PROJECTS, HIGHLIGHTS, SERVICES } from './data';
import { Project } from './types';

const RESUME_LINK = "https://drive.google.com/file/d/147evtKYh90pDQuHeGWVwGcIU-n6-Te1_/view?usp=sharing";
const RESUME_EMBED = "https://drive.google.com/file/d/147evtKYh90pDQuHeGWVwGcIU-n6-Te1_/preview";
const PROFILE_IMAGE = "https://lh3.googleusercontent.com/d/1mwrzo0RRK1nqIp1-R0wVFHBZ9pyUc4S3";
const HERO_BG_IMAGE = "https://photos.fife.usercontent.com/pw/AP1GczONX91QH4qH4ifrYx0MCdiRzbKGE_uf8bmqYnauUjBNCc0V1eDwIXa7Og=w1699-h948-s-no-gm?authuser=0";

// --- Components ---

const VideoModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [project, onClose]);

  const isVertical = project?.id === 'sony-bravia';
  const aspectClass = isVertical ? 'aspect-[9/16]' : 'aspect-video';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] w-screen h-screen bg-black/70 backdrop-blur-[16px] flex items-center justify-center overflow-hidden"
          onClick={onClose}
        >
          <button 
            onClick={onClose}
            className="fixed top-6 right-6 md:top-8 md:right-8 z-[220] text-white/40 hover:text-white transition-all duration-300 transform hover:scale-110 p-2"
            aria-label="Close player"
          >
            <X size={44} strokeWidth={1} />
          </button>

          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 w-auto h-auto max-w-[90vw] max-h-[90vh] ${aspectClass} shadow-[0_0_100px_rgba(0,0,0,0.8)]`}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              src={project.videoEmbed} 
              allow="autoplay; fullscreen" 
              allowFullScreen 
              width="100%" 
              height="100%" 
              title={project.title}
              className="w-full h-full block bg-transparent"
              style={{ border: 'none' }}
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ResumeOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
        >
          <div className="w-full h-20 px-6 flex justify-between items-center border-b border-zinc-800 bg-black/50">
            <div className="flex items-center gap-3">
              <FileText className="text-orange-600" size={24} />
              <span className="text-sm font-black uppercase tracking-[0.2em]">Curriculum Vitae</span>
            </div>
            <div className="flex items-center gap-6">
              <a 
                href={RESUME_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors"
              >
                <Download size={14} /> Download PDF
              </a>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white hover:bg-orange-600 hover:border-orange-600 transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8">
            <div className="w-full h-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-orange-600/5 relative">
              <iframe 
                src={RESUME_EMBED} 
                className="w-full h-full" 
                allow="autoplay"
                title="Dheeraj Dharan Resume"
              ></iframe>
            </div>
          </div>
          <div className="h-16 flex items-center justify-center text-[10px] text-zinc-600 font-black uppercase tracking-widest bg-black/50 border-t border-zinc-900">
            Dheeraj Dharan • Senior Motion Designer • Dubai
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar: React.FC<{ onOpenResume: () => void }> = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const menuItems = [
    { name: 'Work', id: 'work' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => scrollToSection('home')} 
          className="text-xl font-bold tracking-tighter flex items-center gap-2 outline-none group"
        >
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors">
            <span className="text-white text-xs">DD</span>
          </div>
          <span className="hidden sm:inline-block uppercase tracking-widest text-sm">DHEERAJ DHARAN</span>
        </button>

        <div className="hidden md:flex gap-8 items-center">
          {menuItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)} 
              className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors outline-none"
            >
              {item.name}
            </button>
          ))}
          <button onClick={onOpenResume} className="px-5 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all">RESUME</button>
        </div>

        <button className="md:hidden p-2 text-zinc-400" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-zinc-900 p-6 md:hidden flex flex-col gap-4"
          >
            {menuItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)} 
                className="text-left text-lg font-bold uppercase tracking-tighter text-zinc-400 hover:text-white transition-colors"
              >
                {item.name}
              </button>
            ))}
            <button onClick={() => { setIsOpen(false); onOpenResume(); }} className="mt-2 w-full py-4 bg-orange-600 rounded-xl text-xs font-black uppercase tracking-widest text-white">OPEN RESUME</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero: React.FC<{ onOpenResume: () => void }> = ({ onOpenResume }) => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${HERO_BG_IMAGE}')` }} />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="max-w-7xl mx-auto w-full relative z-[2]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-orange-600/30 bg-orange-600/10 text-orange-500 text-[10px] font-black tracking-widest mb-8 uppercase">
            <MapPin size={10} strokeWidth={3} />
            <span>Dubai</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-bold leading-[0.85] tracking-tighter mb-10 text-white drop-shadow-lg">
            AI Motion Graphics <br />
            <span className="text-zinc-300">Designer</span> & Visual <br />
            <span className="text-orange-600">Storyteller</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light drop-shadow">Senior Motion Graphics Designer with 7+ years of experience blending cinematic motion design with Generative AI to create high-impact commercials, event visuals, and brand stories.</p>
            <div className="flex flex-col gap-8">
              <p className="text-sm text-zinc-400 leading-relaxed italic px-6 bg-black/20 backdrop-blur-sm py-4 rounded-2xl">"I merge traditional animation principles with cutting-edge AI workflows to deliver faster, smarter, and more powerful visual narratives for brands and live experiences."</p>
              <div>
                <button onClick={onOpenResume} className="group relative inline-flex items-center gap-4 px-10 py-5 bg-orange-600 rounded-full text-white font-black tracking-widest text-xs transition-all hover:pr-12 overflow-hidden shadow-2xl">
                  <span className="relative z-10">VIEW RESUME</span>
                  <FileText className="relative z-10 group-hover:translate-x-1 transition-transform" size={18} />
                  <div className="absolute inset-0 bg-orange-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedWork: React.FC<{ onProjectClick: (p: Project) => void }> = ({ onProjectClick }) => {
  return (
    <section id="work" className="py-32 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <span className="text-orange-600 font-black tracking-widest text-[10px] uppercase block mb-4">Portfolio</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Selected Work</h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed">Explore a curated selection of motion projects where cinematic design meets algorithmic intelligence.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onProjectClick(project)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-zinc-900 mb-8 border border-zinc-800/50 shadow-lg group-hover:shadow-orange-600/10 transition-all duration-500">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/seed/${project.id}/800/600`;
                  }}
                />
                {project.videoEmbed && (
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play size={24} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                )}
                {!project.videoEmbed && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                      <ArrowUpRight size={24} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors">{project.title}</h3>
              <p className="text-zinc-500 text-sm font-medium tracking-wide uppercase">{project.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      <div className="blur-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]" style={{ background: 'rgba(255,255,255,0.01)' }}></div>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative group">
            <div className="aspect-[4/5] rounded-[48px] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
              <img src={PROFILE_IMAGE} alt="Dheeraj Dharan portrait" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-orange-600 rounded-[40px] p-8 flex flex-col justify-end shadow-2xl rotate-6 group-hover:rotate-0 transition-all duration-500">
              <span className="text-5xl font-bold mb-1">7+</span>
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Years Expertise</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10">About Me</h2>
            <div className="space-y-8 text-zinc-400 text-xl font-light leading-relaxed">
              <p>I’m <span className="text-white font-bold">Dheeraj Dharan</span>, a Senior Motion Graphics Designer and AI Visual Storyteller based in <span className="text-white font-bold">Dubai</span>.</p>
              <p>With over 7 years of professional experience, I specialize in creating visually striking motion graphics, commercials, and immersive event visuals by merging traditional animation techniques with Generative AI workflows.</p>
              <p>I’ve led motion initiatives at premier advertising agencies and collaborated with major media houses, delivering work that has reached millions of viewers globally—including a viral <span className="text-orange-500 font-bold">20M+ view</span> campaign for Sony Bravia.</p>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-6">
              {HIGHLIGHTS.map((h) => (
                <div key={h.id} className="p-6 bg-zinc-900/40 rounded-3xl border border-zinc-800/50 hover:border-orange-600/30 transition-colors">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{h.stat}</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest leading-tight">{h.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return <Film className="text-orange-500" size={36} />;
      case 'Cpu': return <Cpu className="text-orange-500" size={36} />;
      case 'Zap': return <Zap className="text-orange-500" size={36} />;
      case 'Monitor': return <Monitor className="text-orange-500" size={36} />;
      case 'Compass': return <Compass className="text-orange-500" size={36} />;
      default: return <Film className="text-orange-500" size={36} />;
    }
  };

  return (
    <section id="services" className="py-32 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">What I Do</h2>
          <p className="text-zinc-500 text-xl font-light">Transforming ideas into cinematic motion reality using modern toolsets.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <div key={s.id} className="p-12 rounded-[40px] bg-zinc-900 border border-zinc-800 hover:border-orange-600/40 transition-all group">
              <div className="mb-10 p-5 bg-black w-fit rounded-3xl group-hover:scale-110 transition-transform">{getIcon(s.icon)}</div>
              <h3 className="text-3xl font-bold mb-6">{s.title}</h3>
              <p className="text-zinc-500 text-base font-light leading-relaxed">{s.description}</p>
            </div>
          ))}
          <div className="p-12 rounded-[40px] bg-orange-600 flex flex-col justify-between items-start text-white overflow-hidden relative shadow-2xl">
            <div className="text-3xl font-bold z-10 leading-tight">Have a project <br />in mind?</div>
            <a href="mailto:dheerajkdharan58@gmail.com" className="mt-10 flex items-center gap-3 font-black tracking-widest text-sm z-10 group uppercase">Let's talk <ChevronRight className="group-hover:translate-x-1 transition-transform" /></a>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-orange-700/50 rounded-full blur-[80px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC<{ onOpenResume: () => void }> = ({ onOpenResume }) => {
  return (
    <footer className="py-32 px-6 border-t border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl md:text-8xl lg:text-[120px] font-bold tracking-tighter mb-20 leading-[0.9]">Let’s create visuals <br /><span className="text-zinc-700">people remember.</span></h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-24">
          <a href="mailto:dheerajkdharan58@gmail.com" className="flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-black tracking-widest text-xs hover:bg-orange-600 hover:text-white transition-all shadow-xl"><Mail size={20} /> EMAIL ME</a>
          <a href="https://wa.me/917907262805" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-10 py-5 bg-zinc-900 text-white border border-zinc-800 rounded-full font-black tracking-widest text-xs hover:bg-zinc-800 transition-all"><MessageCircle size={20} /> WHATSAPP</a>
          <button onClick={onOpenResume} className="flex items-center gap-4 px-10 py-5 bg-zinc-900 text-white border border-zinc-800 rounded-full font-black tracking-widest text-xs hover:bg-zinc-800 transition-all"><FileText size={20} /> VIEW RESUME</button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-16 border-t border-zinc-900">
          <div className="flex items-center gap-3 text-zinc-500 font-medium text-sm"><MapPin size={18} className="text-orange-600" /><span>Dubai, United Arab Emirates</span></div>
          <div className="flex gap-10 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
            <a href="https://www.linkedin.com/in/dheerajdharan/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">LinkedIn</a>
            <span className="text-zinc-700">Behance</span>
            <span className="text-zinc-700">Instagram</span>
          </div>
          <div className="text-zinc-700 text-[10px] font-black uppercase tracking-widest">© {new Date().getFullYear()} Dheeraj Dharan</div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="selection:bg-orange-600 selection:text-white antialiased">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />
      <Hero onOpenResume={() => setIsResumeOpen(true)} />
      <FeaturedWork onProjectClick={(p) => setSelectedProject(p)} />
      <AboutSection />
      <ServicesSection />
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ResumeOverlay isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[15%] right-[-10%] w-[60%] h-[60%] bg-orange-600/5 blur-[160px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[5%] left-[-15%] w-[50%] h-[50%] bg-white/2 blur-[140px] rounded-full"></div>
      </div>
    </div>
  );
};

export default App;