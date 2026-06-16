'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-[32px] bg-[#F0EEED]">
        <Image
          src={activeImage}
          alt={name}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((img) => (
          <button
            key={img}
            onClick={() => setActiveImage(img)}
            type="button"
            className={`relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 transition-all ${
              activeImage === img ? 'ring-2 ring-black' : 'hover:opacity-80'
            }`}
          >
            <Image
              src={img}
              fill
              alt={`${name} thumbnail`}
              className="object-cover"
              sizes="15vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
