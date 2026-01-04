import { Player } from "./Player";
import { useGameStore } from "../../store/gameStore";
import { useKeyboardInput } from "../../hooks/useKeyboardInput";
import { usePlayerPhysics } from "../../hooks/usePlayerPhysics";
import { Platform } from "./Platform";
import { GameHUD } from "./GameHUD";
import { useWordActivation } from "../../hooks/useWordActivation";
import { Word } from "./Word";
import { useStarCollection } from "../../hooks/useStarCollection";
import { Star } from "./Star";

export const GameCanvas = () => {
  // ✅ keep the individual selectors for performance to not re-render every 60fps
  const config = useGameStore((state) => state.config);
  const isDead = useGameStore((state) => state.player.isDead);

  const currentLevel = useGameStore((state) => state.currentLevel);
  const theme = currentLevel?.theme;

  // Setup game logic hooks
  const keyboardState = useKeyboardInput(!isDead);
  usePlayerPhysics(keyboardState);
   useWordActivation(); // Check word activation
   useStarCollection(); // Check star collection

  return (
    <div
      className="relative overflow-hidden mx-auto shadow-2xl"
      style={{
        width: `${config.width}px`,
        height: `${config.height}px`,
        backgroundColor: theme?.backgroundColor || '#1a1a1a',
      }}
    >
        {/* HUD overlay */}
        <GameHUD />
      {/* Render platforms */}
      {currentLevel?.platforms.map((platform) => (
        <Platform
          key={platform.id}
          platform={platform}
          gameWidth={config.width}
          gameHeight={config.height}
        />
      ))}

      {/* Render words */}
      {currentLevel?.words.map((word) => {
        const platform = currentLevel.platforms.find(
          (p) => p.id === word.platformId
        );
        if (!platform) return null;
        
        return (
          <Word
            key={word.id}
            word={word}
            platform={platform}
            gameWidth={config.width}
            gameHeight={config.height}
          />
        );
      })}
       {/* Render stars */}
      {currentLevel?.collectibles.stars.map((star) => (
        <Star
          key={star.id}
          star={star}
          gameWidth={config.width}
          gameHeight={config.height}
        />
      ))}
      {/* Player */}
      <Player />
      
      {/* Temporary ground indicator - remove later */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700/30" />
    </div>
  );
};
