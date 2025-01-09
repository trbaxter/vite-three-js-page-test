import { CalculateRadialDirection } from './radialDirections';
import { CalculateOscillation } from './oscillations';
import { initialParticlePositions } from '../attributes/particlePositions';

export function UpdateParticlePosition(
  index: number,
  positions: Float32Array,
  time: number
): void {
  const x = initialParticlePositions[index * 3];
  const y = initialParticlePositions[index * 3 + 1];
  const z = initialParticlePositions[index * 3 + 2];

  // Compute radial direction
  const direction = CalculateRadialDirection(x, y, z);

  // Apply radial oscillation
  const oscillation = CalculateOscillation(time, index);
  const newPosition = direction.multiplyScalar(
                              Math.sqrt(x**2 + y**2 + z**2) + oscillation);

  // Update position
  positions[index * 3] = newPosition.x;
  positions[index * 3 + 1] = newPosition.y;
  positions[index * 3 + 2] = newPosition.z;
}
