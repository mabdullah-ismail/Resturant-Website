'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;

export default function ChaecholScrollSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Preload images safely to prevent Android/Mobile network lockups
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loadedCount = 0;
    let nextIndexToLoad = 0;
    const CONCURRENCY = 4; // Max 4 parallel downloads to stop mobile from freezing

    const loadNext = () => {
      if (nextIndexToLoad >= FRAME_COUNT) return;
      
      const currentIndex = nextIndexToLoad++;
      const img = new Image();
      img.src = `/sequence/frame_${currentIndex}.jpg`;
      
      const onComplete = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        
        if (loadedCount === FRAME_COUNT) {
          setImages([...loadedImages]);
          setTimeout(() => setIsLoading(false), 800);
        } else {
          loadNext(); // Trigger the next download in the queue
        }
      };

      img.onload = onComplete;
      img.onerror = onComplete; // If an image fails to download, skip it so the loader doesn't get permanently stuck
      loadedImages[currentIndex] = img;
    };

    // Kick off the loading queue
    for (let i = 0; i < Math.min(CONCURRENCY, FRAME_COUNT); i++) {
      loadNext();
    }
  }, []);

  // GSAP ScrollTrigger for Pinning and Animation
  useEffect(() => {
    if (images.length === 0 || !canvasRef.current || !sectionRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const setCanvasSize = () => {
      // Limit devicePixelRatio to 2 for performance on ultra-high res Android screens
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    setCanvasSize();

    const render = (index: number) => {
      const img = images[Math.floor(index)];
      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgAspect = img.width / img.height;
        const canvasAspect = canvasWidth / canvasHeight;
        
        let drawWidth, drawHeight, x, y;
        
        if (imgAspect > canvasAspect) {
          drawHeight = canvasHeight;
          drawWidth = canvasHeight * imgAspect;
          x = (canvasWidth - drawWidth) / 2;
          y = 0;
        } else {
          drawWidth = canvasWidth;
          drawHeight = canvasWidth / imgAspect;
          x = 0;
          y = (canvasHeight - drawHeight) / 2;
        }

        context.drawImage(img, x, y, drawWidth, drawHeight);
      }
    };

    const animationObj = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=350%", 
        pin: true,
        scrub: 1, // Smoother scrub for touch
        anticipatePin: 1,
      }
    });

    // We use a base duration of 100 for easy percentage math
    tl.to(animationObj, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      duration: 100,
      onUpdate: () => render(animationObj.frame)
    }, 0);

    // 1. "The Moment of Truth" (Appears 0-15%, Moves 15-30%)
    tl.fromTo('.intro-text-1', 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 15 },
      0
    ).to('.intro-text-1', {
      scale: 0.4,
      x: '35vw',
      y: '-40vh',
      opacity: 0.9,
      duration: 15
    }, 15);

    // 2. "Built For The Bold" (Appears 35-50%, Moves 50-65%)
    tl.fromTo('.intro-text-2', 
      { opacity: 0, y: 50, rotation: 2 },
      { opacity: 1, y: 0, rotation: 2, duration: 15 },
      35
    ).to('.intro-text-2', {
      rotation: -90,
      x: '-42vw',
      scale: 0.6,
      duration: 15
    }, 50);

    // 3. "Unwrapped Perfection" (Appears 75-90%)
    tl.fromTo('.final-reveal-text', 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 15 },
      75
    );

    // 4. Fade out all texts right after the images finish (100-110%) 
    // This forces you to scroll further down for them to vanish, and they vanish as the new page arrives.
    tl.to(['.intro-text-1', '.intro-text-2', '.final-reveal-text'], {
      opacity: 0,
      duration: 10
    }, 100);

    const handleResize = () => {
      setCanvasSize();
      render(animationObj.frame);
    };

    window.addEventListener('resize', handleResize);
    render(0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, [images]);

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden bg-brand-charcoal">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-red"
          >
            <motion.div 
              animate={{ scale: [1, 1.05, 1], rotate: [-1, 1, -1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-6xl md:text-[10rem] font-black tracking-tighter text-white text-center leading-none"
              style={{ fontFamily: "'Bowlby One SC', cursive" }}
            >
              BELLY<br/>BRO'S
            </motion.div>
            
            <div className="mt-12 w-64 md:w-80 px-4">
              <div className="h-2 md:h-4 w-full bg-black/20 relative overflow-hidden rounded-full border-2 border-white/20">
                <motion.div 
                  className="absolute h-full bg-white left-0"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="mt-4 flex justify-between items-center text-[10px] md:text-xs uppercase tracking-[0.2em] font-black text-white">
                <span>FIRING UP...</span>
                <span>{progress}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        <canvas ref={canvasRef} className="w-full h-full pointer-events-none" style={{ width: '100vw', height: '100dvh', display: 'block' }} />
      </div>
    </div>
  );
}
