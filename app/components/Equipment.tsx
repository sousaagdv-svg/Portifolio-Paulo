'use client';

import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

type EquipmentItem = {
  id: string;
  pos: string;
  scale: number;
  depth: number;
  rotate: number;
  zIndex: number;
  blur?: number;
  imageUrl?: string;
  parallax: { y: [number, number]; x: [number, number]; z: [number, number]; rotate: [number, number] };
};

const EQUIPMENT: EquipmentItem[] = [
  {
    id: "camera",
    pos: "top-[6%] left-[4%] md:top-[26%] md:left-[38%]", scale: 1.1, depth: 80, rotate: -1, zIndex: 60, blur: 0,
    parallax: { y: [8, -10], x: [0, 0], z: [0, 6], rotate: [0, 0] },
    imageUrl: "https://i.imgur.com/5iatCmK.png"
  },
  {
    id: "workstation",
    pos: "top-[6%] left-[56%] md:top-[12%] md:left-[8%]", scale: 0.9, depth: 40, rotate: -4, zIndex: 40, blur: 0,
    parallax: { y: [4, -6], x: [-6, 8], z: [0, 2], rotate: [0, 2] },
    imageUrl: "https://i.imgur.com/PnDLAWC.jpeg"
  },
  {
    id: "microphone",
    pos: "top-[27%] left-[62%] md:top-[48%] md:left-[72%]", scale: 0.96, depth: 50, rotate: 3, zIndex: 50, blur: 0,
    parallax: { y: [6, -8], x: [4, -4], z: [0, 4], rotate: [-2, -4] },
    imageUrl: "https://i.imgur.com/AZgf0AZ.png"
  },
  {
    id: "gimbal",
    pos: "top-[27%] left-[6%] md:top-[52%] md:left-[14%]", scale: 0.9, depth: 20, rotate: 2, zIndex: 35, blur: 0,
    parallax: { y: [4, -4], x: [0, 0], z: [0, 0], rotate: [1, 2] },
    imageUrl: "https://i.imgur.com/JbRZGBl.png"
  },
];

function Glyph({ id, className }: { id: string; className?: string }) {
  const common = {
    width: 40, height: 40, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "camera":
      return (<svg {...common} className={className}><rect x="3" y="7" width="18" height="13" rx="2.5" /><circle cx="12" cy="13.5" r="4" /><path d="M8 7l2-3h4l2 3" /></svg>);
    case "gimbal":
      return (<svg {...common} className={className}><circle cx="12" cy="6.5" r="3.5" /><path d="M12 10v9" /><rect x="6" y="19" width="12" height="1.6" rx="0.8" /><path d="M12 13l3-3" /></svg>);
    case "microphone":
      return (<svg {...common} className={className}><rect x="4.5" y="7.5" width="15" height="9" rx="4.5" /><path d="M12 3.5v4" /><circle cx="12" cy="20" r="1.4" /></svg>);
    default:
      return (<svg {...common} className={className}><rect x="3.5" y="3" width="10.5" height="7.5" rx="1.2" /><path d="M8.75 10.5v4" /><rect x="2.5" y="14.5" width="12.5" height="6" rx="1.2" /><rect x="17.5" y="5" width="3.4" height="13.5" rx="1.2" /></svg>);
  }
}

