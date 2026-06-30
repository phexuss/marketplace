'use client';
import { motion } from 'motion/react';

const heroLabelText = 'FIND CLOTHES THAT MATCHES YOUR STYLE';
const heroLabelWords = heroLabelText.split(' ');

export default function HeroLabel() {
  return (
    <motion.h1 className="text-4xl md:text-6xl font-extrabold font-display leading-tight">
      {heroLabelWords.map((word, i) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.08,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-3"
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.h1>
  );
}
