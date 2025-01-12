import { defaultAnimationConfig } from '../config/animationConfig';

/**
 * Generates a random size for a particle based on the configured size range in defaultAnimationConfig.
 * @returns A random particle size.
 */
function generateRandomSize(): number {
  const { minSize, maxSize } = defaultAnimationConfig.size;
  return minSize + Math.random() * (maxSize - minSize);
}

/**
 * Generates an array of initial particle sizes based on defaultAnimationConfig.
 * @returns Float32Array containing the initial sizes.
 */
export function particleSizes(): Float32Array {
  const { particleCount } = defaultAnimationConfig;
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    sizes[i] = generateRandomSize();
  }

  return sizes;
}

/**
 * Updates the sizes of particles in an existing Float32Array based on defaultAnimationConfig.
 * @param sizesArray The existing Float32Array to update.
 */
export function updateParticleSizes(sizesArray: Float32Array): void {
  const { size } = defaultAnimationConfig;

  for (let i = 0; i < sizesArray.length; i++) {
    sizesArray[i] = size.minSize + Math.random() * (size.maxSize - size.minSize);
  }
}
