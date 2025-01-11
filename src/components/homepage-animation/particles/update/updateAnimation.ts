import { BufferGeometry } from 'three';

/**
 * Updates specific attributes of the geometry.
 */
export function updateAnimation(
  geometry: BufferGeometry,
  updatedAttributes: {
    position?: Float32Array;
    color?: Float32Array;
    size?: Float32Array;
    opacity?: Float32Array;
  }
): void {
  if (updatedAttributes.position) {
    geometry.attributes.position.array.set(updatedAttributes.position);
    geometry.attributes.position.needsUpdate = true;
  }

  if (updatedAttributes.color) {
    geometry.attributes.color.array.set(updatedAttributes.color);
    geometry.attributes.color.needsUpdate = true;
  }

  if (updatedAttributes.size) {
    geometry.attributes.size.array.set(updatedAttributes.size);
    geometry.attributes.size.needsUpdate = true;
  }

  if (updatedAttributes.opacity) {
    geometry.attributes.opacity.array.set(updatedAttributes.opacity);
    geometry.attributes.opacity.needsUpdate = true;
  }
}