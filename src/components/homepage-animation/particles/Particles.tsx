import React, { forwardRef, useEffect } from 'react';
import { combinedShaders } from './shaders/combinedShaders.ts';
import { combinedAttributes } from './attributes/combinedAttributes.ts';
import { HandleFrameAnimation } from './utils/HandleFrameAnimation.ts';
import { useThree } from '@react-three/fiber';
import { BufferGeometry } from 'three';

export const Particles = forwardRef<BufferGeometry>((_, ref) => {

  const shaders = combinedShaders();
  const particles = combinedAttributes();

  HandleFrameAnimation(ref as React.MutableRefObject<BufferGeometry>,
    particles.oscillatingIndices, particles.positions);

  const { gl } = useThree();

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
          count={particles.colors.length}
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
      <primitive object={shaders} attach="material" />
    </points>
  );
});
