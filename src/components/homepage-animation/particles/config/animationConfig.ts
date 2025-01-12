import { AnimationConfig } from '../interfaces/animationConfigInterface.ts';

/**
 * Centralized particle configuration for the animation.
 */
export const defaultAnimationConfig: AnimationConfig = {
  particleCount: 100000,
  size: {
    minSize: 0.5,
    maxSize: 2.0,
  },
  radius: {
    baseRadius: 120,
    radiusVariation: 10,
  },
  colorOptions: [
    { color: 0x34fa76, percentage: 0.5, opacity: 0.8 }, // Green
    { color: 0x96789f, percentage: 0.3, opacity: 0.5 }, // Dark magenta
    { color: 0x00FFFF, percentage: 0.2, opacity: 1.0 }, // Blue
  ],
  useGradient: false,
  oscillation: {
    amplitude: 2,
    frequency: 1.1,
    percentage: 0.1,
    time: 0.025
  },
};
