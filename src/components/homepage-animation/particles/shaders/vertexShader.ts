export const vertexShader =
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
  `
;