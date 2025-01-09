import { useFrame } from '@react-three/fiber';
import { updateGeometry } from '../calculations/UpdateGeometry.ts';
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
    oscillatingIndices.forEach((index) => {
      UpdateParticlePosition(index, positions, time);
    });

    updateGeometry(particlesRef.current);
  });
}

