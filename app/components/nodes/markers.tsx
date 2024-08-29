import * as THREE from 'three'
import { useState, useRef } from 'react'
import {useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'


export function Marker({ children, ...props }) {
    const ref = useRef()
    // This holds the local occluded state
    const [isInRange, setInRange] = useState()
 
    // Test distance
    const vec = new THREE.Vector3()
    useFrame((state) => {
      const range = state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10
      if (range !== isInRange) setInRange(range)
    })
    return (
      <group ref={ref}>
        <Html
         
          // We just interpolate the visible state into css opacity and transforms
          style={{ transition: 'all 0.2s', transform: `scale(1)` }}
          {...props}>
          {children}
        </Html>
      </group>
    )
  }