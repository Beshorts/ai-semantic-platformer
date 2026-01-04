import { create } from 'zustand';
import type { PlayerState, GameConfig, GameLevel, GameProgress } from '../types/game.types';
import mockLevelData from '../mocks/mockLevel.json';

interface GameStore {
  // Existing player & config
  player: PlayerState;
  config: GameConfig;
  
  // NEW: Level data
  currentLevel: GameLevel | null;
  progress: GameProgress;
  
  // Existing actions
  updatePlayer: (updates: Partial<PlayerState>) => void;
  updateConfig: (updates: Partial<GameConfig>) => void;
  resetPlayer: () => void;
  killPlayer: () => void;
  
  // NEW: Level actions
  loadLevel: (level: GameLevel) => void;
  activateWord: (wordId: string) => void;
  collectStar: (starId: string) => void;
  checkWinCondition: () => void;
  resetLevel: () => void;
}

const DEFAULT_CONFIG: GameConfig = {
  width: 800,
  height: 600,
  gravity: 0.8,
  friction: 0.85,
  jumpForce: -15,
  moveSpeed: 5,
  playerSize: 40,
};

const DEFAULT_PLAYER: PlayerState = {
  x: 100,
  y: 500,
  velocityX: 0,
  velocityY: 0,
  isGrounded: false,
  isJumping: false,
  isDead: false,
  color: '#3B82F6',
};

/* const DEFAULT_PROGRESS: GameProgress = {
  wordsActivated: 0,
  totalWords: 0,
  starsCollected: 0,
  totalStars: 0,
  isComplete: false,
}; */

export const useGameStore = create<GameStore>((set, get) => ({
  player: { ...DEFAULT_PLAYER },
  config: { ...DEFAULT_CONFIG },
  currentLevel: mockLevelData as GameLevel,
  progress: {
    wordsActivated: 0,
    totalWords: (mockLevelData as GameLevel).words.length,
    starsCollected: 0,
    totalStars: (mockLevelData as GameLevel).collectibles.stars.length,
    isComplete: false,
  },
  
  updatePlayer: (updates) =>
    set((state) => ({
      player: { ...state.player, ...updates },
    })),
  
  updateConfig: (updates) =>
    set((state) => ({
      config: { ...state.config, ...updates },
    })),
  
  resetPlayer: () =>
    set(() => ({
      player: { ...DEFAULT_PLAYER },
    })),
  
  killPlayer: () =>
    set((state) => ({
      player: { ...state.player, isDead: true, velocityY: -10 },
    })),
  
  loadLevel: (level) => {
    set(() => ({
      currentLevel: level,
      progress: {
        wordsActivated: 0,
        totalWords: level.words.length,
        starsCollected: 0,
        totalStars: level.collectibles.stars.length,
        isComplete: false,
      },
    }));
  },
  
  activateWord: (wordId) => {
    set((state) => {
      if (!state.currentLevel) return state;
      
      const updatedWords = state.currentLevel.words.map((word) =>
        word.id === wordId ? { ...word, activated: true } : word
      );
      
      const wordsActivated = updatedWords.filter((w) => w.activated).length;
      
      return {
        currentLevel: {
          ...state.currentLevel,
          words: updatedWords,
        },
        progress: {
          ...state.progress,
          wordsActivated,
        },
      };
    });
    
    get().checkWinCondition();
  },
  
  collectStar: (starId) => {
    set((state) => {
      if (!state.currentLevel) return state;
      
      const updatedStars = state.currentLevel.collectibles.stars.map((star) =>
        star.id === starId ? { ...star, collected: true } : star
      );
      
      const starsCollected = updatedStars.filter((s) => s.collected).length;
      
      return {
        currentLevel: {
          ...state.currentLevel,
          collectibles: {
            ...state.currentLevel.collectibles,
            stars: updatedStars,
          },
        },
        progress: {
          ...state.progress,
          starsCollected,
        },
      };
    });
    
    get().checkWinCondition();
  },
  
  checkWinCondition: () => {
    const { progress, currentLevel, player } = get();
    
    if (!currentLevel) return;
    
    const allWordsActivated = progress.wordsActivated === progress.totalWords;
    const allStarsCollected = progress.starsCollected === progress.totalStars;
    
    // Check if player reached last platform (platform-5)
    const lastPlatform = currentLevel.platforms[currentLevel.platforms.length - 1];
    const lastPlatformX = (lastPlatform.x / 100) * 800;
    const lastPlatformY = (lastPlatform.y / 100) * 600;
    const lastPlatformWidth = (lastPlatform.width / 100) * 800;
    
    const onLastPlatform =
      player.x >= lastPlatformX &&
      player.x <= lastPlatformX + lastPlatformWidth &&
      player.y >= lastPlatformY - 50 &&
      player.y <= lastPlatformY + 50;
    
    if (allWordsActivated && allStarsCollected && onLastPlatform) {
      set((state) => ({
        progress: { ...state.progress, isComplete: true },
      }));
    }
  },
  
  resetLevel: () => {
    set(() => ({
      player: { ...DEFAULT_PLAYER },
      currentLevel: mockLevelData as GameLevel,
      progress: {
        wordsActivated: 0,
        totalWords: mockLevelData.words.length,
        starsCollected: 0,
        totalStars: mockLevelData.collectibles.stars.length,
        isComplete: false,
      },
    }));
  },
}));