export const particleOscillations = {
  percentage: 0.8,

  generateOscillatingIndices(count: number): number[] {
    const indices = [];
    for (let i = 0; i < count; i++) {
      if (Math.random() < this.percentage) {
        indices.push(i);
      }
    }
    return indices;
  }
};