import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(useGSAP, TextPlugin, CustomEase);

// Custom ease for organic scramble timing
CustomEase.create('scrambleEase', 'M0,0 C0.25,0.1 0.3,0.3 0.5,0.5 0.7,0.7 0.75,0.9 1,1');

export const useWordScrambleAnimation = (
 elementRef: React.RefObject<HTMLDivElement | null>,
  originalText: string,
  activated: boolean,
  enabled: boolean,
  color: string
) => {
  const hasActivated = useRef(false);
  
  useGSAP(() => {
    if (!enabled || !elementRef.current || hasActivated.current) return;
    
    if (activated) {
      hasActivated.current = true;
      
      const element = elementRef.current;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?';
      const timeline = gsap.timeline();
      
      // Initial flash
      timeline.to(element, {
        scale: 1.3,
        duration: 0.1,
        ease: 'power2.out',
      });
      
      // Scramble sequence with progressive glow
      const iterations = 20;
      for (let i = 0; i < iterations; i++) {
        const scrambled = originalText
          .split('')
          .map((char) => {
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        const glowIntensity = (i / iterations) * 30;
        
        timeline.to(element, {
          text: { value: scrambled, delimiter: '' },
          duration: 0.04,
          ease: 'none',
          onUpdate: () => {
            element.style.filter = `drop-shadow(0 0 ${glowIntensity}px ${color}) brightness(${1 + i / iterations})`;
          },
        }, i * 0.04);
      }
      
      // Resolve to original with elastic settle
      timeline.to(element, {
        text: { value: originalText, delimiter: '' },
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.6)',
      });
      
      // Final glow pulse
      timeline.to(element, {
        filter: `drop-shadow(0 0 40px ${color}) brightness(1.8)`,
        duration: 0.3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 1,
      });
    }
  }, {
    dependencies: [activated, enabled],
    scope: elementRef,
  });
};
