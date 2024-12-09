'use client'

import { useGLTF, MeshTransmissionMaterial, Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef} from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { spherePointToUV, sampleImage } from "../lib/utils-canvas";


import { EffectComposer, Bloom, LUT, BrightnessContrast, HueSaturation, ToneMapping } from '@react-three/postprocessing'
import {  ToneMappingMode } from 'postprocessing'


export default function Logo(props:any) {
  const groupRef = useRef<any>(null!)
  const { nodes, materials } = useGLTF('/models/logo.gltf')
  const standard = new THREE.MeshStandardMaterial

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.cos(t / 2) / 20 + 0.25, 0.1)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, Math.sin(t / 4) / 20, 0.1)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, Math.sin(t / 8) / 20, 0.1)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, (Math.sin(t /2)) / 8, 0.1)
  })
  console.log(nodes)
  return (
    <group ref={groupRef} {...props} dispose={null} position={[0,0,0]}>
      <mesh geometry={nodes.Remesh.geometry || []} scale={.028} material-emissive="red" material-roughness={1}>
      <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          samples={16}
          thickness={0.2}
          anisotropicBlur={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          clearcoat={1}
          envMapIntensity={0.5}
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
  
  const source = '/texture/map.png'
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
  const meshRef = useRef<any>({})
  const DOT_DENSITY = 10;
  const RADIUS = 2
  const LATITUDE_COUNT = 240
  const dotCount=[]
  const dotGeometries = new Float32Array(19232*6)
  const vector = new THREE.Vector3();
// A hexagon with a radius of 2 pixels looks like a circle

  var currCount = 0


  for (let lat = 0; lat < LATITUDE_COUNT;lat +=1 ) {
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
        dotCount.push(dotGeometry)
        currCount += 1
      }

      // dotGeometries.set([vector.x, vector.y, vector.z], (currCount * 3));
      // dotCount.push(dotGeometry)

      

  }
}

  useFrame((state, delta) => {
    const { clock } = state;
    
    for (let i = 0; i < currCount; i++) {
      const i3 = i * 3;


      meshRef.current.geometry.attributes.position.array[i3] += Math.sin(clock.elapsedTime + Math.random() * 10) * 0.001;
      meshRef.current.geometry.attributes.position.array[i3 + 1] += Math.cos(clock.elapsedTime + Math.random() * 10) * 0.001;
      meshRef.current.geometry.attributes.position.array[i3 + 2] += Math.sin(clock.elapsedTime + Math.random() * 20) * 0.001;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y += (delta*.1)
  });


  return (
      
  <points ref={meshRef} position={[0,0,2]}>
    <bufferGeometry>
      <bufferAttribute
        attach={"attributes-position"}
        array={dotGeometries}
        count={dotGeometries.length/3}
        itemSize={3}
      />
    </bufferGeometry>
    <pointsMaterial size={0.007} color="#87BFEF" sizeAttenuation depthWrite={false} />
  </points>
 
  )
}





export function Test() {


  return (
    <div className='w-full h-full fixed z-0 pointer-events-none bg-[var(--dark)]'>
    
            <Canvas id="sphere">
            <ambientLight intensity={0.5} />
              {/* <Sphere size={[3,50,50]} position={[0,0,0]}/> */}
              <Light position={[10,15,10]} color={"F6F5E1"} angle={0.28} intensity={.75} decay={.1}/>
              <Light position={[-10,15,10]} color={"BDA9FF"} angle={0.22} intensity={.5} decay={.2}/>
              <Light position={[-2,15,-5]} color={"FF8000"} angle={0.45} intensity={.75} decay={.3}/>
              <Environment files="/texture/bg.hdr" resolution={512}>
                <group rotation={[0, 0, 0]}>
                  <Lightformer form="circle" intensity={10} position={[2, 6, -10]} scale={30} onUpdate={(self) => self.lookAt(0, 0, 0)} />
                  <Lightformer intensity={0.1} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[-0, 1, -1]} rotation-y={Math.PI / 2} scale={[50, 10, 1]} />
                  <Lightformer intensity={0.1} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 1, 0]} rotation-y={-Math.PI / 2} scale={[50, 10, 1]} />
                  <Lightformer color="white" intensity={0.2} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[-20, 1, 0]} scale={[20, 100, 1]} />
                </group>
              </Environment>
              <Init />
              {/* <FlowChart /> */}
              <Logo/>
        
              <EffectComposer >
                <Bloom mipmapBlur luminanceThreshold={1} intensity={1} />
                <BrightnessContrast brightness={0} contrast={0.01} />
                <HueSaturation hue={0} saturation={-0.25} />
                <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
              </EffectComposer>
      
           
          </Canvas>
     

    </div>
  );
};

