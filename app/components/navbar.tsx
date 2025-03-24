"use client"

import Link from "next/link"
import React,{useState, useEffect, useCallback} from 'react';
import { ReactFlow, MiniMap, useNodesState, useEdgesState,addEdge,useReactFlow,ReactFlowProvider, useViewport } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useResize from "./util/useResize";
import NavBut from "./nodes/NavBut"
import NavTitle from "./nodes/NavTitle";



const nodeTypes = { navBut: NavBut, navTitle: NavTitle};

function Flow({ categories, projects}:{categories:any,projects:any}){
   const initialNodes = [
      {
        id: '1',
        data: { label: <Link href={'/resources'} onClick={()=>changeSec(1)}><div className="navBut w-full h-full" style={{animationDelay:"0"}}><div>Resources</div></div></Link> },
        type: 'navBut',
        position: { x: 0, y: 0 },
      },
     
      {
        id: '2',
        type: 'navBut',
        // you can also pass a React component as a label
        data: { label: <Link href={'/projects'} onClick={()=>changeSec(2)}><div className="navBut w-full h-full" style={{animationDelay:"200ms"}}><div>Projects</div></div></Link> },
        position: { x: 0, y: 40 },
      },
      {
        id: '3',
        type: 'navBut',
        data:  { label: <Link href={'/info'} onClick={()=>changeSec(3)}><div className="navBut w-full h-full" style={{animationDelay:"300ms"}}><div>Info</div></div></Link> },
        position: { x: 0, y: 80 },
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
   const [view, useView] = useState({x:winX/2,y:winY/2,zoom:2})
   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
   const [sec, setSec] = useState(0)
   const [triNodes, setTriNodes] = useState([])
   const [triEdges, setTriEdges] = useState([])
   const [titleNodes, setTitleNodes] = useState([])
   const [titleEdges, setTitleEdges] = useState([])
   const [resources, setResources] = useState([])
   const [secEdges, setSecEdges] = useState([])
   const [nodeX, setW] = useState(120) ;
   const [nodeGap,setGap] = useState(40);
   const {setCenter} = useReactFlow();



    const moveView=(x:number,y:number)=>{
  
 
      setCenter(x, y, { zoom:2, duration: 1000 });
    }

    const newNodes =(items:any, nodeX:any, nodeGap:any, slug:any, opt:number)=>{
      setTitleEdges([])
      setTitleNodes([])
      const getNodes:any = [] 
      items.map((item:any,i:any)=>{
        const singleNode = {
          id: `${i+4}`,
          type: 'navBut',
          data: { label: <Link href={`/${slug}/${item.slug.current}`} key={`cat-${i}`} onClick={()=>changeTri(items,item,i,opt,`${slug}/${item.slug.current}`,-200,0)}><div className="navBut w-full h-full" ><div style={{animationDelay:`${100*i}ms`}}>{item.title}</div> </div></Link> },
          position: { x: ((nodeX + (nodeGap*2))*opt), y: (items.length*nodeGap)/2-(nodeGap*(i+.5)) },
        }
        getNodes.push(singleNode)
      })
      console.log('new',getNodes)
      return getNodes
    }

    const newEdges =(source:number, items:any)=>{
      const getEdges:any = []
      items.map((item:any,i:any)=>{
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


  // Main Menu Section
  const changeSec=(sec:number)=>{
      
      setSec(sec)
      if(sec==0){
        setResources([])
        setSecEdges([])
        setTriNodes([])
        setTriEdges([])
         setNodes(initialNodes)
         moveView(0,0)
      }
      else if(sec==1){
        setResources([])
        setSecEdges([])
        setTriNodes([])
        setTriEdges([])
        setResources(newNodes(categories,nodeX,nodeGap,"resources",-1))
        setSecEdges(newEdges(1,categories))
        moveView(-100,0)
       
      }
      else if(sec==2){
        setResources([])
        setSecEdges([])
        setTriNodes([])
        setTriEdges([])
        setResources(newNodes(projects,nodeX,nodeGap,"projects",-1))
        setSecEdges(newEdges(2,projects))
        moveView(-100,0)
       
      }
      else if(sec==3){
        
        setNodes(initialNodes)
        moveView(-100,0)
       
      }
}

const changeTri=(items:any,item:any,sec:number, opt:number, slug:any, x:number, y:number)=>{
  moveView(x,y)
  
  const getTri:any = []
  const getTriEdge:any=[]
  if(item.articles){
    items[sec].articles.map((item:any,i:any)=>{
      const singleNode = {
        id: `${i+4+categories.length}`,
        type: 'navBut',
        data: { label: <Link href={`/${slug}/${item.slug}`} key={`art-${i}`} onClick={()=>changeTitle(sec,i,opt,-500,100)}><div className="navBut w-full h-full" ><div style={{animationDelay:`${100*i}ms`}} >{item.title}</div> </div></Link> },
        position: { x: ((nodeX + nodeGap*2)*opt)*2, y: (categories[sec].articles.length*nodeGap)/2-(nodeGap*(i+.5)) },
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
    setTitleEdges([])
  setTitleNodes([])
  setTriNodes(getTri)
  setTriEdges(getTriEdge)
  }
  
  

  
}

const changeTitle=(cat:number, art:number,opt:number, x:number, y:number)=>{
  moveView(x,y)
  setTitleEdges([])
  setTitleNodes([])
  const getTri:any = []
  const getTriEdge:any=[]
  const item = categories[cat].articles[art]
  const titleNode={
    id: `${art+4+categories.length}`,
    type: 'navTitle',
    data: { title: item.title, author:item.author, intro:item.intro,date:item._createdAt},
    position: { x: ((nodeX + nodeGap)*opt)*4, y: (categories[cat].articles.length*nodeGap)/3},
  }
  const titleEdge = {
    id: `${cat+4}${art+4+categories.length}`,
    type: 'smoothstep',
    animated:true,
    source: `${cat+4}`,
    target: `${art+4+categories.length}`,
  }
  getTri.push(titleNode)
  getTriEdge.push(titleEdge)
  setTitleEdges(getTriEdge)
  setTitleNodes(getTri)



}

useEffect(()=>{
 
  if(titleEdges.length === 1){
    setNodes([...initialNodes,...resources,...triNodes,...titleNodes])
    setEdges([...secEdges,...triEdges,titleEdges[0]])}
    else{
      setNodes([...initialNodes,...resources,...triNodes])
      setEdges([...secEdges,...triEdges])
    }
  console.log(edges)
  
},[resources, secEdges, triEdges, triNodes, titleNodes, titleEdges])
     

    return(

        
        <ReactFlow nodeTypes={nodeTypes}  nodes={nodes} edges={edges} fitView zoomOnScroll={false}>
          {/* <MiniMap maskColor={"rgb(135, 191, 239, 0.0)"} nodeColor={'rgb(135, 191, 239, 0)'} nodeStrokeColor={"rgb(135, 191, 239, 1.0)"} nodeStrokeWidth={3} nodeClassName={"miniMap"} zoomable pannable /> */}
        </ReactFlow>


      
    );
}

 
export default function NavBar({categories, projects}:{categories:any,projects:any}){

  return(
  <div className="fixed z-[50] w-[100vw] h-[100dvh]">
  <ReactFlowProvider>
      <Flow categories={categories} projects={projects} />
  </ReactFlowProvider></div>
  )
}