'use client';
import { animate, motion, useMotionValue } from 'motion/react';
import { useState } from 'react';

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  return (
    <motion.span
      onViewportEnter={() =>
        animate(count, value, {
          duration: 2.5,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
        })
      }
      viewport={{ once: true }}
      className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold"
    >
      {display}
      {suffix}
    </motion.span>
  );
}

export function BrandsSpan() {
  return (
    <>
      <Counter value={200} suffix="+" />
      <span className="text-[#616060] text-xs lg:text-base">
        International Brands
      </span>
    </>
  );
}

export function ProductsSpan() {
  return (
    <>
      <Counter value={2000} suffix="+" />
      <span className="text-[#616060] text-xs lg:text-base">
        High-Quality Products
      </span>
    </>
  );
}

export function CustomersSpan() {
  return (
    <>
      <Counter value={30000} suffix="+" />
      <span className="text-[#616060] text-xs lg:text-base">
        Happy Customers
      </span>
    </>
  );
}
