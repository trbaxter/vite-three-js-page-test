import { BufferGeometry, BufferAttribute } from 'three';
import { validateParticleConfig } from '../validation/validateParticleConfig.ts';

/**
 * Initializes the geometry attributes with given data.
 */
export function initializeAnimation(
  geometry: BufferGeometry,
  attributes: {
    position: Float32Array;
    color: Float32Array;
    size: Float32Array;
    opacity: Float32Array;
  }
): void {
  if (!attributes.position || !attributes.color) {
    throw new Error('Position and color attributes are required for geometry initialization.');
  }
  geometry.setAttribute('color', new BufferAttribute(attributes.color, 3));
  geometry.setAttribute('position', new BufferAttribute(attributes.position, 3));

  if (attributes.size) {
    geometry.setAttribute('size', new BufferAttribute(attributes.size, 1));
  }

  if (attributes.opacity) {
    geometry.setAttribute('opacity', new BufferAttribute(attributes.opacity, 1));
  }
}

// Validate the configuration on initialization
validateParticleConfig();
