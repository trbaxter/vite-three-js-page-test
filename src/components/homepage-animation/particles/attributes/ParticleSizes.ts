export function ParticleSizes(count: number): Float32Array {
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    sizes[i] = (1.5*Math.random())**2; // Random particle sizes
  }

  return sizes;
}
