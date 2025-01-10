import { particlePositions } from './particlePositions.ts';
import { particleColors } from './particleColors.ts';
import { particleSizes } from './particleSizes.ts';
import { particleOpacities } from './particleOpacities.ts';
import { particleOscillations } from './particleOscillations.ts';
import { particleCount } from './particleCount.ts';

export function combinedAttributes() {
  const count = particleCount.count;

  const positions = particlePositions(count);
  const colors = particleColors(count);
  const sizes = particleSizes(count);
  const opacities = particleOpacities(count);
  const oscillatingIndices = particleOscillations.particleOscillations(count);

  return { positions, colors, sizes, opacities, oscillatingIndices, count };
}
