export const particleOscillations = {
  percentage: 0.5,

  /**
   * Generates an initial array of particle oscillation indices.
   * @param count Number of particles.
   * @returns Array of indices that will oscillate.
   */
  particleOscillations(count: number): number[] {
    const indices = [];
    for (let i = 0; i < count; i++) {
      if (Math.random() < this.percentage) {
        indices.push(i);
      }
    }
    return indices;
  },

  /**
   * Updates the array of particle oscillation indices.
   * @param existingIndices The existing array of indices to update.
   * @param count Number of particles.
   * @returns Updated array of indices that will oscillate.
   */
  updateParticleOscillations(existingIndices: number[], count: number): number[] {
    existingIndices.length = 0; // Clear the existing array
    for (let i = 0; i < count; i++) {
      if (Math.random() < this.percentage) {
        existingIndices.push(i);
      }
    }
    return existingIndices;
  }
};

/**
 * Calculates the oscillation value for a particle based on time, index, amplitude, and frequency.
 * @param time Current time value.
 * @param index Index of the particle.
 * @param amplitude Amplitude of the oscillation (default: 2).
 * @param frequency Frequency of the oscillation (default: 1.1).
 * @returns Calculated oscillation value.
 */
export function calculateOscillation(
  time: number,
  index: number,
  amplitude: number = 2,
  frequency: number = 1.1
): number {
  return Math.sin((frequency / 2.5) * (10 * time) + index) + amplitude;
}
