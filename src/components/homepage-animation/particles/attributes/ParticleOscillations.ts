export const ParticleOscillations = {
  percentage: 0.8,

  ParticleOscillations(count: number): number[] {
    const indices = [];
    for (let i = 0; i < count; i++) {
      if (Math.random() < this.percentage) {
        indices.push(i);
      }
    }
    return indices;
  }
}

export function CalculateOscillation(time: number,
                                     index: number,
                                     amplitude: number = 2,
                                     frequency: number = 1.1): number {

  return 3*Math.sin(frequency * time + index) + amplitude;
}