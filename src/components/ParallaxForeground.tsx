
'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';

type ParallaxForegroundProps = {
  children: ReactNode;
  className?: string;
  yRange?: [number, number];
  scaleRange?: [number, number];
  opacityRange?: [number, number];
};

export default function ParallaxForeground({
  children,
  className,
  yRange = [-100, 100],
  scaleRange = [1, 1],
  opacityRange = [1, 1],
}: ParallaxForegroundProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const opacity = useTransform(scrollYProgress, [0, 1], opacityRange);

  return (
    <div ref={ref} className={cn('absolute z-10', className)}>
        <motion.div style={{ y, scale, opacity }}>
            {children}
        </motion.div>
    </div>
  );
}
