import { defaultAnimationConfig } from '../config/animationConfig';

/**
 * Updates the array of particle oscillation indices based on defaultAnimationConfig.
 * @param existingIndices The existing array of indices to update.
 */
export function updateParticleOscillations(existingIndices: number[]): void {
  const { particleCount, oscillation } = defaultAnimationConfig;

  existingIndices.length = 0; // Clear the existing array
  for (let i = 0; i < particleCount; i++) {
    if (Math.random() < oscillation.percentage) {
      existingIndices.push(i);
    }
  }
}

/**
 * Calculates the oscillation value for a particle based on time, index, amplitude, and frequency.
 * @param time Current time value.
 * @param index Index of the particle.
 * @returns Calculated oscillation value.
 */
export function calculateOscillation(time: number, index: number): number {
  const { amplitude, frequency } = defaultAnimationConfig.oscillation;
  return Math.sin((frequency / 2.5) * (10 * time) + index) + amplitude;
}
