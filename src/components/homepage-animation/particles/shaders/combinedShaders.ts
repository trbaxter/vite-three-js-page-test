import { vertexShader } from './vertexShader.ts';
import { fragmentShader } from './fragmentShader.ts';
import { AdditiveBlending, ShaderMaterial } from 'three';

export function combinedShaders() {

  return new ShaderMaterial(
    {
      vertexShader,
      fragmentShader,
      vertexColors: true,
      transparent: true,
      depthTest: false, // Prevents z-fighting between particles
      depthWrite: false, // Prevents particles from occluding each other
      blending: AdditiveBlending,
      toneMapped: true
    }
  );

}