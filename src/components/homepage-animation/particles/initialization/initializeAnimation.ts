import { BufferGeometry, BufferAttribute } from 'three';
import { validateParticleConfig } from '../validation/validateParticleConfig';
import { particlePositions } from '../attributes/particlePositions';
import { particleColors } from '../attributes/particleColors';
import { particleSizes } from '../attributes/particleSizes';
import { particleOpacities } from '../attributes/particleOpacities';
import { generateInitialParticleDirections } from '../attributes/particleDirectionality';

/**
 * Initializes the geometry attributes with given data.
 */
export function initializeAnimation(
  geometry: BufferGeometry,
  attributes: Partial<{
    position: Float32Array;
    color: Float32Array;
    size: Float32Array;
    opacity: Float32Array;
  }>
): void {
  // Validate the configuration on initialization
  validateParticleConfig();

  // Generate or use provided attributes
  const positions = attributes?.position || particlePositions(); // Position
  const colors = attributes?.color || particleColors(); // Color
  const sizes = attributes?.size || particleSizes(); // Size
  const opacities = attributes?.opacity || particleOpacities(); // Opacity

  // Use initial particle directions during initialization (if necessary for logic)
  generateInitialParticleDirections(positions);

  // Assign attributes to the geometry
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  geometry.setAttribute('size', new BufferAttribute(sizes, 1));
  geometry.setAttribute('opacity', new BufferAttribute(opacities, 1));
}
