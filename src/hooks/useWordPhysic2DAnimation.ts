import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(useGSAP, CustomEase);

// Custom ease for natural bounce
CustomEase.create('physicsEase', 'M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1');

export const useWordPhysics2DAnimation = (
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
      
      // Pre-explosion anticipation
      timeline.to(letters, {
        scale: 0.7,
        duration: 0.15,
        ease: 'power2.in',
      });
      
      // Explosion with physics
      timeline.to(letters, {
        y: (i) => gsap.utils.random(-120, -60) * (1 + i * 0.1),
        x: () => gsap.utils.random(-50, 50),
        rotation: () => gsap.utils.random(-360, 360),
        scale: () => gsap.utils.random(1.2, 1.8),
        opacity: 0.9,
        filter: `drop-shadow(0 0 ${gsap.utils.random(10, 20)}px ${color})`,
        duration: 0.7,
        ease: 'power2.out',
        stagger: {
          amount: 0.1,
          from: 'center',
        },
      });
      
      // Gravity pull back with trail effect
      timeline.to(letters, {
        y: 0,
        x: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        filter: `drop-shadow(0 0 30px ${color})`,
        duration: 1.2,
        ease: 'bounce.out',
        stagger: {
          amount: 0.15,
          from: 'edges',
        },
      }, '-=0.2');
      
      // Final settle with glow fade
      timeline.to(letters, {
        filter: `drop-shadow(0 0 15px ${color})`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, {
    dependencies: [activated, enabled],
    scope: elementRef,
  });
};