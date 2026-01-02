import { useEffect, useRef } from "react";


export type keyboardState = {
    left: boolean;
    right: boolean;
    jump: boolean;
}

/**
 * Custom hook to manage keyboard input for player movement.
 * @param enabled - if false, the hook will not listen to keyboard events.
 * @returns An object representing the current state of keyboard inputs.
 */

export const useKeyboardInput = (enabled: boolean = true) => {
    const keysPressed = useRef<Set<string>>(new Set());
    const stateRef = useRef<keyboardState>({
        left: false,
        right: false,
        jump: false,
    });

    useEffect(() => {
        if (!enabled) return;
        
        const handleKeyDown = (event: KeyboardEvent) => {
            keysPressed.current.add(event.key);

      if (event.key === 'ArrowLeft') stateRef.current.left = true;
      if (event.key === 'ArrowRight') stateRef.current.right = true;
      if (event.key === ' ' || event.key === 'ArrowUp') stateRef.current.jump = true;
        };

   const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
      
      if (e.key === 'ArrowLeft') stateRef.current.left = false;
      if (e.key === 'ArrowRight') stateRef.current.right = false;
      if (e.key === ' ' || e.key === 'ArrowUp') stateRef.current.jump = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enabled]);
  
  return stateRef;
};