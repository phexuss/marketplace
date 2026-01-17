'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link
        href="/sign-up"
        className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );
}
