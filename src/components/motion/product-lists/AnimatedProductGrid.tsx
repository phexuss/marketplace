'use client';

import { motion, type Variants } from 'motion/react';
import ProductCard from '@/components/products/product-card';
import type { Product } from '@/generated/prisma/client';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

interface AnimatedProductGridProps {
  products: Product[];
  className?: string;
}

export default function AnimatedProductGrid({
  products,
  className,
}: AnimatedProductGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {products?.map((p, index) => (
        <motion.div key={p.id} variants={item}>
          <ProductCard product={p} isPriority={index < 4} />
        </motion.div>
      ))}
    </motion.div>
  );
}
