import { useFrame } from '@react-three/fiber';
import { updateGeometry } from '../calculations/UpdateGeometry.ts';
import { MutableRefObject } from 'react';
import { UpdateParticlePosition } from '../calculations/updatePositioning.ts';
import { BufferGeometry } from 'three';

export function HandleFrameAnimation(
  particlesRef: MutableRefObject<BufferGeometry | null>,
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

