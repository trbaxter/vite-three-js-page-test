import { ParticlePositions } from './particlePositions';
import { ParticleColors } from './particleColors';
import { ParticleSizes } from './particleSizes';
import { ParticleOpacities } from './particleOpacities';
import { particleOscillations } from './particleOscillations';
import { particleCount } from './particleCount';

export function CombinedAttributes() {
  const count = particleCount.count;

  const positions = ParticlePositions(count);
  const colors = ParticleColors(count); // Dynamically regenerate colors
  const sizes = ParticleSizes(count);
  const opacities = ParticleOpacities(count);
  const oscillatingIndices = particleOscillations.generateOscillatingIndices(count);

  return { positions, colors, sizes, opacities, oscillatingIndices, count };
}

// Add HMR support
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('CombinedAttributes updated via HMR');
  });
}
