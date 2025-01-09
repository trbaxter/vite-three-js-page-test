export function ParticleSizes(count: number): Float32Array {
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    sizes[i] = Math.random(); // Random particle sizes
  }

  return sizes;
}
