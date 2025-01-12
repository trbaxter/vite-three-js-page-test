import { defaultAnimationConfig } from '../config/animationConfig';

/**
 * Generates a random opacity value based on the color's opacity configuration.
 * @param colorOptions Array of color options with opacity values.
 * @returns A random opacity value based on the selected color option.
 */
function getRandomOpacityForColor(colorOptions: Array<{ opacity: number }>): number {
  const randomColorIndex = Math.floor(Math.random() * colorOptions.length);
  const colorConfig = colorOptions[randomColorIndex];
  return colorConfig.opacity * (0.8 + Math.random() * 0.4); // Add randomness to opacity
}

/**
 * Generates an initial array of particle opacities based on defaultAnimationConfig.
 * @returns Float32Array containing the initial opacities.
 */
export function particleOpacities(): Float32Array {
  const { particleCount, colorOptions } = defaultAnimationConfig;
  const opacities = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    opacities[i] = getRandomOpacityForColor(colorOptions);
  }

  return opacities;
}

/**
 * Updates the opacities of particles in an existing Float32Array based on defaultAnimationConfig.
 * @param opacitiesArray The existing Float32Array to update.
 */
export function updateParticleOpacities(opacitiesArray: Float32Array): void {
  const { particleCount, colorOptions } = defaultAnimationConfig;

  if (opacitiesArray.length !== particleCount) {
    throw new Error('The size of opacitiesArray must match the particle count.');
  }

  for (let i = 0; i < particleCount; i++) {
    opacitiesArray[i] = getRandomOpacityForColor(colorOptions);
  }
}
