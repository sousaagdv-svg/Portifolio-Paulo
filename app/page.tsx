'use client';

import React, { useState } from "react";
import { Play, X, Camera, Globe, Mail, ExternalLink, Share2, Video, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";

import { EquipmentSection } from "./components/Equipment";

const InstagramIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function PortfolioApp() {
  const [activeModalProject, setActiveModalProject] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // State for Interactive 3D Tool Cards in Profile (Physical Stack with exiting animation state)
  const [toolCards, setToolCards] = useState([
    { id: 1, name: "PREMIERE PRO", role: "VIDEO EDITING", color: "#3B82F6" },
    { id: 2, name: "AFTER EFFECTS", role: "MOTION DESIGN", color: "#8B5CF6" },
    { id: 3, name: "DAVINCI RESOLVE", role: "COLOR GRADING", color: "#10B981" },
    { id: 4, name: "PHOTOSHOP", role: "VISUAL ASSETS", color: "#06B6D4" },
    { id: 5, name: "ILLUSTRATOR", role: "VECTOR DESIGN", color: "#F59E0B" },
    { id: 6, name: "CAPCUT PRO", role: "SOCIAL EDITING", color: "#EC4899" },
  ]);
  const [isStackAnimating, setIsStackAnimating] = useState(false);
  const [exitingCardId, setExitingCardId] = useState<number | null>(null);
  const [exitDirection, setExitDirection] = useState<number>(1); // 1 = right, -1 = left
  const [exitTravel, setExitTravel] = useState(250);

  const handleRotateToolCards = () => {
    if (isStackAnimating) return;
    setIsStackAnimating(true);
    const frontCardId = toolCards[0].id;
    setExitingCardId(frontCardId);

    // Random exit direction (right or left) + random horizontal travel
    setExitDirection(Math.random() > 0.5 ? -1 : 1);
    setExitTravel(230 + Math.random() * 60);

    // Rotate the stack immediately — the exiting card keeps flying out (continuous motion)
    setToolCards(prev => {
      const copy = [...prev];
      const front = copy.shift()!;
      copy.push(front);
      return copy;
    });

    setTimeout(() => {
      setExitingCardId(null);
      setIsStackAnimating(false);
    }, 660);
  };

  const projects = [
    {
      id: "01",
      title: "PROJECT 01",
      category: "COMMERCIAL / 4K",
      thumbnail: "/imagens/Projeto 01.png",
      videoUrl: "/videos/projeto-01.mp4",
      desc: "Cinematic commercial featuring dynamic camera pacing and professional color grading."
    },
    {
      id: "02",
      title: "PROJECT 02",
      category: "MOTION DESIGN",
      thumbnail: "/imagens/Projeto 02.png",
      videoUrl: "/videos/projeto-02.mp4",
      desc: "Atmospheric edit with intense sound design and custom visual effects overlays."
    },
    {
      id: "03",
      title: "PROJECT 03",
      category: "SHORT FORM / TIKTOK",
      thumbnail: "/imagens/Projeto 03.png",
      videoUrl: "/videos/projeto-03.mp4",
      desc: "High-retention vertical edits designed for social media and short form platforms."
    },
    {
      id: "04",
      title: "PROJECT 04",
      category: "DOCUMENTARY",
      thumbnail: "/imagens/Projeto 04.png",
      videoUrl: "/videos/projeto-04.mp4",
      desc: "Raw storytelling capturing authentic human moments and cinematic lighting."
    }
  ];

  // Cinematic scroll-driven motion for Hero
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 600], [0, -25]);
  const titleY = useTransform(scrollY, [0, 600], [0, -12]);

  // Accent palette (black & red cinematic) — dark red glow accents
  const ACCENTS = ['#EF4444', '#B91C1C', '#F87171', '#991B1B', '#EF4444', '#B91C1C'];
  const accentColor = ACCENTS[currentIndex % ACCENTS.length];

  // Carousel 3D / Depth Roles logic
  const getRole = (index: number) => {
    const total = projects.length;
    const diff = (index - currentIndex + total) % total;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === total - 1) return 'left';
    if (diff === 2) return 'back';
    return 'hidden';
  };

  const goToProject = (dir: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + projects.length) % projects.length);
    setTimeout(() => setIsAnimating(false), 650);
  };

  React.useEffect(() => {
    setIsHydrated(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "VIDEO", "BUTTON"].includes(target.tagName)) return;
      if (e.key === "ArrowLeft") goToProject(-1);
      if (e.key === "ArrowRight") goToProject(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#050608] text-[#F2F2F2] cinematic-glow flex flex-col items-center py-10 px-4 md:px-8 overflow-hidden">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/10 blur-[150px] pointer-events-none rounded-full"></div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[1100px] flex flex-col gap-24 relative z-10">

        {/* ========================================== */}
        {/* BLOCK 01 — CAPA / PORTFOLIO (CINEMATIC REVEAL) */}
        {/* ========================================== */}
        <motion.section 
          id="start" 
          initial={{ opacity: 0, clipPath: "inset(12% 12% 12% 12% round 16px)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 16px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full bg-[#080B0F]/90 border border-red-500/20 rounded-2xl p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        >
          {/* Top Logo / Brand */}
          <div className="flex justify-between items-center mb-8">
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="text-xl font-black tracking-widest text-red-500 flex items-center gap-2 cursor-pointer"
            >
              <span className="inline-block w-3 h-3 bg-red-600 rounded-sm animate-pulse"></span>
              PS
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-xs uppercase tracking-widest text-[#8A8F96] font-mono"
            >
              CINEMATIC PORTFOLIO BOOK
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left side: Portrait with cinematic stabilization reveal & depth */}
            <motion.div 
              style={shouldReduceMotion || !isHydrated ? {} : { y: portraitY }}
              initial={{ opacity: 0, scale: 1.04, clipPath: "inset(100% 0 0 0)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0 0)" }}
              transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5 relative flex justify-center group"
            >
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-red-600/20 rounded-tl-3xl rounded-br-full blur-2xl pointer-events-none group-hover:bg-red-600/30 transition duration-500"></div>
              <div className="relative w-full max-w-[320px] aspect-[4/5] overflow-hidden rounded-xl border border-red-500/30 shadow-2xl bg-black">
                <motion.img 
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  src="/imagens/hero.png" 
                  alt="Paulo Silva" 
                  className="w-full h-full object-cover filter contrast-125 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent opacity-60"></div>
              </div>
            </motion.div>

            {/* Right side: Giant Title & Subtitle with staggered line reveal & depth */}
            <motion.div 
              style={shouldReduceMotion || !isHydrated ? {} : { y: titleY }}
              className="md:col-span-7 flex flex-col justify-center overflow-hidden"
            >
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-baseline gap-4 flex-wrap"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase font-mono bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
                  PORTFOLIO
                </h1>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                  className="text-2xl md:text-3xl font-bold text-red-400 font-mono"
                >
                  2025
                </motion.span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
                className="mt-4 inline-block bg-[#111827] border border-red-500/40 px-4 py-1.5 text-xs uppercase tracking-widest text-red-300 w-fit rounded shadow-inner"
              >
                ■ CONTENT CREATOR & VIDEO EDITOR
              </motion.div>

              {/* Minimalist Vertical Navigation with sequential stagger */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.6 }}
                className="mt-10 flex flex-col gap-3 text-sm tracking-widest uppercase text-[#8A8F96]"
              >
                {['start', 'projects', 'contact'].map((item, i) => (
                  <motion.a 
                    key={item}
                    href={`#${item}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + (i * 0.08), duration: 0.4 }}
                    whileHover={{ x: 8, color: "#ffffff" }}
                    className="flex items-center gap-3 group w-fit cursor-pointer"
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full group-hover:scale-150 group-hover:bg-red-500 transition duration-300"></span>
                    <span className="font-mono">{item.toUpperCase()}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* BLOCK 02 — ABOUT ME */}
        {/* ========================================== */}
        <div className="relative w-full">
        <motion.section 
          id="about"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full bg-[#080B0F]/90 border border-[#1e293b]/60 rounded-2xl p-6 md:p-12 shadow-2xl backdrop-blur-xl"
        >
          {/* Top horizontal mini tabs */}
          <div className="flex justify-between items-center mb-10 border-b border-[#1e293b]/50 pb-4">
            <div className="text-xs uppercase tracking-widest text-red-400 font-semibold flex items-center gap-2 font-mono">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              PROFILE
            </div>
            <div className="flex gap-6 text-xs uppercase tracking-widest text-[#8A8F96] font-mono">
              <a href="#projects" className="hover:text-white transition">PROJECT</a>
              <a href="#contact" className="hover:text-white transition">CONTACT PERSON</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Left side: Cinematic Portrait */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-5 relative flex justify-center"
            >
              <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full pointer-events-none"></div>
              <div className="relative w-full max-w-[300px] aspect-[3/4] overflow-hidden rounded-xl border border-red-500/20 shadow-xl bg-black">
                <img 
                  src="/imagens/Imagem da Seção.png" 
                  alt="Paulo Silva Profile" 
                  className="w-full h-full object-cover filter contrast-110 hover:scale-105 transition duration-700"
                />
              </div>
            </motion.div>

            {/* Right side: Bio & Skills */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#8A8F96] mb-1 font-mono">HELLO, I AM</p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 font-mono">PAULO SILVA</h2>
                <h3 className="text-xl font-black uppercase text-red-400 tracking-wider mb-4 font-mono">ABOUT ME</h3>
                <p className="text-sm text-[#8A8F96] leading-relaxed">
                  Hi, I'm Paulo Silva, a video editor focused on visual storytelling, cinematic editing, and digital content. I transform raw footage into high-impact videos with rhythm, identity, and purpose.
                </p>
              </div>

              {/* Software Skills */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-white mb-3 font-semibold font-mono">SOFTWARE SKILLS</h4>
                <div className="flex flex-wrap gap-3">
                  {['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Photoshop', 'Illustrator', 'CapCut Pro'].map((skill, index) => (
                    <motion.div 
                      key={skill}
                      whileHover={{ scale: 1.08, y: -3 }}
                      className="bg-[#111827] border border-red-900/50 px-3.5 py-2 rounded-lg text-xs font-mono text-red-300 flex items-center gap-2 cursor-pointer shadow-md hover:border-red-500 transition"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education & Experience & Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1e293b]/50">
                <div>
                  <h5 className="text-xs uppercase tracking-widest text-white font-semibold mb-1 font-mono">EDUCATION</h5>
                  <p className="text-xs text-[#8A8F96] font-mono">● 2018 - 2022</p>
                  <p className="text-xs text-gray-300 font-semibold">UNIVERSIDADE DE SÃO PAULO</p>
                  <p className="text-xs text-[#8A8F96]">Audiovisual & Cinema</p>
                </div>
                <div>
                  <h5 className="text-xs uppercase tracking-widest text-white font-semibold mb-1 font-mono">EXPERIENCE</h5>
                  <p className="text-xs text-red-400 font-mono">SENIOR VIDEO EDITOR</p>
                  <p className="text-xs text-[#8A8F96]">Commercial & Social Media Campaigns</p>
                  <p className="text-xs text-gray-300 font-semibold">Over 50M+ total views generated</p>
                </div>
              </div>

            </div>
          </div>
        </motion.section>

        {/* Interactive 3D Tool Cards Component - Positioned further left, partially outside the Profile box */}
        {isHydrated && (
          <div className="hidden xl:block absolute -left-28 -bottom-16 z-45">
            <div className="flex flex-col items-start gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-widest text-[#8A8F96] font-mono">TOOL STACK</span>
            </div>
            <div 
              className="relative w-[280px] h-[190px] cursor-pointer select-none group"
              style={{ perspective: "1000px", transform: "rotate(-1.5deg)" }}
              onClick={handleRotateToolCards}
              title="Click to manipulate card stack"
            >
              <div className="absolute inset-0 w-full h-full transform-gpu" style={{ transformStyle: "preserve-3d" }}>
                {toolCards.map((tool, idx) => {
                  const isFront = idx === 0;
                  const isExiting = tool.id === exitingCardId;

                  const exitStyle = { 
                    zIndex: 99, 
                    scale: 1.05, 
                    x: [0, exitDirection * exitTravel * 0.9, exitDirection * exitTravel], 
                    y: [0, -90, -40], 
                    z: 60, 
                    rotateX: exitDirection * 3, 
                    rotateY: exitDirection * 6, 
                    rotateZ: exitDirection * 12, 
                    opacity: 0 
                  };

                  const stackStyles = isExiting
                    ? exitStyle
                    : [
                        { zIndex: 60, scale: 1.0, y: 0, x: 0, z: 50, rotateX: 0, rotateY: 0, rotateZ: -1, opacity: 1 },
                        { zIndex: 50, scale: 0.95, y: 10, x: -15, z: 30, rotateX: -1, rotateY: 2, rotateZ: -6, opacity: 0.9 },
                        { zIndex: 40, scale: 0.90, y: 20, x: 18, z: 10, rotateX: -2, rotateY: 4, rotateZ: 4, opacity: 0.78 },
                        { zIndex: 30, scale: 0.85, y: 30, x: -10, z: -10, rotateX: -3, rotateY: 6, rotateZ: -3, opacity: 0.62 },
                        { zIndex: 20, scale: 0.80, y: 40, x: 22, z: -30, rotateX: -4, rotateY: 8, rotateZ: 7, opacity: 0.45 },
                        { zIndex: 10, scale: 0.75, y: 50, x: -16, z: -50, rotateX: -5, rotateY: 10, rotateZ: -5, opacity: 0.28 },
                      ][idx] || { zIndex: 0, scale: 0.7, y: 60, x: 26, z: -70, rotateX: -6, rotateY: 12, rotateZ: 5, opacity: 0 };

                  return (
                    <motion.div
                      key={tool.id}
                      initial={false}
                      animate={{
                        scale: shouldReduceMotion ? 1 : stackStyles.scale,
                        y: shouldReduceMotion ? 0 : stackStyles.y,
                        x: shouldReduceMotion ? 0 : stackStyles.x,
                        z: shouldReduceMotion ? 0 : stackStyles.z,
                        rotateX: shouldReduceMotion ? 0 : stackStyles.rotateX,
                        rotateY: shouldReduceMotion ? 0 : stackStyles.rotateY,
                        rotateZ: shouldReduceMotion ? 0 : stackStyles.rotateZ,
                        opacity: stackStyles.opacity,
                      }}
                      whileHover={isFront && !isStackAnimating && !shouldReduceMotion ? { scale: 1.03, y: -8, rotateZ: 0 } : {}}
                      whileTap={isFront && !isStackAnimating && !shouldReduceMotion ? { scale: 0.97, y: 2 } : {}}
                      transition={{ duration: isExiting ? 0.6 : 0.65, ease: [0.22, 1, 0.36, 1], delay: isExiting ? 0 : idx * 0.04 }}
                      style={{ 
                        zIndex: stackStyles.zIndex, 
                        transformStyle: "preserve-3d" 
                      }}
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br from-[#141922] via-[#10141A] to-[#0B0E13] border ${isFront && !isExiting ? 'border-red-500/60 shadow-2xl shadow-red-500/10' : 'border-[#1e293b]/70 shadow-lg'} p-5 flex flex-col justify-between transform-gpu origin-bottom-right`}
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono tracking-widest text-[#8A8F96]">TOOL NO. {String(idx + 1).padStart(2, '0')}</span>
                          <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: tool.color }}></span>
                        </div>
                        <h4 className="text-base font-black uppercase tracking-tight text-white font-mono">{tool.name}</h4>
                      </div>
                      <div className="flex justify-between items-end border-t border-[#1e293b]/40 pt-2">
                        <span className="text-xs font-mono uppercase text-red-400 tracking-wider font-semibold">{tool.role}</span>
                        <span className="text-[10px] font-mono text-[#8A8F96] group-hover:text-white transition flex items-center gap-1">
                          {isFront && !isExiting ? "CLICK TO DISPLACE ➔" : `STACK (${idx + 1})`}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Mobile / Tablet fallback stack */}
        <div className="block xl:hidden mt-4 pt-6 border-t border-[#1e293b]/50">
          <div className="flex flex-col gap-2 mb-4">
            <h5 className="text-[11px] uppercase tracking-widest text-[#8A8F96] font-mono">INTERACTIVE TOOL STACK</h5>
            <p className="text-xs text-red-400 font-mono">CLICK CARD TO MANIPULATE STACK</p>
          </div>
          <div 
            className="relative w-[280px] h-[180px] mx-auto cursor-pointer select-none group"
            style={{ perspective: "1000px" }}
            onClick={handleRotateToolCards}
            title="Click to manipulate card stack"
          >
            <div className="absolute inset-0 w-full h-full transform-gpu" style={{ transformStyle: "preserve-3d" }}>
              {toolCards.map((tool, idx) => {
                const isFront = idx === 0;
                const isExiting = tool.id === exitingCardId;

                const exitStyle = { 
                  zIndex: 99, 
                  scale: 1.05, 
                  x: [0, exitDirection * exitTravel * 0.8, exitDirection * exitTravel * 0.85], 
                  y: [0, -85, -38], 
                  z: 60, 
                  rotateX: exitDirection * 3, 
                  rotateY: exitDirection * 6, 
                  rotateZ: exitDirection * 12, 
                  opacity: 0 
                };

                const stackStyles = isExiting
                  ? exitStyle
                  : [
                      { zIndex: 60, scale: 1.0, y: 0, x: 0, z: 50, rotateX: 0, rotateY: 0, rotateZ: -1, opacity: 1 },
                      { zIndex: 50, scale: 0.95, y: 10, x: -12, z: 30, rotateX: -1, rotateY: 2, rotateZ: -5, opacity: 0.88 },
                      { zIndex: 40, scale: 0.90, y: 20, x: 14, z: 10, rotateX: -2, rotateY: 4, rotateZ: 4, opacity: 0.74 },
                      { zIndex: 30, scale: 0.85, y: 30, x: -10, z: -10, rotateX: -3, rotateY: 6, rotateZ: -3, opacity: 0.58 },
                      { zIndex: 20, scale: 0.80, y: 40, x: 16, z: -30, rotateX: -4, rotateY: 8, rotateZ: 6, opacity: 0.42 },
                      { zIndex: 10, scale: 0.75, y: 50, x: -12, z: -50, rotateX: -5, rotateY: 10, rotateZ: -4, opacity: 0.26 },
                    ][idx] || { zIndex: 0, scale: 0.7, y: 60, x: 20, z: -70, rotateX: -6, rotateY: 12, rotateZ: 5, opacity: 0 };

                return (
                  <motion.div
                    key={tool.id}
                    initial={false}
                    animate={{
                      scale: shouldReduceMotion || !isHydrated ? 1 : stackStyles.scale,
                      y: shouldReduceMotion || !isHydrated ? 0 : stackStyles.y,
                      x: shouldReduceMotion || !isHydrated ? 0 : stackStyles.x,
                      z: shouldReduceMotion || !isHydrated ? 0 : stackStyles.z,
                      rotateX: shouldReduceMotion || !isHydrated ? 0 : stackStyles.rotateX,
                      rotateY: shouldReduceMotion || !isHydrated ? 0 : stackStyles.rotateY,
                      rotateZ: shouldReduceMotion || !isHydrated ? 0 : stackStyles.rotateZ,
                      opacity: shouldReduceMotion || !isHydrated ? 1 : stackStyles.opacity,
                    }}
                    whileHover={isFront && !isStackAnimating && !shouldReduceMotion ? { scale: 1.02, y: -6, rotateZ: 0 } : {}}
                    whileTap={isFront && !isStackAnimating && !shouldReduceMotion ? { scale: 0.97, y: 2 } : {}}
                    transition={{ duration: isExiting ? 0.6 : 0.65, ease: [0.22, 1, 0.36, 1], delay: isExiting ? 0 : idx * 0.04 }}
                    style={{ zIndex: stackStyles.zIndex, transformStyle: "preserve-3d" }}
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br from-[#141922] via-[#10141A] to-[#0B0E13] border ${isFront && !isExiting ? 'border-red-500/60 shadow-xl' : 'border-[#1e293b]/70'} p-5 flex flex-col justify-between transform-gpu origin-bottom-right`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-mono tracking-widest text-[#8A8F96]">TOOL NO. {String(idx + 1).padStart(2, '0')}</span>
                        <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: tool.color }}></span>
                      </div>
                      <h4 className="text-base font-black uppercase tracking-tight text-white font-mono">{tool.name}</h4>
                    </div>
                    <div className="flex justify-between items-end border-t border-[#1e293b]/40 pt-2">
                      <span className="text-xs font-mono uppercase text-red-400 tracking-wider font-semibold">{tool.role}</span>
                      <span className="text-[10px] font-mono text-[#8A8F96]">CLICK TO ROTATE</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        </div>

        {/* ========================================== */}
        {/* BLOCK 03 — SHOWCASE / CINEMATIC 3D */}
        {/* ========================================== */}
        <motion.section 
          id="projects"
          className="relative w-full overflow-hidden rounded-2xl border border-red-900/40 bg-[#050609] shadow-[0_0_120px_rgba(80,10,10,0.35)]"
        >
          {/* Cinematic Ambient Background Atmosphere - Enhanced */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Deep base darkness with rich gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#050609] via-[#080B14] to-[#0A0E1A]" />
            
            {/* Cinematic red Ambient Light (top left) - Enhanced */}
            <div className="absolute -top-[15%] -left-[5%] w-[65%] h-[65%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#570D0D]/60 via-[#3B0808]/30 to-transparent blur-[100px]" />

            {/* Cinematic Magenta/Red Ambient Light (bottom right) - Enhanced */}
            <div className="absolute -bottom-[15%] -right-[5%] w-[65%] h-[65%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4A1522]/50 via-[#2A0D14]/25 to-transparent blur-[110px]" />

            {/* Dynamic active accent glow (subtle shifting per project) */}
            <div 
              className="absolute inset-0 transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] opacity-70"
              style={{ background: `radial-gradient(ellipse 75% 55% at 50% 50%, ${accentColor}35 0%, transparent 75%)` }}
            />

            {/* Cinematic Scanlines / Film Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 3px)` }}></div>
          </div>

          {/* Grain overlay */}
          <div 
            className="absolute inset-0 z-[50] pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px 200px" }}
          ></div>

          {/* Top mini tabs */}
          <div className="relative z-10 flex justify-between items-center border-b border-[#1e293b]/50 px-6 md:px-12 pt-6 pb-4">
            <div className="flex gap-6 text-xs uppercase tracking-widest text-[#8A8F96] font-mono">
              <a href="#about" className="hover:text-white transition">PROFILE</a>
            </div>
            <div className="text-xs uppercase tracking-widest text-red-400 font-semibold flex items-center gap-2 font-mono">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              PROJECT
            </div>
            <div className="flex gap-6 text-xs uppercase tracking-widest text-[#8A8F96] font-mono">
              <a href="#contact" className="hover:text-white transition">CONTACT PERSON</a>
            </div>
          </div>

          {/* Header */}
          <div className="relative z-10 flex justify-between items-baseline px-6 md:px-12 pt-8 pb-4">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight font-mono">RECAP PROJECT 2025</h2>
            <span className="text-xs uppercase tracking-widest text-red-400 font-mono bg-red-950/50 px-2.5 py-1 rounded border border-red-800/50">NO. 01</span>
          </div>

          {/* Giant ghost text */}
          <div className="absolute inset-x-0 top-[16%] flex items-center justify-center pointer-events-none select-none z-[2]">
            <span className="font-mono font-black uppercase text-[clamp(70px,24vw,340px)] leading-none text-white/[0.06] tracking-[-0.02em] whitespace-nowrap">PORTFOLIO</span>
          </div>

          {/* Carousel */}
          <div className="relative h-[62vh] md:h-[72vh] z-[30]">
            {projects.map((proj, idx) => {
              const role = getRole(idx);
              if (role === 'hidden') return null;

              const variants = {
                center: { x: "-50%", scale: 1.15, opacity: 1, filter: "blur(0px)", zIndex: 20 },
                left:   { x: "-50%", scale: 0.73, opacity: 0.6, filter: "blur(2px)", zIndex: 10 },
                right:  { x: "-50%", scale: 0.73, opacity: 0.6, filter: "blur(2px)", zIndex: 10 },
                back:   { x: "-50%", scale: 0.52, opacity: 0.35, filter: "blur(4px)", zIndex: 5 },
              };
              const pos = {
                center: { left: "50%", height: "72%", bottom: "15%" },
                left:   { left: "31%", height: "39%", bottom: "24%" },
                right:  { left: "69%", height: "39%", bottom: "24%" },
                back:   { left: "50%", height: "28%", bottom: "29%" },
              }[role];

              return (
                <motion.div
                  key={proj.id}
                  variants={variants}
                  animate={role}
                  transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                  style={{ ...pos, position: "absolute", transformOrigin: "center center", willChange: "transform, filter, opacity", aspectRatio: "0.6/1" }}
                  className="cursor-pointer"
                  onClick={() => role === 'center' && setActiveModalProject(proj)}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-red-500/25 bg-[#111827] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                    <img
                      src={proj.thumbnail}
                      alt={proj.title}
                      draggable={false}
                      className="w-full h-full object-cover object-center brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent"></div>
                    <div className={`absolute inset-x-0 bottom-5 px-5 transition-opacity duration-300 ${role !== 'center' ? 'opacity-0' : 'opacity-100'}`}>
                      <span className="text-[10px] md:text-xs font-mono text-red-400 tracking-widest font-bold">{proj.category}</span>
                      <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight font-mono mt-1">{proj.title}</h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom controls */}
          <div className="relative z-[60] flex flex-wrap items-end justify-between gap-8 px-6 md:px-12 pb-10 mt-4">
            {/* Left: text + nav */}
            <div className="max-w-[340px]">
              <p className="font-mono font-bold uppercase tracking-widest mb-2 text-base md:text-[22px] text-white/95">
                {projects[currentIndex].title} <span className="text-red-400">{projects[currentIndex].id}</span>
              </p>
              <p className="hidden sm:block text-xs md:text-sm text-white/85 leading-relaxed mb-5">
                {projects[currentIndex].desc}
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => goToProject(-1)}
                  aria-label="Projeto anterior"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white border-2 border-white/25 bg-transparent hover:scale-110 hover:bg-white/10 transition-transform duration-150 transition-colors duration-150"
                >
                  <ArrowLeft size={26} strokeWidth={2.25} />
                </button>
                <button 
                  onClick={() => goToProject(1)}
                  aria-label="Próximo projeto"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white border-2 border-white/25 bg-transparent hover:scale-110 hover:bg-white/10 transition-transform duration-150 transition-colors duration-150"
                >
                  <ArrowRight size={26} strokeWidth={2.25} />
                </button>
              </div>
            </div>

            {/* Right: indicator + watch */}
            <div className="flex flex-col items-end gap-4">
              <span className="text-xs font-mono text-[#8A8F96] tracking-widest">
                {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <button 
                onClick={() => setActiveModalProject(projects[currentIndex])}
                className="flex items-center gap-3 font-mono uppercase text-white/95 hover:text-white transition-opacity duration-200 group"
              >
                <span className="text-2xl md:text-4xl font-black tracking-tight">WATCH PROJECT</span>
                <ArrowRight className="w-5 h-5 md:w-7 md:h-7 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* BLOCK 04 — EQUIPMENT */}
        {/* ========================================== */}
        <EquipmentSection />

        {/* ========================================== */}
        {/* BLOCK 05 — CONTACT / THANK YOU */}
        {/* ========================================== */}
        <motion.section 
          id="contact"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full bg-[#080B0F]/90 border border-[#1e293b]/60 rounded-2xl p-6 md:p-12 shadow-2xl backdrop-blur-xl mb-10"
        >
          {/* Top horizontal mini tabs */}
          <div className="flex justify-between items-center mb-10 border-b border-[#1e293b]/50 pb-4">
            <div className="flex gap-6 text-xs uppercase tracking-widest text-[#8A8F96] font-mono">
              <a href="#about" className="hover:text-white transition">PROFILE</a>
              <a href="#projects" className="hover:text-white transition">PROJECT</a>
            </div>
            <div className="text-xs uppercase tracking-widest text-red-400 font-semibold flex items-center gap-2 font-mono">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              CONTACT PERSON
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Side: Circular Portrait & Socials */}
            <div className="md:col-span-6 flex flex-col gap-6">
              <h3 className="text-xl font-black uppercase tracking-wider font-mono">CONTACT ME</h3>
              
              <div className="flex items-center gap-6">
                <motion.div 
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  className="w-24 h-24 rounded-full overflow-hidden border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] flex-shrink-0 bg-black"
                >
                  <img 
                    src="/imagens/hero.png" 
                    alt="Paulo Silva" 
                    className="w-full h-full object-cover filter contrast-125"
                  />
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-white uppercase font-mono tracking-wider">PAULO SILVA</p>
                  <p className="text-xs text-[#8A8F96] font-mono">VIDEO MAKER / EDITOR</p>
                </div>
              </div>

              {/* Social links */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { icon: <InstagramIcon size={16} className="text-pink-500" />, label: '@paulo_vs.7', href: 'https://www.instagram.com/paulo_vs.7/' },
                  { icon: <Share2 size={16} className="text-white" />, label: '@paulosilva', href: 'https://tiktok.com' },
                  { icon: <Video size={16} className="text-red-500" />, label: 'PAULO FILMS', href: 'https://youtube.com' },
                  { icon: <ExternalLink size={16} className="text-red-500" />, label: 'BEHANCE', href: 'https://behance.net' },
                ].map((soc, idx) => (
                  <motion.a 
                    key={idx}
                    href={soc.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    whileHover={{ scale: 1.03, borderColor: "#ef4444", backgroundColor: "#111827" }}
                    className="flex items-center gap-3 bg-[#0d131f] border border-[#1e293b] p-3 rounded-xl transition text-xs font-mono shadow-md"
                  >
                    {soc.icon}
                    <span className="truncate">{soc.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Side: THANK YOU 2025 */}
            <div className="md:col-span-6 flex flex-col items-center md:items-end justify-center text-center md:text-right">
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white font-mono bg-gradient-to-r from-white via-gray-300 to-red-500 bg-clip-text text-transparent"
              >
                THANK YOU
              </motion.h2>
              <span className="text-2xl font-bold text-red-400 font-mono mt-2">2025</span>
              
              <motion.a 
                href="mailto:contact@paulosilva.com"
                whileHover={{ scale: 1.06, backgroundColor: "#dc2626", boxShadow: "0 0 25px rgba(239,68,68,0.6)" }}
                whileTap={{ scale: 0.96 }}
                className="mt-6 inline-block bg-red-600 text-white font-mono text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl transition shadow-lg shadow-red-900/50 flex items-center gap-2 font-bold"
              >
                <span>LET'S WORK TOGETHER</span>
                <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </div>
        </motion.section>

      </div>

            {/* VIDEO / PROJECT MODAL */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-[#080B0F] border border-red-500/30 rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "#dc2626" }}
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center transition shadow-lg"
              >
                <X size={20} />
              </motion.button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-5 bg-black flex items-center justify-center relative py-6 md:py-0">
                  <video 
                    src={activeModalProject.videoUrl} 
                    controls 
                    autoPlay 
                    playsInline
                    className="w-full max-w-[340px] aspect-[9/16] max-h-[78vh] object-contain bg-black rounded-xl"
                  ></video>
                </div>

                <div className="md:col-span-7 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#1e293b] bg-[#080B0F]/90">
                  <div>
                    <span className="text-xs font-mono text-red-400 tracking-widest font-bold">{activeModalProject.category}</span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white mt-1 mb-4 font-mono">{activeModalProject.title}</h3>
                    <p className="text-xs text-[#8A8F96] leading-relaxed">{activeModalProject.desc}</p>
                  </div>

                  <div className="pt-6 border-t border-[#1e293b]/50 mt-6">
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">PROJECT ID: {activeModalProject.id} / 2025</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
