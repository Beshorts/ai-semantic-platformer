import { Player } from './Player';
import { useGameStore } from '../../store/gameStore';
import { useKeyboardInput } from '../../hooks/useKeyboardInput';
import { usePlayerPhysics } from '../../hooks/usePlayerPhysics';

export const GameCanvas = () => {
  // ✅ keep the individual selectors for performance to not re-render every 60fps
  const config = useGameStore((state) => state.config);
  const isDead = useGameStore((state) => state.player.isDead);
  
  console.log("WOW",config )
  // Setup game logic hooks
  const keyboardState = useKeyboardInput(!isDead);
  usePlayerPhysics(keyboardState);
  
  return (
    <div
      style={{
        position: 'relative',
        width: `${config.width}px`,
        height: `${config.height}px`,
        backgroundColor: '#1a1a1a',
        overflow: 'hidden',
        margin: '0 auto',
      }}
    >
      <Player />
    </div>
  );
};