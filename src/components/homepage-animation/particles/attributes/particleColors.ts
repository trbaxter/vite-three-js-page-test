import { Color } from 'three';
import { defaultAnimationConfig } from '../config/animationConfig';

/**
 * Validates that the total percentage in defaultAnimationConfig.colorOptions equals 100% (1.0).
 * Throws an error if the sum is invalid.
 */
function validateColorOptions(): void {
  const totalPercentage = defaultAnimationConfig.colorOptions.reduce((sum, option) => sum + option.percentage, 0);

  if (Math.abs(totalPercentage - 1) > 0.001) {
    throw new Error(
      `Invalid color distribution: Total percentage must equal 100% (1.0). Current total: ${(totalPercentage * 100).toFixed(2)}%`
    );
  }
}

/**
 * Determines the color for a particle based on the current configuration.
 * @param index Index of the particle.
 * @param totalCount Total number of particles.
 * @returns A Color object for the particle.
 */
function determineParticleColor(index: number, totalCount: number): Color {
  if (defaultAnimationConfig.useGradient) {
    // Assign a gradient-based color
    const t = index / totalCount; // Fractional index for gradient interpolation
    const startColor = new Color(defaultAnimationConfig.colorOptions[0].color);
    const endColor = new Color(defaultAnimationConfig.colorOptions[defaultAnimationConfig.colorOptions.length - 1].color);
    return new Color().lerpColors(startColor, endColor, t);
  } else {
    // Assign a random color based on percentage distribution
    return getRandomColorByPercentage();
  }
}

/**
 * Selects a random color based on the percentage distribution in defaultAnimationConfig.
 * @returns A randomly selected Color object.
 */
function getRandomColorByPercentage(): Color {
  const randomValue = Math.random();
  let cumulativePercentage = 0;

  for (const option of defaultAnimationConfig.colorOptions) {
    cumulativePercentage += option.percentage;
    if (randomValue <= cumulativePercentage) {
      return new Color(option.color);
    }
  }

  // Fallback in case of rounding errors
  return new Color(defaultAnimationConfig.colorOptions[defaultAnimationConfig.colorOptions.length - 1].color);
}

/**
 * Generates an initial array of particle colors based on defaultAnimationConfig.
 * @returns Float32Array containing the initial colors.
 */
export function particleColors(): Float32Array {
  validateColorOptions(); // Ensure valid percentages
  const count = defaultAnimationConfig.particleCount;
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const color = determineParticleColor(i, count);
    colors.set([color.r, color.g, color.b], i * 3);
  }

  return colors;
}

/**
 * Updates the colors of particles in an existing Float32Array based on defaultAnimationConfig.
 * @param colorsArray The existing Float32Array to update.
 */
export function updateParticleColors(colorsArray: Float32Array): void {
  validateColorOptions(); // Ensure valid percentages
  const count = defaultAnimationConfig.particleCount;

  for (let i = 0; i < count; i++) {
    const color = determineParticleColor(i, count);
    colorsArray.set([color.r, color.g, color.b], i * 3);
  }
}
