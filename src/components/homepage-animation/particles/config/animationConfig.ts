import { ParticleConfig } from '../interfaces/particleConfigInterface';

/**
 * Centralized particle configuration for the animation.
 */
export const particleConfig: ParticleConfig = {
  particleCount: 120000,
  size: {
    minSize: 0.5,
    maxSize: 2.0,
  },
  radius: {
    baseRadius: 120,
    radiusVariation: 10,
  },
  colorOptions: [
    { color: 0xff0000, percentage: 0.5, opacity: 0.8 }, // Red
    { color: 0x00ff00, percentage: 0.3, opacity: 0.5 }, // Green
    { color: 0x0000ff, percentage: 0.2, opacity: 1.0 }, // Blue
  ],
  useGradient: false,
  oscillation: {
    amplitude: 2,
    frequency: 1.1,
  },
};