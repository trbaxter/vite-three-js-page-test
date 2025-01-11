import { BufferGeometry, BufferAttribute } from 'three';

/**
 * Represents a single color option for particles.
 */
interface ColorOption {
  color: number; // Color value in hexadecimal
  percentage: number; // Percentage of particles that should have this color
  opacity: number; // Opacity level for particles of this color
}

/**
 * Configuration for particle-related settings.
 */
interface ParticleConfig {
  particleCount: number; // Total number of particles
  size: {
    minSize: number; // Minimum size for particles
    maxSize: number; // Maximum size for particles
  };
  radius: {
    baseRadius: number; // Base radius for particle distribution
    radiusVariation: number; // Variation in radius for particles
  };
  colorOptions: ColorOption[]; // Array of color options with percentages and opacity levels
  useGradient: boolean; // Whether to use gradient-based color assignment
  oscillation: {
    amplitude: number; // Oscillation amplitude
    frequency: number; // Oscillation frequency
  };
}

/**
 * Centralized particle configuration for the animation.
 */
export const particleConfig: ParticleConfig = {
  particleCount: 120000, // Default particle count
  size: {
    minSize: 0.5, // Minimum size for particles
    maxSize: 2.0, // Maximum size for particles
  },
  radius: {
    baseRadius: 120, // Default base radius
    radiusVariation: 10, // Default radius variation
  },
  colorOptions: [
    { color: 0xff0000, percentage: 0.5, opacity: 0.8 }, // Red (50%, 80% opacity)
    { color: 0x00ff00, percentage: 0.3, opacity: 0.5 }, // Green (30%, 50% opacity)
    { color: 0x0000ff, percentage: 0.2, opacity: 1.0 }, // Blue (20%, 100% opacity)
  ],
  useGradient: true, // Enable gradient mode
  oscillation: {
    amplitude: 2, // Default oscillation amplitude
    frequency: 1.1, // Default oscillation frequency
  },
};


// Individual validation functions
function validateParticleCount(): void {
  if (!Number.isInteger(particleConfig.particleCount) || particleConfig.particleCount <= 0) {
    throw new Error('particleCount must be a positive integer.');
  }
}

function validateRadius(): void {
  if (particleConfig.radius.baseRadius <= 0 || particleConfig.radius.radiusVariation < 0) {
    throw new Error('Base radius and radius variation must be positive numbers.');
  }
}

function validateSize(): void {
  if (
    particleConfig.size.minSize <= 0 ||
    particleConfig.size.maxSize <= particleConfig.size.minSize
  ) {
    throw new Error('Invalid size configuration: minSize must be positive and less than maxSize.');
  }
}

function validateOscillation(): void {
  if (particleConfig.oscillation.amplitude <= 0 || particleConfig.oscillation.frequency <= 0) {
    throw new Error('Oscillation amplitude and frequency must be positive numbers.');
  }
}

function validateColorOptions(): void {
  if (!particleConfig.colorOptions || particleConfig.colorOptions.length === 0) {
    throw new Error('colorOptions must contain at least one color option.');
  }

  const totalPercentage = particleConfig.colorOptions.reduce((sum, option) => sum + option.percentage, 0);

  if (Math.abs(totalPercentage - 1) > 0.001) {
    throw new Error(
      `Invalid colorOptions: Total percentage must equal 100%. Current total: ${(totalPercentage * 100).toFixed(2)}%`
    );
  }

  for (const option of particleConfig.colorOptions) {
    if (option.opacity < 0 || option.opacity > 1) {
      throw new Error(`Opacity for color ${option.color.toString(16)} must be between 0 and 1.`);
    }
  }
}

// Main validation function
function validateParticleConfig(): void {
  validateParticleCount();
  validateRadius();
  validateSize();
  validateOscillation();
  validateColorOptions();
}

/**
 * Initializes the geometry attributes with given data.
 */
export function initializeGeometry(
  geometry: BufferGeometry,
  attributes: {
    position?: Float32Array;
    color: Float32Array;
    size?: Float32Array;
    opacity?: Float32Array;
  }
): void {
  if (!attributes.position || !attributes.color) {
    throw new Error('Position and color attributes are required for geometry initialization.');
  }

  geometry.setAttribute('position', new BufferAttribute(attributes.position, 3));
  geometry.setAttribute('color', new BufferAttribute(attributes.color, 3));

  if (attributes.size) {
    geometry.setAttribute('size', new BufferAttribute(attributes.size, 1));
  }

  if (attributes.opacity) {
    geometry.setAttribute('opacity', new BufferAttribute(attributes.opacity, 1));
  }
}

/**
 * Updates specific attributes of the geometry.
 */
export function updateGeometry(
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

// Validate the configuration on initialization
validateParticleConfig();
