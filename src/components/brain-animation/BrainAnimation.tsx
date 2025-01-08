import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BrainParticles } from './BrainParticles';
import { Veins } from './BrainVeins';
import { createBrainVeinsFromPaths } from './utils';
import { RotatingBrain } from './RotatingBrain';

export function BrainAnimation() {
  const curves = createBrainVeinsFromPaths();

  return (
    <Canvas camera={{ position: [0, 0, 0.3], near: 0.001, far: 5 }}>
      <color attach="background" args={['black']} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <RotatingBrain>
        <Veins curves={curves} />
        <BrainParticles curves={curves} />
      </RotatingBrain>
      <OrbitControls />
    </Canvas>
  );
}
