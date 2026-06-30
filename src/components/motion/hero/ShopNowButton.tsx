'use client';
import { motion, useMotionValue, useSpring } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ShopNowButton() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  return (
    <Link href="/shop">
      <motion.button
        className="text-base rounded-full bg-neutral-800 py-3.5 px-14 mt-6 w-full sm:w-max hover:bg-neutral-800 active:bg-neutral-700 transition-colors cursor-pointer text-white"
        onMouseMove={handleMouse}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{ x: springX, y: springY }}
      >
        Shop Now
      </motion.button>
    </Link>
  );
}
