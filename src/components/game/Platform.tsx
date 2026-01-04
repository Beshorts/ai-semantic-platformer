import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { Platform as PlatformType } from '../../types/game.types';

interface PlatformProps {
  platform: PlatformType;
  gameWidth: number;
  gameHeight: number;
}

export const Platform = ({ platform, gameWidth, gameHeight }: PlatformProps) => {
  const platformRef = useRef<HTMLDivElement>(null);
  
  // Convert percentage to pixels
  const x = (platform.x / 100) * gameWidth;
  const y = (platform.y / 100) * gameHeight;
  const width = (platform.width / 100) * gameWidth;
  const height = platform.height * 2; // exaggerate height for better visibility
  
  // Entrance animation
  useGSAP(() => {
    if (!platformRef.current) return;
    
    gsap.from(platformRef.current, {
      scaleX: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      delay: 0.1,
    });
  }, {
    scope: platformRef,
  });
  
  // Build gradient style
  const backgroundStyle = platform.gradient
    ? {
        background: `linear-gradient(${platform.gradient.direction === 'to-b' ? '180deg' : 
                     platform.gradient.direction === 'to-t' ? '0deg' :
                     platform.gradient.direction === 'to-r' ? '90deg' : '270deg'}, 
                     ${platform.gradient.from} 0%, ${platform.gradient.to} 100%)`,
      }
    : {
        backgroundColor: platform.color,
      };
  
  return (
    <div
      ref={platformRef}
      data-platform-id={platform.id}
      className="absolute rounded shadow-lg border-2 border-white/20"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        ...backgroundStyle,
        transformOrigin: 'center center',
      }}
    />
  );
};