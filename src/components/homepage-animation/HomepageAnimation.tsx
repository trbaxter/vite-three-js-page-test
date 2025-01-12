import { Canvas } from '@react-three/fiber';
import { Particles } from './particles/Particles.tsx';
import { useRef } from 'react';
import { ACESFilmicToneMapping, BufferGeometry } from 'three';

export function HomepageAnimation() {
    const particlesRef = useRef<BufferGeometry>(null);

    return (
        <Canvas
            camera={{ position: [0, 0, 350], fov: 50 }}
            gl={{
                antialias: true,
                toneMapping: ACESFilmicToneMapping
            }}
            onCreated={({ gl }) => {
                gl.toneMappingExposure = 2.5;
            }}
            dpr={Math.min(window.devicePixelRatio, 10)}
        >
            <color attach="background" args={['black']} />
            <ambientLight intensity={0.19} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />

            <Particles ref={particlesRef} />
        </Canvas>
    );
}