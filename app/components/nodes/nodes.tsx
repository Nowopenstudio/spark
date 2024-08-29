import * as THREE from 'three'
import { createContext, useMemo, useRef, useState, useContext, useLayoutEffect, forwardRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { QuadraticBezierLine, Text, HTML } from '@react-three/drei'
import { useDrag } from '@use-gesture/react'
import { Marker } from './markers'

const context = createContext()
const Circle = forwardRef(({ children, opacity = 0 , radius = 0, segments = 0, color = '#87BFEF', ...props }, ref) => (
  <mesh ref={ref} {...props}>
    <circleGeometry args={[radius, segments]} />
    <meshBasicMaterial transparent={opacity < 1} opacity={opacity} color={color} />
    {children}
  </mesh>
))

export function Nodes({ children }) {
  const group = useRef()
  const [nodes, set] = useState([])
  const lines = useMemo(() => {
    const lines = []
    for (let node of nodes)
      node.connectedTo
        .map((ref) => [node.position, ref.current.position])
        .forEach(([start, end]) => lines.push({ start: start.clone().add({ x: 0.35, y: 0, z: 0 }), end: end.clone().add({ x: -0.35, y: 0, z: 0 }) }))
    return lines
  }, [nodes])
  useFrame((_, delta) => group.current.children.forEach((group) => (group.children[0].material.uniforms.dashOffset.value -= delta * 10)))
  return (
    <context.Provider value={set}>
      <group ref={group}>
        {lines.map((line, index) => (
          <group>
            <QuadraticBezierLine key={index} {...line} color="#87BFEF" dashed dashScale={20} lineWidth={3} gapSize={2} />
           
          </group>
        ))}
      </group>
      {children}
      {lines.map(({ start, end }, index) => (
        <group key={index} position-z={1}>
          <Circle position={start} />
          <Circle position={end} />
        </group>
      ))}
    </context.Provider>
  )
}

export const Node = forwardRef(({ color = 'black', name, connectedTo = [], position = [0, 0, 0], ...props }, ref) => {
  const set = useContext(context)
  const { size, camera } = useThree()
  const [pos, setPos] = useState(() => new THREE.Vector3(...position))
  const state = useMemo(() => ({ position: pos, connectedTo }), [pos, connectedTo])
  // Register this node on mount, unregister on unmount
  useLayoutEffect(() => {
    set((nodes) => [...nodes, state])
    return () => void set((nodes) => nodes.filter((n) => n !== state))
  }, [state, pos])
  // Drag n drop, hover
  const [hovered, setHovered] = useState(false)
  useEffect(() => void (document.body.style.cursor = hovered ? 'grab' : 'auto'), [hovered])
  const bind = useDrag(({ down, xy: [x, y] }) => {
    document.body.style.cursor = down ? 'grabbing' : 'grab'
    setPos(new THREE.Vector3((x / size.width) * 2 - 1, -(y / size.height) * 2 + 1, 0).unproject(camera).multiply({ x: 24, y: 24, z: 0 }).clone())
  })
  return (
    <Circle ref={ref}  opacity={0} radius={0.0} color={color} position={pos} {...props}>
        <Marker rotation={[0, Math.PI / 2, 0]} position={[-1, .24, 0]} >
            {(name !== "SPARK")?(
                                <p {...bind()} className="w-[180px] text-center navItem uppercase bold px-2.5 py-2.5  border border-solid rounded-full border-[var(--blue)] text-black bg-[var(--blue)] touch-none">{name}</p>

            ):('')}
         </Marker>
      
        
      </Circle>
  
  )
})
