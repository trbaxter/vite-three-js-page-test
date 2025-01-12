/**
 * Configuration for particle-related settings.
 */
export interface AnimationConfig {
  particleCount: number; // Total number of particles
  size: {
    minSize: number; // Minimum size for particles
    maxSize: number; // Maximum size for particles
  };
  radius: {
    baseRadius: number; // Base radius for particle distribution
    radiusVariation: number; // Variation in radius for particles
  };
  colorOptions: {
    color: number; // Color value in hexadecimal
    percentage: number; // Percentage of particles that should have this color
    opacity: number; // Opacity level for particles of this color
  }[];
  useGradient: boolean; // Whether to use gradient-based color assignment
  oscillation: {
    amplitude: number; // Oscillation amplitude
    frequency: number; // Oscillation frequency
    percentage: number; // Percentage of oscillating particles
    time: number; // Oscillating period
  };
}
