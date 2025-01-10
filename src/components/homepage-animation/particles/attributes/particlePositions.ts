import { particleCount } from './particleCount.ts';
import { particleRadius } from './particleRadius.ts';
import { Vector3 } from 'three';

export function particlePositions(count = particleCount.count): Float32Array {

  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi =
      (1 - Math.sqrt(Math.random())) *
      (Math.PI / 2) *
      (Math.random() > 0.5 ? 1 : -1);

    const x = Math.cos(theta) * Math.cos(phi);
    const y = Math.sin(phi);
    const z = Math.sin(theta) * Math.cos(phi);
    const baseRadius = particleRadius.baseRadius +
                               (Math.random() - 0.5) *
                               particleRadius.radiusVariation;

    const scaled = new Vector3(x, y, z).multiplyScalar(baseRadius);

    positions.set([scaled.x, scaled.y, scaled.z], i * 3);
  }

  return positions;

}

export const initialParticlePositions = particlePositions();
