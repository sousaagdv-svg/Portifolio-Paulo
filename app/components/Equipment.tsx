'use client';

import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type EquipmentItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  ann: string;
  pos: string;
  scale: number;
  depth: number;
  rotate: number;
  zIndex: number;
  blur?: number;
  parallax: { y: [number, number]; x: [number, number]; z: [number, number]; rotate: [number, number] };
};

const EQUIPMENT: EquipmentItem[] = [
  {
    id: "camera", name: "CAMERA", category: "Cinema Camera", description: "PRIMARY CAMERA SYSTEM", ann: "01 / CAMERA",
    pos: "top-[6%] left-[4%] md:top-[26%] md:left-[38%]", scale: 1.1, depth: 80, rotate: -1, zIndex: 60, blur: 0,
    parallax: { y: [8, -10], x: [0, 0], z: [0, 6], rotate: [0, 0] },
  },
  {
    id: "lens", name: "LENS", category: "Cinema Lens", description: "OPTICAL CONTROL AND DEPTH", ann: "02 / OPTICS",
    pos: "top-[6%] left-[56%] md:top-[12%] md:left-[8%]", scale: 0.9, depth: 40, rotate: -4, zIndex: 40, blur: 0,
    parallax: { y: [4, -6], x: [-6, 8], z: [0, 2], rotate: [0, 2] },
  },
  {
    id: "gimbal", name: "GIMBAL", category: "Camera Gimbal", description: "STABILIZED MOVEMENT", ann: "03 / MOTION",
    pos: "top-[27%] left-[62%] md:top-[48%] md:left-[72%]", scale: 0.96, depth: 50, rotate: 3, zIndex: 50, blur: 0,
    parallax: { y: [6, -8], x: [4, -4], z: [0, 4], rotate: [-2, -4] },
  },
  {
    id: "microphone", name: "MICROPHONE", category: "Shotgun Microphone", description: "CLEAN LOCATION AUDIO", ann: "05 / SOUND",
    pos: "top-[27%] left-[6%] md:top-[58%] md:left-[14%]", scale: 0.9, depth: 20, rotate: 2, zIndex: 35, blur: 0,
    parallax: { y: [4, -4], x: [0, 0], z: [0, 0], rotate: [1, 2] },
  },
  {
    id: "light", name: "LIGHT", category: "LED Lighting", description: "CONTROLLED CINEMATIC LIGHT", ann: "04 / LIGHT",
    pos: "top-[48%] left-[10%] md:top-[6%] md:left-[76%]", scale: 0.82, depth: -20, rotate: 5, zIndex: 20, blur: 0.6,
    parallax: { y: [-2, 6], x: [4, -6], z: [0, -2], rotate: [0, -1] },
  },
  {
    id: "monitor", name: "MONITOR", category: "Reference Monitor", description: "COLOR AND IMAGE CONTROL", ann: "06 / IMAGE",
    pos: "top-[48%] left-[56%] md:top-[60%] md:left-[42%]", scale: 1.0, depth: 30, rotate: 1, zIndex: 45, blur: 0,
    parallax: { y: [2, -2], x: [0, 0], z: [0, 3], rotate: [0, 0] },
  },
  {
    id: "drone", name: "DRONE", category: "Aerial Camera", description: "DYNAMIC PERSPECTIVES", ann: "07 / AERIAL",
    pos: "top-[69%] left-[2%] md:top-[2%] md:left-[56%]", scale: 0.86, depth: 10, rotate: 3, zIndex: 30, blur: 0,
    parallax: { y: [-6, 10], x: [6, -6], z: [0, -4], rotate: [0, -3] },
  },
  {
    id: "workstation", name: "WORKSTATION", category: "Editing Workstation", description: "POST-PRODUCTION AND FINISHING", ann: "08 / FINISH",
    pos: "top-[69%] left-[56%] md:top-[68%] md:left-[82%]", scale: 0.74, depth: -60, rotate: -3, zIndex: 10, blur: 1.2,
    parallax: { y: [0, 4], x: [-4, 4], z: [0, -6], rotate: [0, -2] },
  },
];

const ANNOTATIONS = [
  "01 / CAMERA", "02 / OPTICS", "03 / MOTION", "04 / LIGHT", "05 / SOUND",
];

