import { create } from "zustand";
import type { GameConfig, PlayerState } from "../types/game.types";
import { persist, createJSONStorage } from 'zustand/middleware'

// Define the shape of the game store
interface GameStore {
    player: PlayerState;
    config: GameConfig;

    updatePlayer: (newState: Partial<PlayerState>) => void;
    resetPlayer: () => void;
    updateConfig: (newConfig: Partial<GameConfig>) => void;
    killPlayer: () => void;
}

// Default values for the game store
const DEFAULT_CONFIG: GameConfig = {
    width: 800, 
    height: 750, 
    gravity: 0.8,
    friction: 0.85,
    jumpForce: -15,
    moveSpeed: 5,
    playerSize: 30,
}

// Default player state
const DEFAULT_PLAYER: PlayerState = {
    x: 100,
    y: 500,
    velocityX: 0,
    velocityY: 0,
    isGrounded: false,
    isJumping: false,
    isDead: false,
    color: '#3B82F6', // default color
}

/** Add persistence middleware to the store
 * Stores player state in sessionStorage to survive page reloads
 */

/****************** */
//******* TODO => need to implement hook useClearStorage to use it in different scenarios (on game over, new level, player death, etc)
/****************** */

// Create the game store using Zustand
export const useGameStore = create<GameStore>()(persist((set) => ({
    player: { ...DEFAULT_PLAYER },
    config: { ...DEFAULT_CONFIG },

    updatePlayer: (newState) => set((state) => ({
        player: { ...state.player, ...newState }
    })),

    resetPlayer: () => set(() => ({
        player: { ...DEFAULT_PLAYER }
    })),

    updateConfig: (newConfig) => set((state) => ({
        config: { ...state.config, ...newConfig }
    })),

    killPlayer: () => set((state) => ({
        player: { ...state.player, isDead: true, velocityY: -10 }
    })),
}), {
    name: "player-store",
    storage: createJSONStorage(() => sessionStorage),
}));