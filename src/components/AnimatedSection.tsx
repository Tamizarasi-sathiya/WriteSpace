'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-in-up' | 'blur-in';
  delay?: number;
  threshold?: number;
};

export default function AnimatedSection({
  children,
  className,
  animation = 'fade-in',
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    switch (animation) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'slide-in-up':
        return 'animate-slide-in-up';
      case 'blur-in':
        return 'animate-blur-in';
      default:
        return 'opacity-100';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-opacity duration-1000 ease-out',
        getAnimationClass(),
        className
      )}
      style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );
}
