import { BufferGeometry } from 'three';
import { updateAllParticlePositions } from '../attributes/particlePositions';
import { updateParticleColors } from '../attributes/particleColors';
import { updateParticleSizes } from '../attributes/particleSizes';
import { updateParticleOpacities } from '../attributes/particleOpacities';
import { updateParticleDirections } from '../attributes/particleDirectionality';
import { updateParticleOscillations } from '../attributes/particleOscillations';
import { defaultAnimationConfig } from '../config/animationConfig';

/**
 * Updates the geometry attributes dynamically based on time and defaultAnimationConfig.
 */
export function updateAnimation(
  geometry: BufferGeometry,
  time: number,
  oscillatingIndices: number[]
): void {
  const { oscillation } = defaultAnimationConfig;

  // Update positions
  if (geometry.attributes.position) {
    const positions = geometry.attributes.position.array as Float32Array;
    updateAllParticlePositions(positions, time);
    geometry.attributes.position.needsUpdate = false;
  }

  // Update colors
  if (geometry.attributes.color) {
    const colors = geometry.attributes.color.array as Float32Array;
    updateParticleColors(colors);
    geometry.attributes.color.needsUpdate = false;
  }

  // Update sizes
  if (geometry.attributes.size) {
    const sizes = geometry.attributes.size.array as Float32Array;
    updateParticleSizes(sizes);
    geometry.attributes.size.needsUpdate = false;
  }

  // Update opacities
  if (geometry.attributes.opacity) {
    const opacities = geometry.attributes.opacity.array as Float32Array;
    updateParticleOpacities(opacities);
    geometry.attributes.opacity.needsUpdate = false;
  }

  // Update directions (if applicable)
  if (geometry.attributes.direction) {
    const directions = geometry.attributes.direction.array as Float32Array;
    updateParticleDirections(directions, geometry.attributes.position.array as Float32Array);
    geometry.attributes.direction.needsUpdate = false;
  }

  // Update oscillating particles
  if (oscillation) {
    updateParticleOscillations(oscillatingIndices);
  }
}

