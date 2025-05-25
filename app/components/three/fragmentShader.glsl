uniform vec2 uTexture;
varying vec2 vUv;
varying vec2 gl_Position;

void main() {
 
    gl_Position = projectionMatrix *
                  modelViewMatrix * vec4(vUv, 1.0 );
}
