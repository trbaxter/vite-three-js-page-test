import * as THREE from 'three';

export function generateParticleAttributes(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const opacities = new Float32Array(count);

  const colorOptions = [
    new THREE.Color(0x34fa76), // Solventum green
    new THREE.Color(0x96789f), // Dark gray magenta
    new THREE.Color(0x00FFFF), // Electric cyan
  ];

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = (1 - Math.sqrt(Math.random()))
      * (Math.PI / 2)
      * (Math.random() > 0.5 ? 1 : -1);


    const x = Math.cos(theta) * Math.cos(phi);
    const y = Math.sin(phi);
    const z = Math.sin(theta) * Math.cos(phi);

    const baseRadius = 120 + (Math.random() - 0.5) * 5;
    const scaled = new THREE.Vector3(x, y, z).multiplyScalar(baseRadius);


    positions.set([scaled.x, scaled.y, scaled.z], i * 3);

    const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    colors.set([color.r, color.g, color.b], i * 3);

    sizes[i] = Math.random(); // Random particle sizes
    opacities[i] = Math.random() * 0.5 + 0.5;  // Random particle opacities
  }

  return { positions, colors, sizes, opacities };
}