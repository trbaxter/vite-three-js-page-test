/*
  Shader configuration for particles in the homepage animation.
 */

import * as THREE from 'three';

export function createParticleMaterial() {
  const vertexShader =
    `
    precision lowp float;
  
    attribute float size;
    attribute float opacity;
    
    varying vec3 vColor;
    varying float vOpacity;

    void main() {
      vColor = color;
      vOpacity = opacity;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z); 
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader =
    `
    precision lowp float;
  
    varying vec3 vColor;
    varying float vOpacity;

    void main() {
      // Calculate the distance from the center of the particle
      float dist = length(gl_PointCoord - vec2(0.5));

      // Create a radial falloff for the particle alpha
      float radialAlpha = 1.0 - smoothstep(0.0, 1.0, dist);
      
      // Combine radialAlpha with the particle's opacity
      float alpha = radialAlpha * vOpacity * 1.25;
      
      // Set the fragment color with blending
      gl_FragColor = vec4(vColor, alpha);
    }
  `;

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