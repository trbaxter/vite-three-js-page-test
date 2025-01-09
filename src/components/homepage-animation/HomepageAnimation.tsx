import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Particles } from './particles/Particles';
import * as THREE from 'three';

export function HomepageAnimation() {
  const particlesRef = useRef<THREE.BufferGeometry | null>(null);

  return (
    <Canvas
      camera={{ position: [0, 0, 350], fov: 50 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 2.5;
      }}
      dpr={Math.min(window.devicePixelRatio, 2)}
    >
      <color attach="background" args={['black']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={3.5} castShadow />
      <Particles ref={particlesRef} />
    </Canvas>
  );
}
