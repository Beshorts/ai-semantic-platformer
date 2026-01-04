import type { PlayerState, Platform } from '../types/game.types';

export interface CollisionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const VERTICAL_TOLERANCE = 10;

/**
 * Check AABB collision between two boxes
 */
export const checkAABBCollision = (a: CollisionBox, b: CollisionBox): boolean => {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
};

/**
 * Check if player is landing on top of a platform
 */
export const checkPlatformCollision = (
  player: PlayerState,
  playerSize: number,
  platform: Platform,
  gameWidth: number,
  gameHeight: number
): { colliding: boolean; platformTop: number } => {
  // Convert platform percentage to pixels
  const platformX = (platform.x / 100) * gameWidth;
  const platformY = (platform.y / 100) * gameHeight;
  const platformWidth = (platform.width / 100) * gameWidth;
  const platformHeight = platform.height;

  const playerBox: CollisionBox = {
    x: player.x,
    y: player.y,
    width: playerSize,
    height: playerSize,
  };

  const platformBox: CollisionBox = {
    x: platformX,
    y: platformY,
    width: platformWidth,
    height: platformHeight,
  };

  // Only consider collisions when falling toward the platform
  const isFalling = player.velocityY >= 0;
  if (!isFalling) {
    return { colliding: false, platformTop: platformY };
  }

  const playerFeet = playerBox.y + playerBox.height;
  const isAbovePlatform = playerFeet <= platformY + VERTICAL_TOLERANCE;

  // Check horizontal overlap
  const horizontalOverlap =
    playerBox.x + playerBox.width > platformBox.x &&
    playerBox.x < platformBox.x + platformBox.width;

  if (!horizontalOverlap || !isAbovePlatform) {
    return { colliding: false, platformTop: platformY };
  }

  // Check if player feet are within the platform's vertical bounds
  const feetAtPlatformTop =
    playerFeet >= platformY &&
    playerFeet <= platformY + platformHeight + VERTICAL_TOLERANCE;

  const colliding = isAbovePlatform && horizontalOverlap && feetAtPlatformTop;

  return {
    colliding,
    platformTop: platformY,
  };
};

/**
 * Find which platform (if any) the player is standing on
 */
export const findGroundedPlatform = (
  player: PlayerState,
  playerSize: number,
  platforms: Platform[],
  gameWidth: number,
  gameHeight: number
): { platform: Platform | null; platformTop: number } => {
  for (const platform of platforms) {
    const collision = checkPlatformCollision(
      player,
      playerSize,
      platform,
      gameWidth,
      gameHeight
    );
    
    if (collision.colliding) {
      return { platform, platformTop: collision.platformTop };
    }
  }
  
  return { platform: null, platformTop: 0 };
};
