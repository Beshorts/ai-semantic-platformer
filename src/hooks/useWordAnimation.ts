import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import type { WordAnimationType } from '../types/game.types';
import { useWordScrambleAnimation } from './useWordScrambleAnimation';
import { useWordPhysics2DAnimation } from './useWordPhysic2DAnimation';
import { useWordFlipAnimation } from './useWordFlipAnimation';

// Register useGSAP
gsap.registerPlugin(useGSAP);

export const useWordAnimation = (
  elementRef: React.RefObject<HTMLDivElement | null>,
  originalText: string,
  animationType: WordAnimationType,
  activated: boolean,
  color: string
) => {
  // Idle floating animation (same for all, but with subtle glow)
  useGSAP(() => {
    if (!elementRef.current || activated) return;
    
    const timeline = gsap.timeline({ repeat: -1 });
    
    timeline
      .to(elementRef.current, {
        y: -8,
        filter: `drop-shadow(0 0 8px ${color}) brightness(1.1)`,
        duration: 2,
        ease: 'sine.inOut',
      })
      .to(elementRef.current, {
        y: 0,
        filter: `drop-shadow(0 0 4px ${color}) brightness(1)`,
        duration: 2,
        ease: 'sine.inOut',
      });
  }, {
    dependencies: [activated],
    scope: elementRef,
  });
  
  // Call ALL hooks unconditionally with enabled flag
  useWordScrambleAnimation(
    elementRef,
    originalText,
    activated,
    animationType === 'scramble',
    color
  );
  
  useWordPhysics2DAnimation(
    elementRef,
    activated,
    animationType === 'physics2d',
    color
  );
  
  useWordFlipAnimation(
    elementRef,
    activated,
    animationType === 'flip',
    color
  );
};
