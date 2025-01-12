import { defaultAnimationConfig } from '../config/animationConfig.ts';

/**
 * Validates the particle count.
 */
function validateParticleCount(): void {
  if (!Number.isInteger(defaultAnimationConfig.particleCount) || defaultAnimationConfig.particleCount <= 0) {
    throw new Error('particleCount must be a positive integer.');
  }
}

/**
 * Validates the radius configuration.
 */
function validateRadius(): void {
  if (defaultAnimationConfig.radius.baseRadius <= 0 || defaultAnimationConfig.radius.radiusVariation < 0) {
    throw new Error('Base radius and radius variation must be positive numbers.');
  }
}

/**
 * Validates the size configuration.
 */
function validateSize(): void {
  if (
    defaultAnimationConfig.size.minSize <= 0 ||
    defaultAnimationConfig.size.maxSize <= defaultAnimationConfig.size.minSize
  ) {
    throw new Error('Invalid size configuration: minSize must be positive and less than maxSize.');
  }
}

/**
 * Validates the oscillation configuration.
 */
function validateOscillation(): void {
  if (defaultAnimationConfig.oscillation.amplitude <= 0 || defaultAnimationConfig.oscillation.frequency <= 0) {
    throw new Error('Oscillation amplitude and frequency must be positive numbers.');
  }
}

/**
 * Validates the color options.
 */
function validateColorOptions(): void {
  if (!defaultAnimationConfig.colorOptions || defaultAnimationConfig.colorOptions.length === 0) {
    throw new Error('colorOptions must contain at least one color option.');
  }

  const totalPercentage = defaultAnimationConfig.colorOptions.reduce((sum, option) => sum + option.percentage, 0);

  if (Math.abs(totalPercentage - 1) > 0.001) {
    throw new Error(
      `Invalid colorOptions: Total percentage must equal 100%. Current total: ${(totalPercentage * 100).toFixed(2)}%`
    );
  }

  for (const option of defaultAnimationConfig.colorOptions) {
    if (option.opacity < 0 || option.opacity > 1) {
      throw new Error(`Opacity for color ${option.color.toString(16)} must be between 0 and 1.`);
    }
  }
}

/**
 * Main validation function for the particle configuration.
 */
export function validateParticleConfig(): void {
  validateParticleCount();
  validateRadius();
  validateSize();
  validateOscillation();
  validateColorOptions();
}
