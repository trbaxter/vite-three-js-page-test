import { calculateRadialDirection } from './particleDirectionality';
import { calculateOscillation } from './particleOscillations';
import { defaultAnimationConfig } from '../config/animationConfig';

/**
 * Generates initial positions for particles in a spherical distribution based on defaultAnimationConfig.
 * @returns Float32Array of positions.
 */
export function particlePositions(): Float32Array {
  const { particleCount, radius } = defaultAnimationConfig;
  const { baseRadius, radiusVariation } = radius;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const phi = Math.random() * 2 * Math.PI; // Random azimuthal angle
    const theta = Math.acos(2 * Math.random() - 1); // Random polar angle
    const distance =
      baseRadius + (Math.random() - 0.5) * 2 * radiusVariation; // Base radius with variation

    // Convert spherical coordinates to Cartesian
    positions[i * 3] = distance * Math.sin(theta) * Math.cos(phi); // x
    positions[i * 3 + 1] = distance * Math.sin(theta) * Math.sin(phi); // y
    positions[i * 3 + 2] = distance * Math.cos(theta); // z
  }

  return positions;
}

/**
 * Updates positions for all particles dynamically based on time, oscillation, and defaultAnimationConfig.
 * @param positions Float32Array of current particle positions.
 * @param time Current animation time.
 */
export function updateAllParticlePositions(
  positions: Float32Array,
  time: number
): void {
  const { particleCount, radius } = defaultAnimationConfig;
  const { baseRadius, radiusVariation } = radius;

  for (let i = 0; i < particleCount; i++) {
    const x = positions[i * 3];
    const y = positions[i * 3 + 1];
    const z = positions[i * 3 + 2];

    // Calculate radial direction
    const direction = calculateRadialDirection(x, y, z);

    // Apply oscillation dynamically
    const oscillationValue = calculateOscillation(time, i);

    // Calculate distance with variation and oscillation
    const newDistance =
      baseRadius +
      (Math.random() - 0.5) * 2 * radiusVariation + // Randomized variation
      oscillationValue; // Oscillation adjustment

    // Update position based on new distance and direction
    const newPosition = direction.multiplyScalar(newDistance);
    positions.set([newPosition.x, newPosition.y, newPosition.z], i * 3);
  }
}
