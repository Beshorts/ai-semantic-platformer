import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

/**
 * Hook to check and activate words when player walks on their platform
 */
export const useWordActivation = () => {
  useEffect(() => {
    const checkWordActivation = () => {
      const state = useGameStore.getState();
      const { player, config, currentLevel } = state;
      
      if (!currentLevel || player.isDead) return;
      
      // Check each word
      currentLevel.words.forEach((word) => {
        if (word.activated) return; // Already activated
        
        // Find the word's platform
        const platform = currentLevel.platforms.find(
          (p) => p.id === word.platformId
        );
        
        if (!platform) return;
        
        // Convert platform position to pixels
        const platformX = (platform.x / 100) * config.width;
        const platformY = (platform.y / 100) * config.height;
        const platformWidth = (platform.width / 100) * config.width;
        const platformHeight = platform.height;
        
        // Check if player is on this platform
        const playerOnPlatform =
          player.x + config.playerSize > platformX &&
          player.x < platformX + platformWidth &&
          player.y + config.playerSize >= platformY - 5 &&
          player.y + config.playerSize <= platformY + platformHeight + 5 &&
          player.isGrounded;
        
        if (playerOnPlatform) {
          state.activateWord(word.id);
        }
      });
    };
    
    // Check on interval (60fps would be overkill, 20fps is enough)
    const interval = setInterval(checkWordActivation, 50);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
};