import { Vector3 } from 'three';

export function radialDirections(x: number,
                                 y: number,
                                 z: number): Vector3 {

  const radius = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

  return new Vector3(x / radius,
    y / radius,
    z / radius);

}
