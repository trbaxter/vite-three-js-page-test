import { Canvas } from '@react-three/fiber';
import { Particles } from './particles/Particles.tsx';
import { ACESFilmicToneMapping } from 'three';
import { AnimationConfigProvider } from './particles/config/AnimationConfigProvider.tsx';

export function HomepageAnimation() {

  return (
    <AnimationConfigProvider>
      <Canvas
        camera={{ position: [0, 0, 350], fov: 50 }}
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
        }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 2.5;
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <color attach="background" args={['black']} />
        <ambientLight intensity={0.19} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />

        <Particles />
      </Canvas>
    </AnimationConfigProvider>
  );
}
