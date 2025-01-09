import * as THREE from 'three';
import { vertexShader } from './vertexShader.ts';
import { fragmentShader } from './fragmentShader.ts';

export function combinedShaders() {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    vertexColors: true,
    transparent: true,
    depthTest: false, // Prevents z-fighting between particles
    depthWrite: false, // Prevents particles from occluding each other
    blending: THREE.AdditiveBlending,
    toneMapped: true
  });
}