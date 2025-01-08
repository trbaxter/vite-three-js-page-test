import React, { forwardRef, useMemo, useEffect } from 'react';
import { createParticleMaterial } from './createParticleMaterial';
import { generateParticleAttributes } from './generateParticleAttributes';
import { useParticleAnimation } from './useParticleAnimation';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const Particles = forwardRef<THREE.BufferGeometry>((_, ref) => {
  const count = 5000; // Total number of particles
  const oscillationPercentage = 0.8;

  const material = useMemo(() => createParticleMaterial(), []);
  const particles = useMemo(() => generateParticleAttributes(count), [count]);

  const initialPositions = useMemo(() => new Float32Array(particles.positions), [particles.positions]);

  // Randomly select a percentage of particles to oscillate
  const oscillatingIndices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < count; i++) {
      if (Math.random() < oscillationPercentage) {
        indices.push(i);
      }
    }
    return indices;
  }, [count, oscillationPercentage]);

  // Apply the animation
  useParticleAnimation(ref as React.MutableRefObject<THREE.BufferGeometry>, initialPositions, oscillatingIndices);

  // Dynamically adjust resolution and pixel ratio
  const { gl } = useThree();
  useEffect(() => {
    const handleResize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio, 2); // Limit max pixel ratio
      gl.setPixelRatio(pixelRatio);
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    // Set initial resolution
    handleResize();

    // Listen for resize and device pixel ratio changes
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gl]);

  return (
    <points>
      <bufferGeometry ref={ref}>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          itemSize={3}
          count={particles.positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particles.colors}
          itemSize={3}
          count={particles.colors.length / 3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={particles.sizes}
          itemSize={1}
          count={particles.sizes.length}
        />
        <bufferAttribute
          attach="attributes-opacity"
          array={particles.opacities}
          itemSize={1}
          count={particles.opacities.length}
        />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  );
});