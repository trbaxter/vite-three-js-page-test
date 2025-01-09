import * as THREE from 'three';
import { vertexShader } from './VertexShader.ts';
import { fragmentShader } from './FragmentShader.ts';

export function CombinedShaders() {
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