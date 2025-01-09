import { useFrame } from '@react-three/fiber';
import { updateGeometry } from '../calculations/updateGeometry';
import { MutableRefObject } from 'react';
import * as THREE from 'three';
import { UpdateParticlePosition } from '../calculations/updatePositioning.ts';

export function HandleFrameAnimation(
  particlesRef: MutableRefObject<THREE.BufferGeometry | null>,
  oscillatingIndices: number[],
  positions: Float32Array
) {
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;

    const time = clock.getElapsedTime();

    // Update positions for all oscillating particles
    oscillatingIndices.forEach((index) => {
      UpdateParticlePosition(index, positions, time);
    });

    // Update the geometry
    updateGeometry(particlesRef.current);
  });
}

