'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

import { siteConfig, type MenuCategory } from '@/config/site';

export default function MenuReceipt() {
  const menuData = siteConfig.menu as MenuCategory[];
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only attach the heavy mouse listener on desktop (devices with a precise pointer)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle the state update to screen refresh rate
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Framer Motion scroll hooks for the dynamic 3D wow factor
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // The receipt curves dynamically as you scroll - softer on mobile for readability
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [isMobile ? 12 : 25, 0, isMobile ? -12 : -25]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [isMobile ? 0.98 : 0.95, 1, isMobile ? 0.98 : 0.95]);

  return (
    <section ref={sectionRef} className="relative w-full bg-brand-charcoal pb-32 flex flex-col items-center border-t-8 border-brand-red">
      
      {/* MASSIVE Sticky Dispenser Slot - Stays at top! */}
      <div className="sticky top-0 left-0 right-0 h-16 md:h-32 bg-[#0A0A0A] z-[100] border-b-[4px] md:border-b-[8px] border-brand-red flex flex-col justify-center px-4 md:px-12 shadow-[0_30px_60px_rgba(0,0,0,1)] w-full">
        <div className="flex justify-between items-end w-full mb-2 font-mono text-brand-red text-xs md:text-sm font-black tracking-widest uppercase">
          <span>ORDER UP</span>
          <span>FRESH BATCH</span>
        </div>
        <div className="w-[100%] max-w-7xl h-4 md:h-8 bg-black border-2 border-brand-charcoal relative overflow-hidden flex items-center justify-center mx-auto">
           {/* Flashing print laser */}
           <motion.div 
             animate={{ x: ['-100%', '100%'] }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             className="w-1/2 h-full bg-brand-red blur-sm opacity-80" 
           />
           {/* CRT Scanline effect in slot */}
           <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)' }} />
        </div>
      </div>

      {/* The 3D Receipt Paper */}
      <div className="w-[95%] md:w-[85%] max-w-7xl relative z-20" style={{ perspective: '2000px' }}>
        <motion.div 
          style={{ 
            rotateX, 
            scale,
            transformOrigin: 'top center'
          }}
          className="bg-[#F5F5F0] w-full pb-48 text-black shadow-[0_50px_100px_rgba(0,0,0,1)] relative border-l-4 md:border-l-[12px] border-r-4 md:border-r-[12px] border-[#E8E8E0] font-mono pointer-events-none"
        >
          {/* Receipt Top Jagged Edge */}
          <div className="absolute -top-6 left-0 right-0 h-6 bg-[#F5F5F0]" style={{ clipPath: 'polygon(0% 100%, 2% 0%, 4% 100%, 6% 0%, 8% 100%, 10% 0%, 12% 100%, 14% 0%, 16% 100%, 18% 0%, 20% 100%, 22% 0%, 24% 100%, 26% 0%, 28% 100%, 30% 0%, 32% 100%, 34% 0%, 36% 100%, 38% 0%, 40% 100%, 42% 0%, 44% 100%, 46% 0%, 48% 100%, 50% 0%, 52% 100%, 54% 0%, 56% 100%, 58% 0%, 60% 100%, 62% 0%, 64% 100%, 66% 0%, 68% 100%, 70% 0%, 72% 100%, 74% 0%, 76% 100%, 78% 0%, 80% 100%, 82% 0%, 84% 100%, 86% 0%, 88% 100%, 90% 0%, 92% 100%, 94% 0%, 96% 100%, 98% 0%, 100% 100%)' }} />

          {/* Receipt Header - Industrial Brutalist */}
          <div className="pt-24 md:pt-48 pb-8 md:pb-12 text-center border-b-[4px] border-solid border-[#111] px-4 md:px-12 pointer-events-none relative">
             <div className="absolute top-4 left-4 font-mono text-[10px] md:text-sm font-black text-[#111] tracking-widest">
               EST. {siteConfig.brand.established}
             </div>
             <h2 className="text-4xl md:text-[8rem] font-black uppercase tracking-tighter text-[#111] leading-[0.85] mt-8" style={{ fontFamily: "'Bowlby One SC', cursive" }}>
                {siteConfig.brand.name}
             </h2>
             <p className="font-mono text-sm md:text-2xl font-black mt-6 md:mt-8 uppercase tracking-widest bg-[#111] text-[#F5F5F0] inline-block px-4 md:px-6 py-2 border-2 border-[#111]">
                {siteConfig.brand.motto}
             </p>
             <div className="mt-12 md:mt-16 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 font-mono text-xs md:text-lg font-bold text-[#111] uppercase tracking-widest border-t-2 border-b-2 border-[#111] py-2">
                <span>ORDER: #001</span>
                <span className="hidden md:inline">DINE IN / TAKEAWAY</span>
                <span>REGISTER: 01</span>
             </div>
          </div>

          {/* Menu Categories - Industrial Grid */}
          <div className="p-4 md:p-16 space-y-8 md:space-y-24 pointer-events-auto">
            {menuData.map((category, idx) => (
              <div key={idx} className="w-full border-2 md:border-4 border-[#111] bg-[#EAE8E3] p-4 md:p-8 relative">
                
                <div className="flex justify-between items-end border-b-4 border-[#111] pb-4 mb-6 md:mb-10">
                  <h3 className="text-2xl md:text-6xl font-black text-brand-red tracking-tighter uppercase leading-none" style={{ fontFamily: "'Bowlby One SC', cursive" }}>
                     {category.category}
                  </h3>
                  <span className="font-mono text-xs md:text-sm font-black text-[#111] tracking-widest">0{idx + 1}</span>
                </div>
                
                <div className="space-y-0">
                  {category.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx} 
                      className="group flex flex-col md:flex-row md:items-end justify-between border-b-2 border-solid border-[#111] py-4 cursor-crosshair hover:bg-[#111] hover:text-[#F5F5F0] transition-colors duration-0 px-2"
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="flex-1 pr-4 md:pr-8">
                        <h4 className="font-mono text-lg md:text-2xl font-black uppercase tracking-tight group-hover:text-brand-red leading-tight">
                          {item.name}
                        </h4>
                        {item.desc && (
                          <p className="font-mono text-[10px] md:text-sm font-bold text-[#555] group-hover:text-[#AAA] mt-1 md:mt-2 uppercase max-w-full md:max-w-[90%] leading-snug">
                            {item.desc}
                          </p>
                        )}
                      </div>
                      <div className="mt-2 md:mt-0 font-mono text-xl md:text-3xl font-black whitespace-nowrap text-brand-red">
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Receipt Bottom */}
          <div className="pt-16 pb-24 text-center border-t-[8px] border-solid border-[#111] px-6 mt-16 bg-[#111] text-[#F5F5F0]">
             <p className="font-mono text-2xl md:text-4xl font-black uppercase tracking-widest text-brand-red">
                YOUR ORDER IS READY
             </p>
             <p className="text-5xl md:text-7xl font-black uppercase tracking-widest mt-8" style={{ fontFamily: "'Bowlby One SC', cursive" }}>
                THANK YOU.
             </p>
             <div className="mt-12 flex justify-center">
               {/* Massive Brutalist Barcode */}
               <div className="h-24 md:h-32 w-full max-w-2xl bg-white" style={{ backgroundImage: 'repeating-linear-gradient(to right, black 0, black 4px, white 4px, white 10px, black 10px, black 12px, white 12px, white 18px, black 18px, black 26px, white 26px, white 32px)', backgroundSize: '100% 100%' }} />
             </div>
             <p className="font-mono text-[10px] md:text-sm font-black text-[#555] tracking-widest mt-4">
                ||||||||||||||||||||||||||||||||||||||
             </p>
          </div>
          
          {/* Receipt Bottom Jagged Edge */}
          <div className="absolute -bottom-6 left-0 right-0 h-6 bg-[#F5F5F0]" style={{ clipPath: 'polygon(0% 0%, 2% 100%, 4% 0%, 6% 100%, 8% 0%, 10% 100%, 12% 0%, 14% 100%, 16% 0%, 18% 100%, 20% 0%, 22% 100%, 24% 0%, 26% 100%, 28% 0%, 30% 100%, 32% 0%, 34% 100%, 36% 0%, 38% 100%, 40% 0%, 42% 100%, 44% 0%, 46% 100%, 48% 0%, 50% 100%, 52% 0%, 54% 100%, 56% 0%, 58% 100%, 60% 0%, 62% 100%, 64% 0%, 66% 100%, 68% 0%, 70% 100%, 72% 0%, 74% 100%, 76% 0%, 78% 100%, 80% 0%, 82% 100%, 84% 0%, 86% 100%, 88% 0%, 90% 100%, 92% 0%, 94% 100%, 96% 0%, 98% 100%, 100% 0%)' }} />
        </motion.div>
      </div>

      {/* Extreme 3D Hover Popup */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -20, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, rotate: 2, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.5, rotate: 20, filter: "blur(20px)" }}
            transition={{ type: "spring", damping: 12, stiffness: 250 }}
            className="hidden md:flex fixed pointer-events-none z-[100] p-12 bg-brand-red border-[8px] border-white shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] items-center justify-center max-w-2xl text-center"
            style={{ 
              left: mousePos.x, 
              top: mousePos.y,
              x: "10%",
              y: "-50%"
            }}
          >
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, black 0px, black 4px, transparent 4px, transparent 16px)' }} />
             <h3 className="relative text-4xl md:text-7xl font-black text-white uppercase italic leading-[0.9] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] tracking-tighter" style={{ fontFamily: "'Bowlby One SC', cursive" }}>
               {hoveredItem}
             </h3>
             <span className="absolute -bottom-8 right-0 text-black font-black text-2xl uppercase bg-brand-orange px-4 py-1 rotate-3 shadow-lg">PREVIEW</span>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
