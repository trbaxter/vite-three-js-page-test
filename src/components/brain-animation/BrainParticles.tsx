import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { randomRange } from '../../utils/brain-animation/randomRange.ts';
import { AdditiveBlending, BufferGeometry, CatmullRomCurve3, Color } from 'three';
import { useEffect, useMemo, useRef } from 'react';

export const BrainParticleMaterial = shaderMaterial(
    { time: 0, color: new Color(0.1, 0.3, 0.6) },
    // vertex shader
    /*glsl*/ `
    varying vec2 vUv;
    uniform float time;
    varying float vProgress;
    attribute float randoms;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = randoms * 1. * (1. / -mvPosition.z);
    }
  `,
    // fragment shader
    /*glsl*/ `
    uniform float time;
    void main() {
      float disc = length(gl_PointCoord.xy - vec2(0.5));
      float opacity = 0.9 * smoothstep(0.5, 0.4, disc);
      gl_FragColor = vec4(vec3(opacity), 1.);
    }
  `
);

extend({ BrainParticleMaterial });

export function BrainParticles(props: { curves: CatmullRomCurve3[] }) {
    const { curves } = props;
    const density = 10;
    const numberOfPoints = density * curves.length;
    const myPoints = useRef<
        {
            currentOffset: number;
            speed: number;
            curve: CatmullRomCurve3;
            curPosition: number;
        }[]
    >([]);
    const brainGeo = useRef<BufferGeometry>(null!);

    const positions = useMemo(() => {
        const positions: number[] = [];

        for (let i = 0; i < numberOfPoints; i++) {
            positions.push(
                randomRange(-1, 1),
                randomRange(-1, 1),
                randomRange(-1, 1)
            );
        }

        return new Float32Array(positions);
    }, [numberOfPoints]);

    const randoms = useMemo(() => {
        const randoms: number[] = [];

        for (let i = 0; i < numberOfPoints; i++) {
            randoms.push(randomRange(0.3, 1));
        }

        return new Float32Array(randoms);
    }, [numberOfPoints]);

    useEffect(() => {
        for (let i = 0; i < curves.length; i++) {
            for (let j = 0; j < density; j++) {
                myPoints.current.push({
                    currentOffset: Math.random(),
                    speed: Math.random() * 0.001,
                    curve: curves[i],
                    curPosition: Math.random()
                });
            }
        }
    });

    useFrame(() => {
        const brainGeoCurPositions = brainGeo.current.attributes.position.array;

        for (let i = 0; i < myPoints.current.length; i++) {
            myPoints.current[i].curPosition += myPoints.current[i].speed;
            myPoints.current[i].curPosition = myPoints.current[i].curPosition % 1;

            const curPosition = myPoints.current[i].curve.getPointAt(
                myPoints.current[i].curPosition
            );
            brainGeoCurPositions[i * 3] = curPosition.x;
            brainGeoCurPositions[i * 3 + 1] = curPosition.y;
            brainGeoCurPositions[i * 3 + 2] = curPosition.z;
        }

        brainGeo.current.attributes.position.needsUpdate = true;
    });

    return (
        <>
            <points>
                <bufferGeometry attach="geometry" ref={brainGeo}>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-randoms"
                        count={randoms.length}
                        array={randoms}
                        itemSize={1}
                    />
                </bufferGeometry>
                <brainParticleMaterial
                    attach="material"
                    depthTest={false}
                    depthWrite={false}
                    transparent={true}
                    blending={AdditiveBlending}
                />
            </points>
        </>
    );
}