import { updateAnimation } from '../update/updateAnimation';
import { BufferGeometry } from 'three';

/**
 * Handles frame-by-frame updates for the animation.
 * @param geometry The BufferGeometry to update.
 * @param time Current animation time.
 * @param oscillatingIndices Mutable array of oscillating particle indices.
 */
export function handleFrameAnimation(
  geometry: BufferGeometry,
  time: number,
  oscillatingIndices: number[]
): void {
  // Call updateAnimation to apply updates
  updateAnimation(geometry, time, oscillatingIndices);
}
