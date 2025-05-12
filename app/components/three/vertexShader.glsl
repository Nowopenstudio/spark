uniform float uTime;
uniform float uProgress;
uniform vec2 uMouse;
uniform vec2 uScreen;

varying vec2 vUv;



void main() {

  vUv = uv;
 
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
 
    modelPosition.x += sin(modelPosition.x * 1.2 + ( uTime / 20.0 ) * 2.0) * 0.2;
    modelPosition.y += sin(modelPosition.z * 2.0 + (uTime / 20.0) * 2.0) * 0.2 + (uProgress * 0.02);
    modelPosition.z += uProgress * 0.02;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
 gl_PointSize = 8.0 + (( (-(uMouse.x - uScreen.x)/uScreen.x)) * modelPosition.x * 2.4) + (( (-(uMouse.y - uScreen.y)/uScreen.y)) * modelPosition.y * 2.4) + (uProgress*3.0);
}

