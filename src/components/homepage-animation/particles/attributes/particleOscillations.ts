export const particleOscillations = {
    percentage: 0.9,

    particleOscillations(count: number): number[] {

        const indices = [];
        for (let i = 0; i < count; i++) {
            if (Math.random() < this.percentage) {
                indices.push(i);
            }
        }
        return indices;
    }
};

export function calculateOscillation(
    time: number,
    index: number,
    amplitude: number = 2,
    frequency: number = 1.1): number {

    return Math.sin(
            (frequency / 2.5) *
            (10 * time) + index) +
        amplitude;
}