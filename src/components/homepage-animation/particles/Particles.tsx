import React, { forwardRef, useEffect } from 'react';
import { UseCombinedAttributes } from './attributes/useCombinedAttributes';
import { combinedShaders } from './shaders/combinedShaders';
import { invalidate } from '@react-three/fiber';
import * as THREE from 'three';
import { HandleFrameAnimation } from './utils/frameHandler';

export const Particles = forwardRef<THREE.BufferGeometry, {}>((_, ref) => {
  const mutableRef = ref as React.MutableRefObject<THREE.BufferGeometry | null>;

  // Use particle attributes
  const particles = UseCombinedAttributes();

  // Hook to handle frame animations
  HandleFrameAnimation(mutableRef, particles.oscillatingIndices, particles.positions);

  // Update Three.js attributes dynamically
  useEffect(() => {
    if (mutableRef.current) {
      const geometry = mutableRef.current;

      // Replace the color attribute with a new instance
      geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(particles.colors, 3)
      );

      // Force React Three Fiber to re-render
      invalidate();
    }
  }, [particles.colors]);


  return (
    <points>
      <bufferGeometry ref={mutableRef}>
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
      <primitive object={combinedShaders()} attach="material" />
    </points>
  );
});

// Add HMR support
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('Particles component updated via HMR');
    invalidate();
  });
}
