import * as THREE from 'three';

export function CalculateRadialDirection(x: number,
                                         y: number,
                                         z: number): THREE.Vector3 {

  const radius = Math.sqrt(x**2 + y**2 + z**2);
  return new THREE.Vector3(x / radius, y / radius, z / radius);
}
