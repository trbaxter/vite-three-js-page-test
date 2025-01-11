import { calculateRadialDirection } from './particleDirectionality.ts';
import { calculateOscillation } from './particleOscillations.ts';
import { particleConfig } from '@components/homepage-animation/particles/initialization/initializeAnimation.ts';

/**
 * Updates positions for all particles dynamically based on time and oscillation.
 * @param positions Float32Array of current particle positions.
 * @param time Current animation time.
 */
export function updateAllParticlePositions(
  positions: Float32Array,
  time: number
): void {
  const count = particleConfig.particleCount;

  for (let i = 0; i < count; i++) {
    const x = positions[i * 3];
    const y = positions[i * 3 + 1];
    const z = positions[i * 3 + 2];

    const direction = calculateRadialDirection(x, y, z);
    const oscillation = calculateOscillation(time, i, particleConfig.oscillation.amplitude, particleConfig.oscillation.frequency);

    const newPosition = direction.multiplyScalar(
      Math.sqrt(x ** 2 + y ** 2 + z ** 2) + oscillation
    );

    positions.set([newPosition.x, newPosition.y, newPosition.z], i * 3);
  }
}
