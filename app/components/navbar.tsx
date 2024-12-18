"use client"

import Link from "next/link"
import React,{useState, useEffect} from 'react';
import { ReactFlow, MiniMap, useNodesState,
  useEdgesState,
  addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useResize from "./util/useResize";
import NavBut from "./nodes/NavBut"


const nodeTypes = { navBut: NavBut };

export default function Navbar({ categories}:any){
   const initialNodes = [
      {
        id: '1',
        data: { label: <Link href={'/resources'} onClick={()=>changeSec(1)}><div className="navBut w-full h-full" style={{animationDelay:"0"}}><div>Resources</div></div></Link> },
        position: { x: 0, y: 0 },
      },
     
      {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <Link href={'/projects'} onClick={()=>changeSec(2)}><div className="navBut w-full h-full" style={{animationDelay:"200ms"}}><div>Projects</div></div></Link> },
        position: { x: 140, y: 0 },
      },
      {
        id: '3',
        data:  { label: <Link href={'/info'} onClick={()=>changeSec(3)}><div className="navBut w-full h-full" style={{animationDelay:"300ms"}}><div>Info</div></div></Link> },
        position: { x: 280, y: 0 },
      },
    ];


    const initialEdges:any = [
   {},{}
    ];

    const resourceEdges = [
      {
        type: 'smoothstep',
        animated:true,
        source: '1',
        target: '4',
        id: '1-4'
      },
      {
        type: 'smoothstep',
        animated:true,
        source: '1',
        target: '5',
        id: '1-5'
      },{
        type: 'smoothstep',
        animated:true,
        source: '1',
        target: '6',
        id: '1-6'
      },{
        type: 'smoothstep',
        animated:true,
        source: '1',
        target: '7',
        id: '1-7'
      },
    ];

   const {winX, winY, mobile} = useResize()
   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
   const [sec, setSec] = useState(0)
   const [triNodes, setTriNodes] = useState([])
   const [triEdges, setTriEdges] = useState([])
   const [resources, setResources] = useState([])
   const [secEdges, setSecEdges] = useState([])
   const [nodeX, setW] = useState(120) ;
   const [nodeGap,setGap] = useState(40);

    const newNodes =(nodeX:any, nodeGap:any, slug:any, opt:number)=>{
      let getNodes:any = [] 
      categories.map((item:any,i:any)=>{
        const singleNode = {
          id: `${i+4}`,
          type: 'navBut',
          data: { label: <Link href={`/${slug}/${item.slug.current}`} key={`cat-${i}`} onClick={()=>changeTri(i,opt,`${slug}/${item.slug.current}`)}><div className="navBut w-full h-full" ><div style={{animationDelay:`${100*i}ms`}}>{item.title}</div> </div></Link> },
          position: { x: ((nodeX + nodeGap)*opt), y: (categories.length*nodeGap)/2-(nodeGap*(i+.5)) },
        }
        getNodes.push(singleNode)
      })
      console.log('new',getNodes)
      return getNodes
    }

    const newEdges =(source:number)=>{
      let getEdges:any = []
      categories.map((item:any,i:any)=>{
        const singleEdge = {
          id: `${source}-${i+4}`,
          type: 'smoothstep',
          animated:true,
          source: `${source}`,
          target: `${i+4}`,
        }
        getEdges.push(singleEdge)
      })
   
      return getEdges
    }

  const changeSec=(sec:number)=>{
      setSec(sec)
      if(sec==0){
         setNodes(initialNodes)
      }
      else if(sec==1){
        
        setResources(newNodes(nodeX,nodeGap,"resources",-1))
        setSecEdges(newEdges(1))
       
      }
}

const changeTri=(sec:number, opt:number, slug:any)=>{
  let getTri:any = []
  let getTriEdge:any=[]
  categories[sec].articles.map((item:any,i:any)=>{
    const singleNode = {
      id: `${i+4+categories.length}`,
      type: 'navBut',
      data: { label: <Link href={`/${slug}/${item.slug}`} key={`art-${i}`} onClick={()=>undefined}><div className="navBut w-full h-full" ><div style={{animationDelay:`${100*i}ms`}} >{item.title}</div> </div></Link> },
      position: { x: ((nodeX + nodeGap)*opt)*2, y: (categories.length*nodeGap)/2-(nodeGap*(sec+.5)) },
    }
    const singleEdge = {
      id: `${sec+4}-${i+4+categories.length}`,
      type: 'smoothstep',
      animated:true,
      source: `${sec+4}`,
      target: `${i+4+categories.length}`,
    }
    getTri.push(singleNode)
    getTriEdge.push(singleEdge)
  })

  setTriNodes(getTri)
  setTriEdges(getTriEdge)
  
}


useEffect(()=>{
  if(resources.length > 0){
    console.log(resources)
    setNodes([...initialNodes,...resources,...triNodes])
    console.log('nw',nodes)
  }
  if(secEdges.length > 0){
    setEdges([...secEdges,...triEdges])
  }

},[resources, secEdges, triEdges, triNodes])
     

    return(

      <div className="fixed w-dvw h-dvh" style={{width:winX, height:winY}}>
        <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} fitView zoomOnScroll={false}>
        <MiniMap maskColor={"rgb(135, 191, 239, 0.0)"} nodeColor={'rgb(135, 191, 239, 0)'} nodeStrokeColor={"rgb(135, 191, 239, 1.0)"} nodeStrokeWidth={3} nodeClassName={"miniMap"} zoomable pannable />
        </ReactFlow>
      </div>
    );
}