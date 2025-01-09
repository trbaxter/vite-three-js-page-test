export const fragmentShader =
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
  `
;
