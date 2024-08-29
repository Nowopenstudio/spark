import { useState, createRef } from 'react'
import { Nodes, Node } from './nodes'

export default function FlowChart() {
  const [[a, b, c, d,e,f,g,h]] = useState(() => [...Array(8)].map(createRef))
  return (
    
      <Nodes>
           <Node ref={a} name="SPARK" color="#87BFEF" position={[-0, 0, 0]} connectedTo={[b, c, d]}/>
        <Node ref={b} name="INFO" color="#87BFEF" position={[4, -1.5, 0]} />
        <Node ref={c} name="PROJECTS" color="#87BFEF" position={[4, 1.5, 0]} />
        <Node ref={d} name="RESOURCES" color="#87BFEF" position={[-2, 0, 0]} connectedTo={[e, f, g, h]}/>
        <Node ref={e} name="SURVIVAL" color="#87BFEF" position={[-4, -1.5, 0]} />
        <Node ref={f} name="SELF-GOVERNANCE" color="#87BFEF" position={[-4, -.5, 0]} />
        <Node ref={g} name="COOPERATIVES" color="#87BFEF" position={[-4, .5, 0]} />
        <Node ref={h} name="PERMACULTURE" color="#87BFEF" position={[-4, 1.5, 0]} />
      </Nodes>
 
  )
}