function Glyph({ id, className }: { id: string; className?: string }) {
  const common = {
    width: 40, height: 40, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "camera":
      return (<svg {...common} className={className}><rect x="3" y="7" width="18" height="13" rx="2.5" /><circle cx="12" cy="13.5" r="4" /><path d="M8 7l2-3h4l2 3" /></svg>);
    case "lens":
      return (<svg {...common} className={className}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><path d="M12 12l6.36-6.36" /></svg>);
    case "gimbal":
      return (<svg {...common} className={className}><circle cx="12" cy="6.5" r="3.5" /><path d="M12 10v9" /><rect x="6" y="19" width="12" height="1.6" rx="0.8" /><path d="M12 13l3-3" /></svg>);
    case "microphone":
      return (<svg {...common} className={className}><rect x="4.5" y="7.5" width="15" height="9" rx="4.5" /><path d="M12 3.5v4" /><circle cx="12" cy="20" r="1.4" /></svg>);
    case "light":
      return (<svg {...common} className={className}><rect x="5" y="5.5" width="14" height="11" rx="1.5" /><path d="M5 9.5h14" /><path d="M8.5 20.5h7" /><path d="M3 3.5h2M19 3.5h2" opacity="0.6" /></svg>);
    case "monitor":
      return (<svg {...common} className={className}><rect x="3" y="4.5" width="18" height="12" rx="1.5" /><path d="M12 16.5V21" /><path d="M8 21h8" /><path d="M6.5 8h11M6.5 11h6" opacity="0.55" /></svg>);
    case "drone":
      return (<svg {...common} className={className}><circle cx="12" cy="12" r="2.4" /><path d="M12 9.6V3.4M12 14.4v6.2M9.6 12H3.4M14.4 12h6.2" /><circle cx="12" cy="3.4" r="1.4" /><circle cx="12" cy="20.6" r="1.4" /><circle cx="3.4" cy="12" r="1.4" /><circle cx="20.6" cy="12" r="1.4" /></svg>);
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
  item: EquipmentItem;
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
          className="w-[132px] md:w-[156px] p-3.5 md:p-4 rounded-xl border border-[#1e293b]/70 bg-[#080B0F]/95 backdrop-blur-sm shadow-[0_18px_50px_rgba(0,0,0,0.55)] transition-colors duration-300 group-hover:border-red-500/45 group-hover:bg-[#0B0F16]"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[9px] font-mono text-[#8A8F96] tracking-widest">{`${String(index + 1).padStart(2, "0")}`}</span>
            <span className="flex-1 h-px bg-gradient-to-r from-[#1e293b]/80 to-transparent" />
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
          </div>

          <div className="w-12 h-12 rounded-lg border border-red-500/25 bg-gradient-to-br from-[#141a26] to-[#0a0d14] flex items-center justify-center text-white/90 group-hover:border-red-500/60 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(220,38,38,0.25)] transition-all duration-300">
            <Glyph id={item.id} />
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
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const [isHydrated, setIsHydrated] = useState(false);

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
        {ANNOTATIONS.map((a) => (
          <span key={a} className="text-[9px] font-mono tracking-[0.22em] text-[#8A8F96]/45 flex items-center gap-2">
            <span className="w-4 h-px bg-[#1e293b]/70" />
            {a}
          </span>
        ))}
      </div>

      <div className="relative z-10 px-6 md:px-12 pt-6 pb-4">
        <div className="flex justify-between items-center mb-10 border-b border-[#1e293b]/50 pb-4">
          <div className="flex gap-6 text-xs uppercase tracking-widest text-[#8A8F96] font-mono">
            <a href="#about" className="hover:text-white transition">PROFILE</a>
            <a href="#projects" className="hover:text-white transition">PROJECT</a>
          </div>
          <div className="text-xs uppercase tracking-widest text-red-400 font-semibold flex items-center gap-2 font-mono">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            EQUIPMENT
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
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-mono text-white">EQUIPMENT</h2>
            <span className="text-xs uppercase tracking-widest text-red-400 font-mono">NO. 02</span>
          </div>
          <p className="mt-3 text-sm md:text-base font-mono uppercase tracking-widest text-[#8A8F96]">
            The tools behind the frame
          </p>
          <p className="mt-4 max-w-md text-xs md:text-sm text-[#8A8F96]/80 font-mono leading-relaxed">
            Camera, movement, light, sound and post-production.
            Every tool has a purpose.
          </p>
        </motion.div>

        <div
          className="relative w-full h-[760px] md:h-[600px]"
          style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
            <div className="absolute top-0 bottom-0 left-[25%] w-px bg-gradient-to-b from-transparent via-[#1e293b]/60 to-transparent" />
            <div className="absolute top-0 bottom-0 left-[75%] w-px bg-gradient-to-b from-transparent via-[#1e293b]/60 to-transparent" />
            <div className="absolute left-0 right-0 top-[16%] h-px bg-gradient-to-r from-transparent via-[#1e293b]/50 to-transparent" />
            <div className="absolute left-0 right-0 top-[50%] h-px bg-gradient-to-r from-transparent via-[#1e293b]/50 to-transparent" />
            <div className="absolute left-0 right-0 top-[84%] h-px bg-gradient-to-r from-transparent via-[#1e293b]/50 to-transparent" />
          </div>

          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {isHydrated && EQUIPMENT.map((item, idx) => (
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

          <motion.div
            initial={isHydrated ? { opacity: 0 } : false}
            whileInView={isHydrated ? { opacity: 1 } : undefined}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute bottom-0 inset-x-0 flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.22em] text-[#8A8F96]/50"
          >
            <span>EQUIPMENT ARRAY / 08 ITEMS</span>
            <span className="hidden md:block">DEPTH COMPOSITION — EDITORIAL</span>
            <span>2025</span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}