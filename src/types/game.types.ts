

/** PLAYER */
export interface PlayerState {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    isGrounded: boolean;
    isJumping: boolean;
    isDead: boolean;
    color: string; // dynamic AI value based on scene theme
}

export type PlayerAnimateEvent = 'idle' | 'land' | 'jump' | 'move'| 'dead' | 'damage' | 'collect';

export interface GameConfig {
    width: number;
    height: number;
    gravity: number;
    friction: number;
    jumpForce: number;
    moveSpeed: number;
    playerSize: number;
}



export interface Platform {
  id: string;
  x: number; // % relative to the platform
  y: number; // % relative to the platform
  width: number; // % relative to the platform
  height: number; // pixel
  color: string;
  gradient?: {
    from: string;
    to: string;
    direction: 'to-b' | 'to-t' | 'to-r' | 'to-l';
  };
}

export type WordAnimationType = 'scramble' | 'physics2d' | 'flip';

export interface Word {
  id: string;
  text: string;
  platformId: string;
  color: string;
  fontSize: number;
  activated: boolean;
  animationType: WordAnimationType;
}


export interface Star {
  id: string;
  x: number; // % relative to the platform 0-100
  y: number; // % relative to the platform 0-100
  collected: boolean; // runtime state
}

export interface GameLevel {
  id: string;
  theme: {
    name: string;
    backgroundColor: string;
    atmosphereColor?: string;
  };
  platforms: Platform[];
  words: Word[];
  collectibles: {
    stars: Star[];
  };
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameProgress {
  wordsActivated: number;
  totalWords: number;
  starsCollected: number;
  totalStars: number;
  isComplete: boolean;
}