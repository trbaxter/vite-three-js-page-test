import { useFrame } from '@react-three/fiber';
import { initializeParticles } from '@components/homepage-animation/particles/initialization/initializeAnimation.ts';
import { MutableRefObject } from 'react';
import { updateAllParticlePositions } from '../attributes/particlePositions.ts';
import { BufferGeometry } from 'three';

/**
 * Handles frame-by-frame updates for the animation.
 * - Updates particle positions dynamically based on time and oscillation.
 * - Synchronizes geometry changes with the GPU.
 * @param particlesRef Mutable reference to the BufferGeometry.
 * @param positions Float32Array of particle positions.
 */
export function handleFrameAnimation(
  particlesRef: MutableRefObject<BufferGeometry | null>,
  positions: Float32Array
): void {
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;

    const time = clock.getElapsedTime();

    // Update all particle positions dynamically
    updateAllParticlePositions(positions, time);

    // Update the geometry with new positions
    initializeParticles(particlesRef.current, { position: positions });
  });
}
