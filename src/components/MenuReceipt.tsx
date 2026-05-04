'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

type MenuItem = { name: string; price: string; desc?: string };
type MenuCategory = { category: string; items: MenuItem[] };

const menuData: MenuCategory[] = [
  { category: "STARTERS", items: [
    { name: "Chicken Tenders 3 Pcs", price: "Rs. 649" },
    { name: "Chicken Tenders 6 Pcs", price: "Rs. 1149" },
    { name: "Nuggets 6 Pcs", price: "Rs. 349" },
    { name: "Bihari Roll", price: "Rs. 649" },
    { name: "Bihari Roll Platter", price: "Rs. 1199" },
    { name: "Oven Baked Wings (6)", price: "Rs. 549" },
    { name: "Oven Baked Wings (12)", price: "Rs. 1099" },
  ]},
  { category: "FRIES", items: [
    { name: "Loaded Fries", price: "Rs. 699" },
    { name: "Charcoal Shawarma Fries", price: "Rs. 899" },
    { name: "Cheesy Loaded Fries", price: "Rs. 849" },
    { name: "Plain Fries", price: "Rs. 349" },
    { name: "Masala Fries", price: "Rs. 399" },
  ]},
  { category: "PIZZAS - CLASSIC", items: [
    { name: "Creamy Tikka", price: "S:599 | M:1299 | L:2199" },
    { name: "Cheese Lover", price: "S:599 | M:1299 | L:2199" },
    { name: "Lasagna Pizza", price: "S:599 | M:1299 | L:2199" },
    { name: "Chicken Fajita", price: "S:599 | M:1299 | L:2199" },
    { name: "BBQ Pizza", price: "S:599 | M:1299 | L:2199" },
  ]},
  { category: "PIZZAS - PREMIUM", items: [
    { name: "Kebab Stuffer", price: "S:749 | M:1599 | L:2499" },
    { name: "Crown Crust", price: "S:749 | M:1599 | L:2499" },
    { name: "Ranch Style Pizza", price: "S:749 | M:1599 | L:2499" },
    { name: "Chicken Supreme", price: "S:749 | M:1599 | L:2499" },
    { name: "Beef Pepperoni", price: "S:749 | M:1599 | L:2499" },
    { name: "Achari Pizza", price: "S:749 | M:1599 | L:2499" },
    { name: "Malai Boti", price: "S:749 | M:1599 | L:2499" },
  ]},
  { category: "SHAWARMA", items: [
    { name: "Charcoal Iraqi Shawarma Chicken", desc: "Saaj Bread With Garlic Sauce, Pickle and Fries", price: "Rs. 699" },
    { name: "Charcoal Iraqi Shawarma Beef", desc: "Saaj Bread With Tahina, Pickle & Vegi Fries", price: "Rs. 1199" },
  ]},
  { category: "BROAST", items: [
    { name: "Quarter Broast", desc: "2 Pcs Chicken, Fries, Bread, Garlic Sauce", price: "Rs. 649" },
    { name: "Half Broast", desc: "4 Pcs Chicken, Fries, 2 Bread, 2 Garlic Sauce", price: "Rs. 1249" },
    { name: "Full Broast", desc: "8 Pcs Chicken, Fries, 3 Bread, 3 Garlic Sauce", price: "Rs. 2399" },
  ]},
  { category: "PLATTERS", items: [
    { name: "Shawarma Arabi Chicken", price: "Rs. 949" },
    { name: "Shawarma Arabi Beef", price: "Rs. 1499" },
    { name: "Sahan Shawarma Chicken", price: "Rs. 1049" },
    { name: "Sahan Shawarma Beef", price: "Rs. 1549" },
    { name: "Belly Bros Special Platter", price: "Rs. 1999" },
  ]}
];

