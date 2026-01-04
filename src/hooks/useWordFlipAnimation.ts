import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(useGSAP, CustomEase);

// Custom ease for smooth flip
CustomEase.create('flipEase', 'M0,0 C0.25,0.46 0.45,0.94 1,1');

export const useWordFlipAnimation = (
   elementRef: React.RefObject<HTMLDivElement | null>,
  activated: boolean,
  enabled: boolean,
  color: string
) => {
  const hasActivated = useRef(false);
  
  useGSAP(() => {
    if (!enabled || !elementRef.current || hasActivated.current) return;
    
    if (activated) {
      hasActivated.current = true;
      
      const letters = elementRef.current.querySelectorAll('.letter');
      const timeline = gsap.timeline();
      
      // Wave-like flip with glow trail
      timeline.to(letters, {
        rotationY: 360,
        z: (i) => Math.sin(i * 0.5) * 100,
        scale: 1.5,
        filter: (i) => `drop-shadow(0 0 ${20 + i * 3}px ${color}) brightness(1.5)`,
        duration: 0.8,
        ease: 'flipEase',
        stagger: {
          amount: 0.3,
          ease: 'power1.inOut',
        },
      });
      
      // Settle back with elastic bounce
      timeline.to(letters, {
        rotationY: 360,
        z: 0,
        scale: 1,
        filter: `drop-shadow(0 0 25px ${color})`,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
        stagger: {
          amount: 0.1,
        },
      }, '-=0.3');
      
      // Pulse glow
      timeline.to(letters, {
        filter: `drop-shadow(0 0 40px ${color}) brightness(1.6)`,
        duration: 0.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: 2,
        stagger: 0.05,
      });
      
      // Final glow settle
      timeline.to(letters, {
        filter: `drop-shadow(0 0 20px ${color})`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, {
    dependencies: [activated, enabled],
    scope: elementRef,
  });
};