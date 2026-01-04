import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { Star as StarType } from '../../types/game.types';

interface StarProps {
  star: StarType;
  gameWidth: number;
  gameHeight: number;
}

export const Star = ({ star, gameWidth, gameHeight }: StarProps) => {
  const starRef = useRef<HTMLDivElement | null>(null);
  const previousCollected = useRef(star.collected);
  
  // Convert percentage to pixels
  const x = (star.x / 100) * gameWidth;
  const y = (star.y / 100) * gameHeight;
  const size = 20; // 20x20px
  
  // Entrance animation
  useGSAP(() => {
    if (!starRef.current) return;
    
    gsap.from(starRef.current, {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      delay: 0.3,
    });
  }, {
    scope: starRef,
  });
  
  // Idle animation (rotate + pulse)
  useGSAP(() => {
    if (!starRef.current || star.collected) return;
    
    const timeline = gsap.timeline({ repeat: -1 });
    
    timeline
      .to(starRef.current, {
        rotation: 360,
        duration: 3,
        ease: 'none',
      }, 0)
      .to(starRef.current, {
        scale: 1.2,
        filter: 'drop-shadow(0 0 12px #FCD34D) brightness(1.3)',
        duration: 1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      }, 0);
  }, {
    dependencies: [star.collected],
    scope: starRef,
  });
  
  // Collection animation
  useEffect(() => {
    if (!starRef.current) return;
    
    const justCollected = !previousCollected.current && star.collected;
    
    if (justCollected) {
      gsap.killTweensOf(starRef.current);
      
      gsap.to(starRef.current, {
        scale: 0,
        opacity: 0,
        rotation: 720,
        duration: 0.4,
        ease: 'back.in(2)',
      });
    }
    
    previousCollected.current = star.collected;
  }, [star.collected]);
  
  if (star.collected) return null;
  
  return (
    <div
      ref={starRef}
      className="absolute pointer-events-none"
      style={{
        left: `${x - size / 2}px`,
        top: `${y - size / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="#FCD34D"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 0 8px #FCD34D)',
        }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </div>
  );
};