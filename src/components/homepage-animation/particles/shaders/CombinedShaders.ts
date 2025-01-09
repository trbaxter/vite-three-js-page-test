import { vertexShader } from './VertexShader.ts';
import { fragmentShader } from './FragmentShader.ts';
import { AdditiveBlending, ShaderMaterial } from 'three';

export function CombinedShaders() {

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