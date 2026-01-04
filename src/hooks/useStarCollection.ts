import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

/**
 * Hook to check and collect stars when player touches them
 */
export const useStarCollection = () => {
  useEffect(() => {
    const checkStarCollection = () => {
      const state = useGameStore.getState();
      const { player, config, currentLevel } = state;
      
      if (!currentLevel || player.isDead) return;
      
      // Check each star
      currentLevel.collectibles.stars.forEach((star) => {
        if (star.collected) return;
        
        // Convert star position to pixels
        const starX = (star.x / 100) * config.width;
        const starY = (star.y / 100) * config.height;
        const starSize = 20;
        
        // Simple AABB collision
        const playerBox = {
          x: player.x,
          y: player.y,
          width: config.playerSize,
          height: config.playerSize,
        };
        
        const starBox = {
          x: starX - starSize / 2,
          y: starY - starSize / 2,
          width: starSize,
          height: starSize,
        };
        
        const colliding =
          playerBox.x < starBox.x + starBox.width &&
          playerBox.x + playerBox.width > starBox.x &&
          playerBox.y < starBox.y + starBox.height &&
          playerBox.y + playerBox.height > starBox.y;
        
        if (colliding) {
          state.collectStar(star.id);
        }
      });
    };
    
    // Check on interval (60fps would be fine, but 30fps is enough)
    const interval = setInterval(checkStarCollection, 33);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
};