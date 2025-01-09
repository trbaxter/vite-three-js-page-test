export function CalculateOscillation(time: number,
                                     index: number,
                                     amplitude: number = 2,
                                     frequency: number = 1.1): number {

  return 3*Math.sin(frequency * time + index) + amplitude;
}
