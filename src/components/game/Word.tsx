import { useRef } from 'react';
import type { Word as WordType, Platform } from '../../types/game.types';
import { useWordAnimation } from '../../hooks/useWordAnimation';

interface WordProps {
  word: WordType;
  platform: Platform;
  gameWidth: number;
  gameHeight: number;
}

export const Word = ({ word, platform, gameWidth, gameHeight }: WordProps) => {
  const wordRef = useRef<HTMLDivElement | null>(null);
  
  // Calculate platform position
  const platformX = (platform.x / 100) * gameWidth;
  const platformY = (platform.y / 100) * gameHeight;
  const platformWidth = (platform.width / 100) * gameWidth;
  
  // Position word centered on platform, above it
  const wordX = platformX + platformWidth / 2;
  const wordY = platformY - 35;
  
  // Apply animation based on type
  useWordAnimation(wordRef, word.text, word.animationType, word.activated, word.color);
  
  // Split text into letters for physics2d and flip animations
  const letters = word.text.split('').map((char, i) => (
    <span
      key={i}
      className="letter"
      style={{
        display: 'inline-block',
        transformStyle: 'preserve-3d',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
  
  return (
    <div
      ref={wordRef}
      className="absolute font-bold pointer-events-none select-none"
      style={{
        left: `${wordX}px`,
        top: `${wordY}px`,
        fontSize: `${word.fontSize}px`,
        color: word.color,
        transform: 'translateX(-50%)',
        textShadow: word.activated
          ? `0 0 30px ${word.color}, 0 0 60px ${word.color}, 0 4px 12px rgba(0,0,0,0.8)`
          : `0 2px 10px rgba(0,0,0,0.9)`,
        filter: word.activated 
          ? `drop-shadow(0 0 20px ${word.color})` 
          : 'brightness(1)',
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        willChange: 'transform, filter',
      }}
    >
      {word.animationType === 'scramble' ? word.text : letters}
    </div>
  );
};