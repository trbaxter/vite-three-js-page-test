import * as THREE from 'three';

export function ParticleColors(count: number): Float32Array {
  const colors = new Float32Array(count * 3);

  const colorOptions = [
    new THREE.Color(0x34fa76), // Green
    new THREE.Color(0x96789f), // Dark magenta
    new THREE.Color(0x00FFFF), // Electric cyan
  ];

  for (let i = 0; i < count; i++) {
    const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    colors.set([color.r, color.g, color.b], i * 3);
  }

  return colors;
}