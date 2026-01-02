import { useEffect, useRef } from "react";
import { useGameStore } from "../store/gameStore";
import type { keyboardState } from "./useKeyboardInput";

export const usePlayerPhysics = (keyboardState: React.RefObject<keyboardState>) => {
  const hasJumped = useRef(false);
  
  useEffect(() => {
    let animationFrameId: number;
    
    const physicsLoop = () => {
      const state = useGameStore.getState();
      const { player, config } = state;
      
      // Early exit if player is dead
      if (player.isDead) {
        animationFrameId = requestAnimationFrame(physicsLoop);
        return;
      }
      
      const keys = keyboardState.current;
      if (!keys) {
        animationFrameId = requestAnimationFrame(physicsLoop);
        return;
      }
      
      let newVelocityX = player.velocityX;
      let newVelocityY = player.velocityY;
      let newX = player.x;
      let newY = player.y;
      let newIsGrounded = false;
      let newIsJumping = player.isJumping;
      
      // Horizontal movement
      if (keys.left) {
        newVelocityX = -config.moveSpeed;
      } else if (keys.right) {
        newVelocityX = config.moveSpeed;
      } else {
        newVelocityX *= config.friction;
        // Clamp tiny values to zero so we stop updating the store forever
        if (Math.abs(newVelocityX) < 0.01) {
          newVelocityX = 0;
        }
      }
      
      // Jump logic
      if (keys.jump && player.isGrounded && !hasJumped.current) {
        newVelocityY = config.jumpForce;
        newIsGrounded = false;
        newIsJumping = true;
        hasJumped.current = true;
      }
      
      // Reset jump flag when key released
      if (!keys.jump) {
        hasJumped.current = false;
      }
      
      // Apply gravity
      newVelocityY += config.gravity;
      
      // Update position
      newX += newVelocityX;
      newY += newVelocityY;
      
      // Ground collision
      const groundY = config.height - config.playerSize;
      if (newY >= groundY) {
        newY = groundY;
        newVelocityY = 0;
        newIsGrounded = true;
        newIsJumping = false;
      }
      
      // Wall collision
      if (newX < 0) {
        newX = 0;
        newVelocityX = 0;
      }
      if (newX > config.width - config.playerSize) {
        newX = config.width - config.playerSize;
        newVelocityX = 0;
      }
      
      // If nothing changed, skip the store update to avoid needless re-renders
      const positionChanged = newX !== player.x || newY !== player.y;
      const velocityChanged = newVelocityX !== player.velocityX || newVelocityY !== player.velocityY;
      const statusChanged = newIsGrounded !== player.isGrounded || newIsJumping !== player.isJumping;

      if (positionChanged || velocityChanged || statusChanged) {
        state.updatePlayer({
          x: newX,
          y: newY,
          velocityX: newVelocityX,
          velocityY: newVelocityY,
          isGrounded: newIsGrounded,
          isJumping: newIsJumping,
        });
      }
      
      animationFrameId = requestAnimationFrame(physicsLoop);
    };
    
    animationFrameId = requestAnimationFrame(physicsLoop);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [keyboardState]); // ← EMPTY! keyboardState è un ref stabile
};
