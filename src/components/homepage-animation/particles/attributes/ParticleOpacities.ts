export function ParticleOpacities(count: number): Float32Array {
  const opacities = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    opacities[i] = Math.random() * 0.5 + 0.5; // Random particle opacities
  }

  return opacities;
}
