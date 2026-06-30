'use client';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src="/hero.png"
        alt="..."
        width={1000}
        height={1000}
        priority
        fetchPriority="high"
        className="w-full h-auto lg:ml-auto lg:w-auto lg:max-h-150 xl:max-h-none "
      />
    </motion.div>
  );
}
