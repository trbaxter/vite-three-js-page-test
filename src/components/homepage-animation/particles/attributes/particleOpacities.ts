import { particleConfig } from '@components/homepage-animation/particles/initialization/initializeParticles.ts';

/**
 * Generates a random opacity value based on the color's opacity configuration.
 * @param colorIndex Index of the color in particleConfig.colorOptions.
 * @returns Random opacity value within the specified range.
 */
function getRandomOpacityForColor(colorIndex: number): number {
  const colorConfig = particleConfig.colorOptions[colorIndex];
  return colorConfig.opacity * (0.8 + Math.random() * 0.4); // Add some randomness
}

/**
 * Generates an initial array of particle opacities based on color configurations.
 * @returns Float32Array containing the initial opacities.
 */
export function particleOpacities(): Float32Array {
  const count = particleConfig.particleCount; // Dynamically retrieve particle count
  const opacities = new Float32Array(count);

  const colorOptions = particleConfig.colorOptions;

  for (let i = 0; i < count; i++) {
    const randomColorIndex = Math.floor(Math.random() * colorOptions.length);
    opacities[i] = getRandomOpacityForColor(randomColorIndex);
  }

  return opacities;
}

/**
 * Updates the opacities of particles in an existing Float32Array based on color configurations.
 * @param opacitiesArray The existing Float32Array to update.
 * @returns Updated Float32Array with new opacities.
 */
export function updateParticleOpacities(opacitiesArray: Float32Array): Float32Array {
  const count = particleConfig.particleCount; // Dynamically retrieve particle count

  if (opacitiesArray.length !== count) {
    throw new Error('The size of opacitiesArray must match the particle count.');
  }

  const colorOptions = particleConfig.colorOptions;

  for (let i = 0; i < count; i++) {
    const randomColorIndex = Math.floor(Math.random() * colorOptions.length);
    opacitiesArray[i] = getRandomOpacityForColor(randomColorIndex);
  }

  return opacitiesArray;
}