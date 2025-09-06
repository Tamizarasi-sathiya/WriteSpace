'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type ParallaxWrapperProps = {
  children: ReactNode;
};

export default function ParallaxWrapper({ children }: ParallaxWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        const scrollTop = window.scrollY;
        const parallaxElements = wrapperRef.current.querySelectorAll<HTMLElement>('[data-speed]');
        
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.getAttribute('data-speed') || '0');
          const yPos = scrollTop * speed;
          
          const initialScale = parseFloat(el.getAttribute('data-initial-scale') || '1');
          const finalScale = parseFloat(el.getAttribute('data-final-scale') || '0.5');

          // Calculate scale based on scroll position (example: shrinks over the first 1000px)
          const scrollFraction = Math.min(scrollTop / 1000, 1);
          const scale = initialScale - (initialScale - finalScale) * scrollFraction;
          
          el.style.transform = `translateY(${yPos}px) scale(${scale})`;
        });
      }
    };
    
    // Set initial scale attribute for foreground elements on mount
    const foregroundElements = wrapperRef.current?.querySelectorAll<HTMLElement>('[data-speed^="-"]');
    foregroundElements?.forEach(el => {
        el.setAttribute('data-initial-scale', '1');
        el.setAttribute('data-final-scale', '0.7'); // shrink to 70% of original size
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
