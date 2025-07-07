// @ts-nocheck
'use client'

import { useGLTF, MeshTransmissionMaterial, Environment, Lightformer, CameraControls,Points, Point, PointMaterial, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {useRef, useEffect,useState, useMemo, useCallback } from "react";
import * as THREE from "three";
import { TextureLoader, SRGBColorSpace, Vector2 } from "three";
import { spherePointToUV, sampleImage } from "../../lib/utils-canvas";
import { EffectComposer, Bloom, Noise} from '@react-three/postprocessing'
import {  ToneMappingMode } from 'postprocessing'
import vertexShader from "!!raw-loader!./vertexShader.glsl";
import fragmentShader from "!!raw-loader!./fragmentShader.glsl";


export default function Logo(props:any) {
  const groupRef = useRef<any>(null!)
  const { nodes, materials } = useGLTF('/models/logo.gltf')
  const standard = new THREE.MeshStandardMaterial



  return (
    <group ref={groupRef} {...props} dispose={null} position={[-1.5,.2,2.0]}>
      <mesh geometry={nodes.Remesh.geometry || []} scale={.018} material-emissive="red" material-roughness={0}>
      <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          samples={8}
          thickness={0.5}
          anisotropicBlur={0.5}
          iridescence={.9}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          clearcoat={1}
          envMapIntensity={0.1}
        />
      </mesh>
  
     
    </group>
  )
}



const Light = (props:any)=>{

  return(
    
        <spotLight color={`#${props.color}`} position={[props.position[0], props.position[1], props.position[2]]} angle={props.angle} penumbra={1} decay={props.decay} intensity={Math.PI*props.intensity} />
       
  
  )
}

const Init =()=>{
  
  const source = '/texture/green2.png'
  const wMap = useLoader(TextureLoader, source)
  
  const tempCanvas = document.createElement("canvas");
  
  tempCanvas.width = wMap.image.width;
  tempCanvas.height = wMap.image.height;
  
  const ctx = tempCanvas.getContext("2d");
  ctx!.drawImage(wMap.image, 0, 0);
  const imageData = ctx!.getImageData(0, 0, wMap.image.width, wMap.image.height);

  


  return(

      <group>
      <Dots imageData={imageData}/>
    </group>


  )
}


const Dots =({imageData}: any)=>{
  const meshRef = useRef<any>(null)
  const DOT_DENSITY = 8;
  const RADIUS = 2.0
  const LATITUDE_COUNT = 85
  const dotCount=[]
  const colorCount=[]
  const dotGeometries = new Float32Array(4000*3)
  const dotColor = new Float32Array(4000*3)
  const vector = new THREE.Vector3();
    const [currX,setX]=useState()
  const [currY,setY]=useState()
  const mousePosition = useRef({ x: 0, y: 0 });
  const introProgress = useRef(100);

  const updateMousePosition = useCallback((e) => {

    mousePosition.current = { x: e.clientX, y: e.clientY };
  }, []);
// A hexagon with a radius of 2 pixels looks like a circle


  let currCount = 0
  const texture = useTexture('/texture/map.png');
    const color = useTexture('/texture/green.png');

  for (let lat = 0; lat < LATITUDE_COUNT;lat ++ ) {
  const radius =Math.cos((-90 + (180 / LATITUDE_COUNT) * lat) * (Math.PI / 180)) * RADIUS;
  const latitudeCircumference = radius * Math.PI * 2 * 2;
  const latitudeDotCount = Math.ceil(latitudeCircumference * DOT_DENSITY);


  for (let dot = 0; dot < latitudeDotCount; dot += 1){
    const dotGeometry = new THREE.CircleGeometry(2, 5);
    const phi = (Math.PI / LATITUDE_COUNT) * lat;
    const theta = ((2* Math.PI)/latitudeDotCount) * dot;
      vector.setFromSphericalCoords(RADIUS, phi, theta);
  
      dotGeometry.lookAt(vector);
      dotGeometry.translate(vector.x, vector.y, vector.z);
      dotGeometry.computeBoundingSphere();

      const uv = spherePointToUV(
        dotGeometry.boundingSphere!.center,
        new THREE.Vector3()
      );
      const sampledPixel = sampleImage(imageData, uv);

      

      if (sampledPixel[3]) {
        // Push the positioned geometry into the array.
        dotGeometries.set([vector.x, vector.y, vector.z], (currCount * 3));
        dotColor.set([sampledPixel[0]/255, sampledPixel[1]/255, sampledPixel[2]/255], (currCount * 3));
        dotCount.push(dotGeometry)
        colorCount.push(dotColor)
        currCount += 1
      }

      // dotGeometries.set([vector.x, vector.y, vector.z], (currCount * 3));
      // dotCount.push(dotGeometry)

      

  }
 
   
}
//   useEffect(() => {

//   sprite.colorSpace = SRGBColorSpace
// }, [])

  const uniforms = useMemo(() => ({
    uTime: {
      value: 0.0
    },
    uTexture:{
      value:color
    },
    uProgress: {
      value: 8.0
    },
    uMouse: { value: new Vector2(0, 0) },
    uScreen: { value: new Vector2(window.innerWidth/2, window.innerHeight/2) },
  }), [])
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);


  useFrame((state, delta) => {
    const { clock,mouse} = state;
    
    // for (let i = 0; i < currCount; i++) {
    //   const i3 = i * 3;
       meshRef.current.material.uniforms.uTime.value = clock.elapsedTime;
    if(clock.elapsedTime < 3 )
      {meshRef.current.material.uniforms.uProgress.value = clock.elapsedTime - 3}
    meshRef.current.material.uniforms.uMouse.value = new Vector2(
      mousePosition.current.x,
      mousePosition.current.y
    );

    //   meshRef.current!.geometry.attributes.position.array[i3] += Math.sin(clock.elapsedTime + Math.random() * 10) * 0.001;
    //   meshRef.current!.geometry.attributes.position.array[i3 + 1] += Math.cos(clock.elapsedTime + Math.random() * 10) * 0.001;
    //   meshRef.current!.geometry.attributes.position.array[i3 + 2] += Math.sin(clock.elapsedTime + Math.random() * 20) * 0.001;
    // }
    
    meshRef.current!.geometry.attributes.position.needsUpdate = true;
    meshRef.current!.geometry.attributes.color.needsUpdate = true;
    meshRef.current!.rotation.y += (delta*.1)
  });


  return (
      
  <points ref={meshRef} position={[0,0,3]}>
    <bufferGeometry>
      <bufferAttribute
        attach={"attributes-position"}
        array={dotGeometries}
        count={dotGeometries.length/3}
        itemSize={3}
      />
       <bufferAttribute
        attach={"attributes-color"}
        array={dotColor}
        count={dotColor.length/3}
        itemSize={3}
      />
    </bufferGeometry>
    <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          depthTest={true}
        />
    
  </points>
 
  )
}





