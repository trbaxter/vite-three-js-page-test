import { forwardRef, MutableRefObject, useEffect } from 'react';
import { initializeAnimation, particleConfig, initializeParticles } from '@components/homepage-animation/particles/initialization/initializeAnimation.ts';
import { useThree } from '@react-three/fiber';
import { BufferGeometry } from 'three';

export const Particles = forwardRef<BufferGeometry, unknown>((_, ref) => {
  const { gl } = useThree();

  // Handle geometry initialization
  useEffect(() => {
    if (ref && (ref as MutableRefObject<BufferGeometry>).current) {
      const geometry = (ref as MutableRefObject<BufferGeometry>).current;

      // Initialize geometry attributes from particleConfig
      initializeAnimation(geometry, {
        position: new Float32Array(particleConfig.particleCount * 3),
        color: new Float32Array(particleConfig.particleCount * 3),
        size: new Float32Array(particleConfig.particleCount),
        opacity: new Float32Array(particleConfig.particleCount),
      });
    }
  }, [ref]);

  // Handle updates (if needed dynamically)
  useEffect(() => {
    if (ref && (ref as MutableRefObject<BufferGeometry>).current) {
      const geometry = (ref as MutableRefObject<BufferGeometry>).current;

      // Dynamically update geometry (e.g., if particleConfig changes)
      initializeParticles(geometry, {
        position: new Float32Array(particleConfig.particleCount * 3), // Example: Updated positions
        color: new Float32Array(particleConfig.particleCount * 3), // Example: Updated colors
      });
    }
  }, [ref]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio, 10);
      gl.setPixelRatio(pixelRatio);
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gl]);

  return (
    <points>
      <bufferGeometry ref={ref} />
    </points>
  );
});
