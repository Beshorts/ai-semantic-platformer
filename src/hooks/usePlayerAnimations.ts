import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { PlayerState } from '../types/game.types';

// Register useGSAP plugin
gsap.registerPlugin(useGSAP);

/**
 * Hook to manage all GSAP animations for the player
 * Uses useGSAP for automatic cleanup and optimal performance
 * @param elementRef - Reference to player DOM element
 * @param player - Current player state
 */
export const usePlayerAnimations = (
  elementRef: React.RefObject<HTMLDivElement | null>,
  player: PlayerState
) => {
  const previousState = useRef({
    isGrounded: player.isGrounded,
    velocityX: 0,
    isDead: false,
  });

  // Single useGSAP hook for ALL animations
  useGSAP(
    () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const prev = previousState.current;

      // LANDING ANIMATION (squash & stretch)
      const justLanded = !prev.isGrounded && player.isGrounded;
      if (justLanded) {
        gsap.killTweensOf(element, 'scaleY,scaleX');
        
        gsap.timeline()
          .to(element, {
            scaleY: 0.6,
            scaleX: 1.4,
            duration: 0.1,
            ease: 'power2.out',
          })
          .to(element, {
            scaleY: 1,
            scaleX: 1,
            duration: 0.3,
            ease: 'elastic.out(1, 0.3)',
          });
      }

      // JUMP ANIMATION (stretch upward)
      if (player.isJumping && !player.isGrounded && prev.isGrounded) {
        gsap.killTweensOf(element, 'scaleY,scaleX');
        
        gsap.to(element, {
          scaleY: 1.3,
          scaleX: 0.7,
          duration: 0.15,
          ease: 'power2.out',
        });
      }

      // MOVEMENT TILT ANIMATION
      const velocityChanged = Math.abs(player.velocityX - prev.velocityX) > 0.1;
      if (velocityChanged) {
        const tiltAmount = Math.sign(player.velocityX) * 8;
        const shouldTilt = Math.abs(player.velocityX) > 0.1;
        
        gsap.to(element, {
          rotation: shouldTilt ? tiltAmount : 0,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      // DEATH ANIMATION
      if (player.isDead && !prev.isDead) {
        gsap.killTweensOf(element);
        
        gsap.to(element, {
          rotation: 180,
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.in',
        });
      }

      // Update previous state
      previousState.current = {
        isGrounded: player.isGrounded,
        velocityX: player.velocityX,
        isDead: player.isDead,
      };
      console.log("Animations Hook Triggered",previousState.current.velocityX, player);
    },
    {
      scope: elementRef,
      dependencies: [player.isGrounded, player.isJumping, player.velocityX, player.isDead],
      revertOnUpdate: false, // Don't revert animations on every update
    }
  );

};