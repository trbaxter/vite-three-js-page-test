import { particleConfig } from '@components/homepage-animation/particles/initialization/initializeParticles.ts';

/**
 * Generates a random size for a particle based on the configured size range.
 * @returns A random particle size.
 */
function generateRandomSize(): number {
  const { minSize, maxSize } = particleConfig.size;
  return minSize + Math.random() * (maxSize - minSize);
}

/**
 * Generates an array of initial particle sizes.
 * @returns Float32Array containing the initial sizes.
 */
export function particleSizes(): Float32Array {
  const count = particleConfig.particleCount; // Dynamically retrieve particle count
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    sizes[i] = generateRandomSize();
  }

  return sizes;
}

/**
 * Updates the sizes of particles in an existing Float32Array.
 * @param sizesArray The existing Float32Array to update.
 * @returns Updated Float32Array containing new particle sizes.
 */
export function updateParticleSizes(sizesArray: Float32Array): Float32Array {
  const count = particleConfig.particleCount;

  if (sizesArray.length !== count) {
    throw new Error('The size of sizesArray must match the particle count.');
  }

  for (let i = 0; i < count; i++) {
    sizesArray[i] = generateRandomSize();
  }

  return sizesArray;
}
