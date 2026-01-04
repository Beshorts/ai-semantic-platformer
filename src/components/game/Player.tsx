import { useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { usePlayerAnimations } from '../../hooks/usePlayerAnimations';

/**
 * Player component - Handles ONLY the visual rendering
 * All logic is delegated to hooks
 */
export const Player = () => {
  const player = useGameStore((state) => state.player);
  const playerSize = useGameStore((state) => state.config.playerSize);
  const playerRef = useRef<HTMLDivElement>(null);
  
  // Apply animations
  usePlayerAnimations(playerRef, player);
  
  // keep inline style for performance: these change every frame and TailwindCSS  works in build-time only
  return (
    <div
      ref={playerRef}
      style={{
        position: 'absolute',
        left: `${player.x}px`,
        top: `${player.y}px`,
        width: `${playerSize}px`,
        height: `${playerSize}px`,
        backgroundColor: player.color,
        borderRadius: '4px',
        transition: 'left 0.05s linear, top 0.05s linear',
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
    />
    
  );
};