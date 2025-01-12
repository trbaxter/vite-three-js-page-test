export const fragmentShader =
    `
        precision lowp float;
    
        varying vec3 vColor;
        varying float vOpacity;
    
        void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            float radialAlpha = 1.0 - smoothstep(0.0, 1.0, dist);
            float alpha = radialAlpha * vOpacity * 1.25;
        
            gl_FragColor = vec4(vColor, alpha);
        }
  `
;
