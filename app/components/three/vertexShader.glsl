  uniform float uTime;
uniform float uProgress;
uniform vec2 uMouse;
uniform vec2 uScreen;

attribute vec3 color;
varying vec3 vColor;
varying vec2 vUv;


float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(1.5,2.233)))*
        0.003);
}



void main() {
  vUv = uv;
  vColor = color;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec2 st = modelPosition.xy;
    modelPosition.x += random( st )*.05;
  modelPosition.y +=  random( st )*.9 + (uProgress * 0.02);
    modelPosition.z += fract(sin(modelPosition.z)*1.0)/10.0;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition; 
 gl_PointSize = 35.5 * (uProgress+1.0);
}

