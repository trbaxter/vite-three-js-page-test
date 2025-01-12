import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { BufferGeometry, Points } from 'three';
import { initializeAnimation } from './initialization/initializeAnimation';
import { handleFrameAnimation } from './utils/handleFrameAnimation';
import { combinedShaders } from './shaders/combinedShaders'; // Import combinedShaders
import { useAnimationConfig } from './config/AnimationConfigProvider'; // Import the context

export const Particles = () => {
  const { gl } = useThree();
  const geometryRef = useRef<BufferGeometry | null>(null);
  const pointsRef = useRef<Points | null>(null); // Reference to the Points object
  const { animationConfig } = useAnimationConfig(); // Access animationConfig context
  const oscillatingIndicesRef = useRef<number[]>([]); // Mutable array for oscillating indices

  // Initialize geometry attributes
  useEffect(() => {
    if (geometryRef.current) {
      const geometry = geometryRef.current;

      // Initialize geometry using the current animationConfig
      initializeAnimation(geometry, {});
    }
  }, [animationConfig]); // Reinitialize if animationConfig changes

  // Handle frame-by-frame updates
  useFrame(({ clock }) => {
    if (geometryRef.current) {
      const geometry = geometryRef.current;
      const time = clock.getElapsedTime();

      // Use handleFrameAnimation for frame updates
      handleFrameAnimation(geometry, time, oscillatingIndicesRef.current);
    }
  });

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
    <points
      ref={pointsRef}
      material={combinedShaders()}
      geometry={geometryRef.current || undefined} // Fix the error by ensuring null is treated as undefined
    >
      <bufferGeometry ref={geometryRef} />
    </points>
  );
};