export default function MenuReceipt() {
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

  // The receipt curves dynamically as you scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={sectionRef} className="relative w-full bg-brand-charcoal min-h-[300dvh] pb-32 flex flex-col items-center border-t-8 border-brand-red">
      
      {/* MASSIVE Sticky Dispenser Slot - Stays at top! */}
      <div className="sticky top-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-b from-black to-zinc-900 z-[100] border-b-[12px] border-[#111] flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,1)] w-full">
        <div className="w-[95%] md:w-[90%] max-w-7xl h-4 md:h-8 bg-black rounded-full shadow-inner flex items-center justify-center overflow-hidden border border-white/10">
           {/* Flashing print laser */}
           <motion.div 
             animate={{ x: ['-100%', '100%'] }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             className="w-1/2 h-full bg-brand-red blur-md opacity-50" 
           />
        </div>
        {/* Metal rivets */}
        <div className="absolute top-4 left-6 md:left-12 w-3 h-3 md:w-5 md:h-5 rounded-full bg-zinc-800 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.8)] border border-zinc-600 z-10" />
        <div className="absolute top-4 right-6 md:right-12 w-3 h-3 md:w-5 md:h-5 rounded-full bg-zinc-800 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.8)] border border-zinc-600 z-10" />
        <div className="absolute bottom-4 left-6 md:left-12 w-3 h-3 md:w-5 md:h-5 rounded-full bg-zinc-800 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.8)] border border-zinc-600 z-10" />
        <div className="absolute bottom-4 right-6 md:right-12 w-3 h-3 md:w-5 md:h-5 rounded-full bg-zinc-800 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.8)] border border-zinc-600 z-10" />
      </div>

      {/* The 3D Receipt Paper */}
      <div className="w-[95%] md:w-[85%] max-w-7xl relative z-20" style={{ perspective: '2000px' }}>
        <motion.div 
          style={{ 
            rotateX, 
            scale,
            transformOrigin: 'top center'
          }}
          className="bg-[#F5F5F0] w-full min-h-[200vh] pb-48 text-black shadow-[0_50px_100px_rgba(0,0,0,1)] relative border-l-4 md:border-l-[12px] border-r-4 md:border-r-[12px] border-[#E8E8E0] font-mono pointer-events-none"
        >
          {/* Receipt Top Jagged Edge */}
          <div className="absolute -top-6 left-0 right-0 h-6 bg-[#F5F5F0]" style={{ clipPath: 'polygon(0% 100%, 2% 0%, 4% 100%, 6% 0%, 8% 100%, 10% 0%, 12% 100%, 14% 0%, 16% 100%, 18% 0%, 20% 100%, 22% 0%, 24% 100%, 26% 0%, 28% 100%, 30% 0%, 32% 100%, 34% 0%, 36% 100%, 38% 0%, 40% 100%, 42% 0%, 44% 100%, 46% 0%, 48% 100%, 50% 0%, 52% 100%, 54% 0%, 56% 100%, 58% 0%, 60% 100%, 62% 0%, 64% 100%, 66% 0%, 68% 100%, 70% 0%, 72% 100%, 74% 0%, 76% 100%, 78% 0%, 80% 100%, 82% 0%, 84% 100%, 86% 0%, 88% 100%, 90% 0%, 92% 100%, 94% 0%, 96% 100%, 98% 0%, 100% 100%)' }} />

          {/* Receipt Header */}
          <div className="pt-32 md:pt-64 pb-8 md:pb-12 text-center border-b-[4px] border-dashed border-gray-400 px-4 md:px-12 pointer-events-none">
             <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter text-black/90 leading-none" style={{ fontFamily: "'Bowlby One SC', cursive" }}>
                BELLY BRO'S
             </h2>
             <p className="text-sm md:text-4xl font-black mt-4 md:mt-6 uppercase tracking-widest bg-black text-white inline-block px-4 md:px-6 py-2">
                NO DIET, JUST BITE.
             </p>
             <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 text-[10px] md:text-xl font-bold text-gray-500 uppercase tracking-widest">
                <span>ORDER TICKET: #001</span>
                <span className="hidden md:inline">INTERACTIVE MENU</span>
                <span>TERMINAL: 04</span>
             </div>
          </div>

          {/* Menu Categories - Extremely Spacious and Wide */}
          <div className="p-4 md:p-24 space-y-16 md:space-y-32 pointer-events-auto">
            {menuData.map((category, idx) => (
              <div key={idx} className="w-full">
                <h3 className="text-4xl md:text-7xl font-black text-brand-red mb-6 md:mb-12 tracking-tighter uppercase leading-none" style={{ fontFamily: "'Bowlby One SC', cursive" }}>
                   {category.category}
                </h3>
                
                <div className="space-y-6 md:space-y-12">
                  {category.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx} 
                      className="group flex flex-col md:flex-row md:items-end justify-between border-b-2 border-dotted border-gray-400 pb-2 md:pb-4 cursor-crosshair"
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="flex-1 pr-4 md:pr-8">
                        <h4 className="text-lg md:text-4xl font-black uppercase tracking-tight group-hover:text-brand-red transition-colors duration-100 leading-tight">
                          {item.name}
                        </h4>
                        {item.desc && (
                          <p className="text-[10px] md:text-xl font-bold text-gray-500 mt-1 md:mt-2 uppercase max-w-full md:max-w-[90%] leading-snug">
                            {item.desc}
                          </p>
                        )}
                      </div>
                      <div className="mt-1 md:mt-0 text-xl md:text-4xl font-black whitespace-nowrap text-brand-charcoal">
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Receipt Bottom */}
          <div className="pt-16 pb-24 text-center border-t-[4px] border-dashed border-gray-400 px-6 mt-16">
             <p className="text-4xl md:text-6xl font-black uppercase tracking-widest text-black/90" style={{ fontFamily: "'Bowlby One SC', cursive" }}>
                THANK YOU.
             </p>
             <div className="mt-12 flex justify-center">
               {/* Massive Fake Barcode */}
               <div className="h-24 md:h-32 w-full max-w-2xl opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(to right, black 0, black 4px, transparent 4px, transparent 10px, black 10px, black 12px, transparent 12px, transparent 18px, black 18px, black 26px, transparent 26px, transparent 32px)', backgroundSize: '100% 100%' }} />
             </div>
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
