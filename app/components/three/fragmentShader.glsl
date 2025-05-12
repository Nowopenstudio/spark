varying vec2 vUv;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);


void main() {
 
   float alpha = 1. - smoothstep(0.57, 0.576, length(gl_PointCoord - vec2(0.5,0.5)));
  gl_FragColor = vec4(0.93, 0.01, 0.67, alpha);
}
