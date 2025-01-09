import { ParticlePositions } from './ParticlePositions.ts';
import { ParticleColors } from './ParticleColors';
import { ParticleSizes } from './ParticleSizes.ts';
import { ParticleOpacities } from './ParticleOpacities.ts';
import { ParticleOscillations } from './ParticleOscillations.ts';
import { ParticleCount } from './ParticleCount.ts';

export function CombinedAttributes() {
  const count = ParticleCount.count;

  const positions = ParticlePositions(count);
  const colors = ParticleColors(count);
  const sizes = ParticleSizes(count);
  const opacities = ParticleOpacities(count);
  const oscillatingIndices = ParticleOscillations.ParticleOscillations(count);

  return { positions, colors, sizes, opacities, oscillatingIndices, count };
}