export function Test() {


  return (
    <div className='w-full h-full fixed z-0 pointer-events-none bg-[var(--dark)]'>
    
            <Canvas id="sphere">
            <ambientLight intensity={0.7} />
              {/* <Sphere size={[3,50,50]} position={[0,0,0]}/> */}
             
              <Environment files="/texture/bg.hdr" resolution={32}>
                <group rotation={[0, 0, 4]} position={[0,0,5]}>
                  <Lightformer form="circle" intensity={.8} position={[2, 6, -10]} scale={30} onUpdate={(self) => self.lookAt(0, 0, 0)} />
                  <Lightformer intensity={0.3} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[-0, 1, -1]} rotation-y={Math.PI / 2} scale={[50, 10, 1]} />
                  <Lightformer intensity={0.5} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 1, 0]} rotation-y={-Math.PI / 2} scale={[50, 10, 1]} />
                  <Lightformer color="white" intensity={0.2} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[-20, 1, 0]} scale={[20, 100, 1]} />
                </group>
              </Environment>
              <Init />
          
              <Logo/>
        
              <EffectComposer >
              
                <Bloom mipmapBlur luminanceThreshold={.7} intensity={0.3} />
                {/* <Scanline opacity={.5}/>
                 */}
                {/* <ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> */}
                {/* <Noise opacity={.2} /> */}
                

              </EffectComposer>
      
           
          </Canvas>
     

    </div>
  );
};

