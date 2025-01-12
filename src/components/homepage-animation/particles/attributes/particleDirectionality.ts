import { Vector3 } from 'three';

/**
 * Validates that the positions array length is a multiple of 3.
 * @param positions Float32Array of particle positions.
 * @throws Error if the array length is invalid.
 */
function validatePositions(positions: Float32Array): void {
  if (positions.length % 3 !== 0) {
    throw new Error('The positions array length must be a multiple of 3.');
  }
}

/**
 * Iterates through particle positions and applies a callback for each particle.
 * @param positions Float32Array of particle positions.
 * @param callback Function to apply for each particle (x, y, z coordinates).
 */
function forEachParticle(
  positions: Float32Array,
  callback: (x: number, y: number, z: number, index: number) => void
): void {
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];
    callback(x, y, z, i / 3);
  }
}

/**
 * Calculates the radial direction for a particle.
 * @param x X-coordinate of the particle.
 * @param y Y-coordinate of the particle.
 * @param z Z-coordinate of the particle.
 * @returns A normalized Vector3 representing the radial direction.
 */
export function calculateRadialDirection(x: number, y: number, z: number): Vector3 {
  const radius = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  return new Vector3(x / radius, y / radius, z / radius);
}

/**
 * Generates an array of initial radial directions for particles based on their positions.
 * @param positions Float32Array of particle positions (x, y, z for each particle).
 * @returns Float32Array containing the normalized directions.
 */
export function generateInitialParticleDirections(positions: Float32Array): Float32Array {
  validatePositions(positions);

  const directions = new Float32Array(positions.length);
  forEachParticle(positions, (x, y, z, index) => {
    const direction = calculateRadialDirection(x, y, z);
    directions.set([direction.x, direction.y, direction.z], index * 3);
  });

  return directions;
}

/**
 * Updates the radial directions of particles based on their positions.
 * @param directionsArray Float32Array of existing particle directions to update.
 * @param positions Float32Array of particle positions (x, y, z for each particle).
 */
export function updateParticleDirections(
  directionsArray: Float32Array,
  positions: Float32Array
): void {
  validatePositions(positions);

  forEachParticle(positions, (x, y, z, index) => {
    const direction = calculateRadialDirection(x, y, z);
    directionsArray.set([direction.x, direction.y, direction.z], index * 3);
  });
}
