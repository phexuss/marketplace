'use client';
import { motion } from 'motion/react';

export default function HeroDescription() {
  return (
    <motion.p
      className="text-[#616060] font-normal text-sm md:text-base mt-2 max-w-sm md:max-w-md"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      Browse through our diverse range of meticulously crafted garments,
      designed to bring out your individuality and cater to your sense of style.
    </motion.p>
  );
}
