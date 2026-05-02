'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChaecholScrollSequence from '@/components/ChaecholScrollSequence';
import SmoothScroll from '@/components/SmoothScroll';
import MenuReceipt from '@/components/MenuReceipt';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // FIX FOR ANDROID SCROLL LOCK:
    // Prevents GSAP from completely breaking when the Android URL bar hides/shows
    ScrollTrigger.config({ ignoreMobileResize: true });
    
    // Refresh ScrollTrigger after a short delay to ensure all layouts are calculated correctly
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main ref={mainRef} className="relative bg-brand-charcoal selection:bg-brand-orange selection:text-white overflow-x-hidden">
      {/* <SmoothScroll /> */}
      
      {/* 1. ANIMATION SECTION (PINNED) */}
      <section className="sequence-container relative w-full bg-brand-charcoal">
        <ChaecholScrollSequence />

        <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center p-6 md:p-12">
           <div className="intro-text-1 opacity-0 text-center w-full flex flex-col items-center justify-center px-4" style={{ opacity: 0 }}>
              <h2 className="text-[12vw] md:text-9xl font-black text-white italic tracking-tighter uppercase drop-shadow-2xl leading-[0.9]">
                THE MOMENT<br/>OF <span className="text-brand-red underline decoration-brand-orange">TRUTH</span>
              </h2>
           </div>

           {/* Scroll Indicator - Positioned at absolute bottom */}
           <div className="scroll-indicator opacity-0 absolute bottom-8 left-0 right-0 flex flex-col items-center animate-bounce pointer-events-none z-50" style={{ opacity: 0 }}>
             <span className="text-white text-sm md:text-xl font-bold uppercase tracking-[0.3em] mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Scroll To Bite</span>
             <svg className="w-8 h-8 md:w-10 md:h-10 text-brand-orange drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
             </svg>
           </div>

           <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
              <div className="intro-text-2 opacity-0 bg-brand-red px-6 md:px-10 py-3 md:py-4 rotate-2 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)]" style={{ opacity: 0 }}>
                <h2 className="text-[7.5vw] md:text-8xl font-black text-white uppercase italic text-center whitespace-nowrap">
                  BUILT FOR THE BOLD.
                </h2>
              </div>
           </div>

           <div className="final-reveal-text opacity-0 absolute bottom-24 md:bottom-20 right-0 left-0 md:right-12 md:left-auto flex flex-col items-center md:items-end text-center md:text-right px-6" style={{ opacity: 0 }}>
              <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter text-white leading-none drop-shadow-[0_0_15px_rgba(0,0,0,1)] md:drop-shadow-[0_0_30px_rgba(0,0,0,1)]" style={{ WebkitTextStroke: "2px var(--color-brand-orange)" }}>
                UNWRAPPED
              </h1>
              <div className="bg-brand-orange px-4 md:px-6 py-1 mt-2 -rotate-1 shadow-lg">
                <h2 className="text-2xl md:text-5xl font-black text-white tracking-tighter">
                  PERFECTION
                </h2>
              </div>
           </div>
        </div>

        {/* Brand Elements */}
        <div className="fixed top-6 left-0 right-0 md:left-12 md:right-auto flex items-center justify-center md:justify-start gap-3 md:gap-4 z-50">
          <div className="bg-brand-red p-1.5 md:p-2 font-black text-xl md:text-2xl rotate-3 shadow-lg">B.B</div>
          <span className="text-base md:text-xl font-black tracking-tighter text-white">BELLY BRO'S</span>
        </div>
      </section>

      {/* 2. NOT GUILTY SECTION */}
      <section id="not-guilty-section" className="relative bg-brand-orange min-h-[100dvh] flex items-center justify-center py-24 md:py-40 px-6 md:px-12 border-t-8 border-brand-charcoal">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, black 0px, black 2px, transparent 2px, transparent 60px)' }} />
        
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center relative z-10">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[320px] md:max-w-[500px]">
              <div className="w-full aspect-[4/5] bg-brand-charcoal border-[8px] md:border-[16px] border-white shadow-[15px_15px_0px_0px_rgba(0,0,0,0.3)] md:shadow-[30px_30px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden">
                 <img src="/guilty.png" className="w-full h-full object-cover" alt="Not Guilty Hero" />
              </div>
              <div className="absolute -left-8 md:-left-12 top-0 h-full flex flex-col justify-between py-6 md:py-8 text-sm md:text-lg font-black text-white">
                <span>7'0"</span><span>6'0"</span><span>5'0"</span><span>4'0"</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start gap-8 md:gap-12 text-center md:text-left">
            <div className="bg-brand-charcoal text-white px-6 md:px-8 py-2 md:py-3 text-2xl md:text-4xl font-black rotate-[-2deg] shadow-xl">VERDICT:</div>
            <h2 className="text-6xl md:text-[12rem] font-black tracking-tighter text-white leading-[0.85] md:leading-[0.8]">
              NOT<br/>GUILTY
            </h2>
            <p className="text-xl md:text-3xl font-bold text-brand-charcoal max-w-lg border-l-0 md:border-l-8 border-brand-red pl-0 md:pl-8 italic">
              "Flavor so intense, it should be a felony."
            </p>
          </div>
        </div>
      </section>

      {/* 3. MENU RECEIPT SECTION (Replaced Beef Charcoal) */}
      <MenuReceipt />

      {/* 4. FINAL CTA / LAST PAGE - CENTERED TEXT */}
      <section className="relative z-30 bg-brand-red min-h-[100dvh] flex flex-col items-center justify-center py-12 md:py-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
           <span className="text-[120vw] md:text-[60vw] font-black text-white whitespace-nowrap">B.B</span>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-6xl flex-grow">
          {/* CENTERED HEADING */}
          <h2 className="text-5xl md:text-[11rem] font-black text-white leading-none mb-40 md:mb-24 tracking-tighter text-center">
            THE LEGEND<br/>
            <span className="text-brand-charcoal underline underline-offset-4 md:underline-offset-8 decoration-white decoration-2 md:decoration-4">IS HERE.</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 w-[85%] max-w-sm md:max-w-none md:w-full justify-center items-center mx-auto">
             <a 
               href="https://www.google.com/maps/place/belly+bros/data=!4m2!3m1!1s0x3919036cc83bebed:0xcd8774190ddb6f18?sa=X&ved=1t:242&ictx=111"
               target="_blank"
               rel="noopener noreferrer"
               className="w-full md:flex-1 min-w-0 md:min-w-[300px] text-center rounded-none bg-brand-orange px-6 md:px-12 py-3 md:py-10 text-lg md:text-3xl font-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:md:translate-x-2 hover:md:translate-y-2 hover:md:shadow-none transition-all uppercase tracking-widest block"
             >
                FIND US
             </a>
             <a 
               href="https://www.foodpanda.pk/restaurant/jqef/bellybros?utm_campaign=google_reserve_place_order_action_CH-SEO_"
               target="_blank"
               rel="noopener noreferrer"
               className="w-full md:flex-1 min-w-0 md:min-w-[300px] text-center rounded-none bg-brand-charcoal px-6 md:px-12 py-3 md:py-10 text-lg md:text-3xl font-black text-white shadow-[6px_6px_0px_0px_white] md:shadow-[20px_20px_0px_0px_white] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_white] hover:md:translate-x-2 hover:md:translate-y-2 hover:md:shadow-none transition-all uppercase tracking-widest block"
             >
                ORDER NOW
             </a>
          </div>
        </div>

        {/* SOCIAL LINKS - CENTERED */}
        <div className="relative z-10 w-full pt-8 md:pt-12 border-t border-white/20 mt-12 md:mt-16">
          <div className="flex flex-wrap justify-center gap-6 md:gap-24 text-[10px] md:text-sm font-black text-white uppercase tracking-[0.2em] md:tracking-[0.4em]">
             <a href="#" className="hover:text-brand-charcoal transition-colors px-4 md:px-6 py-2 md:py-3 bg-white/10 hover:bg-white text-center">Instagram</a>
             <a href="#" className="hover:text-brand-charcoal transition-colors px-4 md:px-6 py-2 md:py-3 bg-white/10 hover:bg-white text-center">TikTok</a>
             <a href="#" className="hover:text-brand-charcoal transition-colors px-4 md:px-6 py-2 md:py-3 bg-white/10 hover:bg-white text-center">Facebook</a>
          </div>
        </div>
      </section>

      <footer className="relative z-30 bg-brand-charcoal py-6 md:py-8 text-center">
          <p className="text-[8px] md:text-[10px] font-black text-white/20 tracking-widest uppercase px-4">© 2024 BELLY BRO'S • NO DIET, JUST BITE</p>
      </footer>
    </main>
  );
}
