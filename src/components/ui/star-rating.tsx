import { Star } from 'lucide-react';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = rating >= star;
          const isHalf = !isFull && rating >= star - 0.5;

          return (
            <div key={star} className="relative">
              <Star size={16} className="text-neutral-300" strokeWidth={1.5} />
              <div
                className="absolute inset-0 overflow-hidden text-yellow-400"
                style={{ width: isFull ? '100%' : isHalf ? '50%' : '0%' }}
              >
                <Star size={16} fill="currentColor" strokeWidth={1.5} />
              </div>
            </div>
          );
        })}
      </div>

      <span className="text-sm font-bold text-black whitespace-nowrap">
        {rating.toFixed(1)}
        <span className="text-neutral-600 font-medium">/5</span>
      </span>
    </div>
  );
};

export default StarRating;
