

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

export interface GameConfig {
    width: number;
    height: number;
    gravity: number;
    friction: number;
    jumpForce: number;
    moveSpeed: number;
    playerSize: number;
}

export type PlayerAnimateEvent = 'idle' | 'land' | 'jump' | 'move'| 'dead' | 'damage' | 'collect';