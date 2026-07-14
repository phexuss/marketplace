import { animate, arc } from 'motion';

export async function flyToCart(imageSrc: string, startElement: HTMLElement) {
  const cartIcon = document.querySelector('[data-cart-target="true"]');

  if (!cartIcon || !startElement) return;

  const cartRect = cartIcon.getBoundingClientRect();
  const startRect = startElement.getBoundingClientRect();

  const startSize = 96;
  const targetSize = 16;
  const targetScale = targetSize / startSize;

  const startX = startRect.left + startRect.width / 2 - startSize / 2;
  const startY = startRect.top + startRect.height / 2 - startSize / 2;

  const endX = cartRect.left + cartRect.width / 2 - startSize / 2;
  const endY = cartRect.top + cartRect.height / 2 - startSize / 2;

  const deltaX = endX - startX;
  const deltaY = endY - startY;

  const clone = document.createElement('img');
  clone.src = imageSrc;

  Object.assign(clone.style, {
    position: 'fixed',
    left: `${startX}px`,
    top: `${startY}px`,
    width: `${startSize}px`,
    height: `${startSize}px`,
    borderRadius: '24px',
    objectFit: 'cover',
    boxShadow: '0 24px 48px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.05)',
    zIndex: '9999',
    pointerEvents: 'none',
    transform: 'scale(0.3) translateY(30px)',
    opacity: '0',
  });

  document.body.appendChild(clone);

  await animate(
    clone,
    { scale: [0.3, 1.15], opacity: [0, 1], y: [30, -40] },
    { duration: 0.2, type: 'spring', bounce: 0.5, visualDuration: 0.2 },
  );

  await animate(
    clone,
    {
      x: [0, deltaX],
      y: [-40, deltaY],
      scale: [1.15, targetScale],
      opacity: [1, 0.4],
    },
    {
      duration: 0.45,
      type: 'spring',
      bounce: 0.1,
      visualDuration: 0.45,
      path: arc({ strength: 0.45, rotate: true, direction: 'cw' }),
    },
  );

  clone.remove();

  animate(
    cartIcon,
    { scale: [1.35, 1], rotate: [-15, 0] },
    { type: 'spring', bounce: 0.6, duration: 0.5 },
  );
}
