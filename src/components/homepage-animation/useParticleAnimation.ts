import { useFrame } from '@react-three/fiber';
import { RefObject } from 'react';
import * as THREE from 'three';

export function useParticleAnimation(
  particlesRef: RefObject<THREE.BufferGeometry>,
  initialPositions: Float32Array,
  oscillatingIndices: number[]
) {
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;

    const time = clock.getElapsedTime();
    const positions = particlesRef.current.attributes.position.array as Float32Array;

    for (let i = 0; i < oscillatingIndices.length; i++) {
      const index = oscillatingIndices[i];

      // Get initial position
      const x = initialPositions[index * 3];
      const y = initialPositions[index * 3 + 1];
      const z = initialPositions[index * 3 + 2];

      // Compute radial direction
      const radius = Math.sqrt(x * x + y * y + z * z);
      const direction = new THREE.Vector3(x / radius, y / radius, z / radius);

      // Apply radial oscillation
      const oscillation = Math.sin(0.1 * time + index) * 5;
      const newPosition = direction.multiplyScalar(radius + oscillation);

      // Update position
      positions[index * 3] = newPosition.x;
      positions[index * 3 + 1] = newPosition.y;
      positions[index * 3 + 2] = newPosition.z;
    }

    // Notify Three.js to update the geometry
    particlesRef.current.attributes.position.needsUpdate = true;
  });
}