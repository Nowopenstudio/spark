
varying vec3 vColor;

    void main()
    {
     
         float alpha = 1.0 - smoothstep(0.5, 0.5, length(gl_PointCoord - vec2(0.5,0.5)));

            //gl_FragColor = texture2D(uTexture, vUv);
            //gl_FragColor = vec4(0.93, 0.01, 0.67, alpha);
              gl_FragColor = vec4(vColor, alpha*.10);

    }