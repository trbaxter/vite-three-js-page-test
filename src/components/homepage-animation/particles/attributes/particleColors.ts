import * as THREE from 'three';

export function ParticleColors(count: number): Float32Array {
  const colors = new Float32Array(count * 3);

  const colorOptions = [
    new THREE.Color(0x34fa76), // Solventum green
    new THREE.Color(0x96789f), // Dark gray magenta
    new THREE.Color(0x00FFFF), // Electric cyan
  ];

  for (let i = 0; i < count; i++) {
    const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    colors.set([color.r, color.g, color.b], i * 3);
  }

  return colors;
}

// Add HMR support
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('ParticleColors updated via HMR');
  });
}