function useBreakpoint(): "mobile" | "tablet" | "desktop" {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");
  useLayoutEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

function EquipmentCard({
  item, index, scrollProgress, reduce, isHydrated,
}: {
  item: EquipmentItem & { name: string; category: string; description: string };
  index: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
  isHydrated: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const bp = useBreakpoint();

  const tiltX = useSpring(useMotionValue(0), { stiffness: 220, damping: 22, mass: 0.6 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 220, damping: 22, mass: 0.6 });

  const factor = bp === "mobile" ? 0.35 : bp === "tablet" ? 0.6 : 1;
  const driftY = useTransform(scrollProgress, [0, 1], [item.parallax.y[0] * factor, item.parallax.y[1] * factor]);
  const driftX = useTransform(scrollProgress, [0, 1], [item.parallax.x[0] * factor, item.parallax.x[1] * factor]);
  const driftRotate = useTransform(scrollProgress, [0, 1], [item.parallax.rotate[0], item.parallax.rotate[1]]);

  const onMove = (e: React.PointerEvent) => {
    const el = cardRef.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltY.set(px * 10);
    tiltX.set(-py * 8);
  };
  const onLeave = () => {
    if (reduce) return;
    tiltX.set(0);
    tiltY.set(0);
  };

  const motionScale = reduce ? 1 : item.scale;
  const motionDepth = reduce ? 0 : item.depth;
  const motionRotate = reduce ? 0 : item.rotate;
  const motionBlur = reduce ? 0 : (item.blur ?? 0);
  
  const reduceActive = reduce && isHydrated;
  const intensity = bp === "mobile" ? 0.5 : bp === "tablet" ? 0.75 : 1;
  const useScale = (reduceActive ? 1 : 1 + (motionScale - 1) * intensity);
  const useDepth = (reduceActive ? 0 : motionDepth * intensity);
  const useRotate = (reduceActive ? 0 : motionRotate * intensity);
  const useBlur = reduceActive ? 0 : motionBlur;

  return (
    <motion.div
      ref={cardRef}
      className={`absolute cursor-pointer select-none group ${item.pos}`}
      style={{ zIndex: reduceActive ? index + 1 : item.zIndex }}
      initial={isHydrated ? { opacity: 0 } : false}
      whileInView={isHydrated ? { opacity: 1 } : undefined}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + index * 0.06 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        style={{ x: driftX, y: driftY, rotateZ: driftRotate, transformPerspective: 900, transformStyle: "preserve-3d" }}
        initial={isHydrated ? { opacity: 0, scale: useScale * 0.6, z: useDepth - 140, rotateY: useRotate + 14, rotateX: 12, filter: `blur(${useBlur + 3}px)` } : false}
        whileInView={isHydrated ? {
          opacity: 1,
          scale: useScale,
          z: useDepth,
          rotateY: useRotate,
          rotateX: 0,
          filter: `blur(${useBlur}px)`,
        } : undefined}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.08 + index * 0.06 }}
        whileHover={reduceActive ? undefined : { scale: useScale * 1.09, z: useDepth + 70, filter: "blur(0px)", rotateY: useRotate }}
      >
        <motion.div
          style={{ rotateX: reduceActive ? 0 : tiltX, rotateY: reduceActive ? 0 : tiltY, transformPerspective: 900 }}
          className="w-[220px] md:w-[260px] p-4 md:p-5 rounded-xl border border-[#1e293b]/70 bg-[#080B0F]/95 backdrop-blur-sm shadow-[0_24px_60px_rgba(0,0,0,0.65)] transition-colors duration-300 group-hover:border-red-500/45 group-hover:bg-[#0B0F16]"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[9px] font-mono text-[#8A8F96] tracking-widest">{`${String(index + 1).padStart(2, "0")}`}</span>
            <span className="flex-1 h-px bg-gradient-to-r from-[#1e293b]/80 to-transparent" />
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
          </div>

          {/* Equipment image hero */}
          <div className="relative w-full aspect-[4/3] md:aspect-[4/3] rounded-lg overflow-hidden border border-red-500/20 bg-[#06080d] group-hover:border-red-500/50 transition-colors duration-300 p-2.5 flex items-center justify-center">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/95 bg-gradient-to-br from-[#141a26] to-[#0a0d14]">
                <Glyph id={item.id} />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/40 via-transparent to-transparent pointer-events-none" />
          </div>

          <p className="mt-3 text-[9px] font-mono uppercase tracking-widest text-[#8A8F96] group-hover:text-red-400/90 transition-colors duration-300">
            {item.category}
          </p>
          <h3 className="text-[13px] md:text-sm font-mono font-bold tracking-wider text-white mt-0.5 uppercase">
            {item.name}
          </h3>

          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
            <div className="overflow-hidden">
              <p className="pt-2 mt-2 border-t border-[#1e293b]/40 text-[9px] font-mono uppercase tracking-[0.18em] text-red-400/90">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function EquipmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() === true;
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const [isHydrated, setIsHydrated] = useState(false);

  const items = EQUIPMENT.map((item, i) => ({
    ...item,
    name: t.equipment.items[i].name,
    category: t.equipment.items[i].category,
    description: t.equipment.items[i].description,
  }));

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <motion.section
      id="equipment"
      ref={sectionRef}
      initial={isHydrated ? { opacity: 0 } : false}
      whileInView={isHydrated ? { opacity: 1 } : undefined}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-[#080B0F]/65 border border-[#1e293b]/50 rounded-2xl shadow-[0_0_90px_rgba(0,0,0,0.5)] backdrop-blur-xl"
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[70%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(153,27,27,0.10)_0%,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />
      </div>

      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-5 z-[5] pointer-events-none">
        {t.equipment.annotations.map((a) => (
          <span key={a} className="text-[9px] font-mono tracking-[0.22em] text-[#8A8F96]/45 flex items-center gap-2">
            <span className="w-4 h-px bg-[#1e293b]/70" />
            {a}
          </span>
        ))}
      </div>

      <div className="relative z-10 px-6 md:px-12 pt-6 pb-4">
        <div className="flex justify-between items-center mb-10 border-b border-[#1e293b]/50 pb-4">
          <div className="flex gap-6 text-xs uppercase tracking-widest text-[#8A8F96] font-mono">
            <a href="#about" className="hover:text-white transition">{t.equipment.profileTab}</a>
            <a href="#projects" className="hover:text-white transition">{t.equipment.projectTab}</a>
          </div>
          <div className="text-xs uppercase tracking-widest text-red-400 font-semibold flex items-center gap-2 font-mono">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            {t.equipment.label}
          </div>
        </div>

        <motion.div
          initial={isHydrated ? { opacity: 0, y: 24 } : false}
          whileInView={isHydrated ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-baseline gap-4 flex-wrap">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-mono text-white">{t.equipment.label}</h2>
            <span className="text-xs uppercase tracking-widest text-red-400 font-mono">Nº 02</span>
          </div>
          <p className="mt-3 text-sm md:text-base font-mono uppercase tracking-widest text-[#8A8F96]">
            {t.equipment.subtitle}
          </p>
          <p className="mt-4 max-w-md text-xs md:text-sm text-[#8A8F96]/80 font-mono leading-relaxed">
            {t.equipment.description}
          </p>
        </motion.div>

        <div
          className="relative w-full h-auto min-h-[500px] md:h-[680px]"
          style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
        >
          <div className="hidden md:block absolute inset-0 pointer-events-none opacity-[0.4]">
            <div className="absolute top-0 bottom-0 left-[25%] w-px bg-gradient-to-b from-transparent via-[#1e293b]/60 to-transparent" />
            <div className="absolute top-0 bottom-0 left-[75%] w-px bg-gradient-to-b from-transparent via-[#1e293b]/60 to-transparent" />
            <div className="absolute left-0 right-0 top-[16%] h-px bg-gradient-to-r from-transparent via-[#1e293b]/50 to-transparent" />
            <div className="absolute left-0 right-0 top-[50%] h-px bg-gradient-to-r from-transparent via-[#1e293b]/50 to-transparent" />
            <div className="absolute left-0 right-0 top-[84%] h-px bg-gradient-to-r from-transparent via-[#1e293b]/50 to-transparent" />
          </div>

          <div className="hidden md:block absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {isHydrated && items.map((item, idx) => (
              <EquipmentCard
                key={item.id}
                item={item}
                index={idx}
                scrollProgress={scrollYProgress}
                reduce={reduce}
                isHydrated={isHydrated}
              />
            ))}
          </div>

          {/* Mobile fluid grid — no absolute positioning, no viewport overflow */}
          <div className="md:hidden flex flex-col gap-5 pt-2 pb-4">
            {items.map((item, idx) => (
              <div key={item.id} className="rounded-xl border border-[#1e293b]/70 bg-[#080B0F]/95 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-mono text-[#8A8F96] tracking-widest">{`${String(idx + 1).padStart(2, "0")}`}</span>
                  <span className="flex-1 h-px bg-gradient-to-r from-[#1e293b]/80 to-transparent" />
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-red-500/20 bg-[#06080d] p-2.5 flex items-center justify-center">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full object-contain object-center"
                    />
                  ) : (
                    <Glyph id={item.id} className="text-white/90" />
                  )}
                </div>
                <p className="mt-3 text-[9px] font-mono uppercase tracking-widest text-[#8A8F96]">{item.category}</p>
                <h3 className="text-sm font-mono font-bold tracking-wider text-white mt-0.5 uppercase">{item.name}</h3>
                <p className="pt-2 mt-2 border-t border-[#1e293b]/40 text-[9px] font-mono uppercase tracking-[0.18em] text-red-400/90">{item.description}</p>
              </div>
            ))}
          </div>

          <motion.div
            initial={isHydrated ? { opacity: 0 } : false}
            whileInView={isHydrated ? { opacity: 1 } : undefined}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="hidden md:flex absolute bottom-0 inset-x-0 items-center justify-between text-[9px] font-mono uppercase tracking-[0.22em] text-[#8A8F96]/50"
          >
            <span>{t.equipment.footer}</span>
            <span className="hidden md:block">{t.equipment.footerRight}</span>
            <span>2025</span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}