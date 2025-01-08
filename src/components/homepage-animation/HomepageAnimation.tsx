import { Canvas } from '@react-three/fiber';
import { Particles } from './Particles';
import { useRef } from 'react';
import * as THREE from 'three';

export function HomepageAnimation() {
  const particlesRef = useRef<THREE.BufferGeometry>(null);

  return (
    <Canvas
      camera={{ position: [0, 0, 350], fov: 50 }}
      gl={{
        antialias: true, // Enable smooth rendering
        toneMapping: THREE.ACESFilmicToneMapping, // Use ACES Filmic tone mapping for HDR-like results
      }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 2.5; // Adjust exposure for balanced brightness
      }}
      dpr={Math.min(window.devicePixelRatio, 2)} // Optimize for high-DPI displays
    >
      <color attach="background" args={['black']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={3.5} castShadow />

      <Particles ref={particlesRef} />
    </Canvas>
  );
}