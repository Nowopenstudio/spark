'use client'
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { spherePointToUV, sampleImage, initImage } from "../lib/utils-canvas";



// const Sphere = (props)=>{
//   const meshRef = useRef(null!)
//   useFrame((state, delta) => (meshRef.current.rotation.y += (delta*.25)))
//   return(
//     <mesh {...props} visible ref={meshRef}>
//       <directionalLight intensity={0.5} />
//       <sphereGeometry  args={[props.size[0], props.size[1], props.size[2]]} />
//       <meshStandardMaterial color="#000000"/>
//     </mesh>
//  )
// }

const Light = (props)=>{

  return(
    
        <spotLight color={`#${props.color}`} position={[props.position[0], props.position[1], props.position[2]]} angle={props.angle} penumbra={1} decay={props.decay} intensity={Math.PI*props.intensity} />
       
  
  )
}

const Init =()=>{
  
  const imageData= initImage('/texture/map.png')

  


  return(

      <group>
      <Dots imageData={imageData}/>
    </group>


  )
}


const Dots =({imageData})=>{
  console.log(imageData)
  const meshRef = useRef(null!)
  const DOT_DENSITY = 12;
  const RADIUS = 2
  const LATITUDE_COUNT = 190
  let dotCount=[]
  let dotGeometries = new Float32Array(19232*6)
  const vector = new THREE.Vector3();
  console.log('START')
 
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
        dotGeometry.boundingSphere.center,
        new THREE.Vector3()
      );
      const sampledPixel = sampleImage(imageData, uv);

      

      if (sampledPixel[3]) {
        // Push the positioned geometry into the array.
        dotGeometries.set([vector.x, vector.y, vector.z], (currCount * 3));
        dotCount.push(dotGeometry)
      }

      // dotGeometries.set([vector.x, vector.y, vector.z], (currCount * 3));
      // dotCount.push(dotGeometry)
      currCount += 1

      

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
    <pointsMaterial size={0.01} color="#87BFEF" sizeAttenuation depthWrite={false} />
  </points>
 
  )
}





export function Test() {


  return (
    <div className='w-full h-full fixed z-0 pointer-events-none bg-black'>
    
            <Canvas id="sphere">
            <ambientLight intensity={0.5} />
              {/* <Sphere size={[3,50,50]} position={[0,0,0]}/> */}
              <Light position={[10,15,10]} color={"F6F5E1"} angle={0.28} intensity={.75} decay={.1}/>
              <Light position={[-10,15,10]} color={"BDA9FF"} angle={0.22} intensity={.5} decay={.2}/>
              <Light position={[-2,15,-5]} color={"FF8000"} angle={0.45} intensity={.75} decay={.3}/>
              <Init />
      
           
          </Canvas>
     

    </div>
  );
};

