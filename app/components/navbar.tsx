"use client"

import Link from "next/link"
import React,{useState, useEffect, useCallback} from 'react';
import { ReactFlow, MiniMap, useNodesState, useEdgesState,addEdge,useReactFlow,ReactFlowProvider, useViewport } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useResize from "./util/useResize";
import NavBut from "./nodes/NavBut"
import NavBack from "./nodes/NavBack";
import NavTitle from "./nodes/NavTitle";
import { useParams, usePathname } from "next/navigation";
import { filterIndex } from "./util/sanity";



const nodeTypes = { navBut: NavBut, navTitle: NavTitle, navBack:NavBack};

function Flow({page, params, categories, projects,info,mobile,winX,winY}:{params:any,page:any,categories:any,projects:any,info:any,mobile:any,winX:any,winY:any}){
 
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
  
   const [view, useView] = useState({x:winX/2,y:winY/2,zoom:2})
   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
   const [sec, setSec] = useState(0)
   const [active, setActive] = useState(true)
   const [triNodes, setTriNodes] = useState([])
   const [triEdges, setTriEdges] = useState([])
   const [titleNodes, setTitleNodes] = useState([])
   const [titleEdges, setTitleEdges] = useState([])
   const [resources, setResources] = useState([])
   const [secEdges, setSecEdges] = useState([])
   const [nodeX, setW] = useState(120) ;
   const [nodeGap,setGap] = useState(40);
   const {setCenter} = useReactFlow();
   let timer:any = null


   useEffect(()=>{
    if(page.includes('resources')){
      changeSec(1)
      timer = window.setInterval(()=>moveView(-140,60), 500)
      if(params.catSlug){
        const index = filterIndex(categories,"slug",params.catSlug)
        changeTri(categories,categories[index!],index!,-1,`resources/${categories[index!].slug}`,-320,60)
        timer = window.setInterval(()=>moveView(-320,60), 1000)
        if(params.slug){
          const art = filterIndex(categories[index!].articles,"slug",params.slug)
          changeTitle(1,sec,art!,-1,`resources/`,-500,220)
         timer = window.setInterval(()=>moveView(-500,220), 1000)
        }
      }

    }else if(page.includes('projects')){
      changeSec(2)
      timer = window.setInterval(()=>moveView(-140,60), 500)
      if(params.slug){
        const pro = filterIndex(projects,"slug",params.slug)
        changeTitleSingle(projects,1,sec,pro!,-1,'projects',-320,200)
        timer = window.setInterval(()=>moveView(-320,200), 500)
      }
    }else if(page.includes('info')){
      changeSec(3)
      timer = window.setInterval(()=>moveView(-140,60), 500)
      const curr =  page.split('/')[2]
      if(curr){
        const pro = filterIndex(info,"slug",curr)
        changeTitleSingle(info,1,sec,pro!,-1,'info',-320,200)
        timer = window.setInterval(()=>moveView(-320,200), 500)
      }
    }
  
  },[])


    const moveView=(x:number,y:number)=>{
  
      clearInterval(timer)
      setCenter(x, y, { zoom:2, duration: 1000 });
    }

    // Main Menu Section
  const changeSec=(sec:number)=>{
    setActive(true)
    setSec(sec)
    if(sec==0){
      setEdges([])
      setResources([])
      setSecEdges([])
      setTriNodes([])
      setTriEdges([])
      setTitleEdges([])
      setTitleNodes([])
      
       setNodes(initialNodes)
       moveView(60,60)
    }
    else if(sec==1){
      setEdges([])
      setResources([])
      setSecEdges([])
      setTriNodes([])
      setTriEdges([])
      setTitleEdges([])
      setTitleNodes([])
      setResources(newNodes(categories,nodeX,nodeGap,"resources",-1))
      setSecEdges(newEdges(1,categories))
      moveView(-140,60)
     
    }
    else if(sec==2){
      setEdges([])
      setResources([])
      setSecEdges([])
      setTriNodes([])
      setTriEdges([])
      setTitleEdges([])
      setTitleNodes([])
      setResources(newSingle(projects,nodeX,nodeGap,sec,"projects",-1))
      setSecEdges(newEdges(2,projects))
      moveView(-140,60)
     
    }
    else if(sec==3){
      setResources([])
      setSecEdges([])
      setTriNodes([])
      setTriEdges([])
      setTitleEdges([])
      setTitleNodes([])
      setNodes(initialNodes)
      moveView(-140,60)
      setResources(newSingle(info,nodeX,nodeGap,sec,"info",-1))
      setSecEdges(newEdges(3,info))
     
    }
    
}

const changeActive=(sec:number,x:number,y:number,active:boolean)=>{
moveView(x,y)
setActive(active)

}
    // newResources
    const newNodes =(items:any, nodeX:any, nodeGap:any, slug:any, opt:number)=>{
      setActive(true)
      setTriEdges([])
      setTriNodes([])
      setTitleEdges([])
      setTitleNodes([])
      const getNodes:any = [] 
      items.map((item:any,i:any)=>{
        const singleNode = {
          id: `${i+4}`,
          type: 'navBut',
          data: { label: <Link href={`/${slug}/${item.slug}`} key={`cat-${i}`} onClick={()=>changeTri(items,item,i,opt,`${slug}/${item.slug}`,-320,60)}><div className="navBut w-full h-full" ><div style={{animationDelay:`${100*i}ms`}}>{item.title}</div> </div></Link> },
          position: { x: ((nodeX + (nodeGap*2))*opt), y: (items.length*nodeGap)/2-(nodeGap*(i+.5)) },
        }
        getNodes.push(singleNode)
      })
      if(mobile){
        const backNode = {
          id: `${4+(items.length)}`,
          type: 'navBut',
          data: { label: <Link href={`/${slug}`} key={`cat-back`} onClick={()=>moveView(60,60)}><div className="navBut backBut w-full h-full" ><div style={{animationDelay:`${100*items.length}ms`}}>→</div> </div></Link> },
          position: { x: ((nodeX + (nodeGap*2))*opt), y: (items.length*nodeGap+1)/2-(nodeGap*((-1)+.5))},
        }
        getNodes.push(backNode)
      }
      return getNodes
    }

    const newEdges =(source:number, items:any)=>{
      const getEdges:any = []
    
      if(mobile){
        const backEdge = {
          id: `${source}-${(items.length)+4}`,
          type: 'smoothstep',
          animated:true,
          source: `${source}`,
          target: `${(items.length)+4}`,
        }
        getEdges.push(backEdge)
      }
     
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

    const newSingle =(items:any, nodeX:any, nodeGap:any,sec:number, slug:any, opt:number)=>{
      setTriEdges([])
      setTriNodes([])
      setTitleEdges([])
      setTitleNodes([])
      setActive(true)
      const getNodes:any = [] 
      items.map((item:any,i:any)=>{
        const singleNode = {
          id: `${i+4}`,
          type: 'navBut',
          data: { label: <Link href={`/${slug}/${item.slug}`} key={`cat-${i}`} onClick={()=>changeTitleSingle(items,1,sec,i,opt,slug,-320,200)}><div className="navBut w-full h-full" ><div style={{animationDelay:`${100*i}ms`}}>{item.title}</div> </div></Link> },
          position: { x: ((nodeX + (nodeGap*2))*opt), y: (items.length*nodeGap)/2-(nodeGap*(i+.5)) },
        }
        getNodes.push(singleNode)
      })
      if(mobile){
        const backNode = {
          id: `${items.length+4}`,
          type: 'navBut',
          data: { label: <Link href={`/${slug}`} key={`single-back`} onClick={()=>moveView(60,60)}><div className="navBut backBut w-full h-full" ><div style={{animationDelay:`${100*items.length}ms`}}>→</div> </div></Link> },
          position: {  x: ((nodeX + (nodeGap*2))*opt), y: (items.length*nodeGap)/2-(nodeGap*(-1+.5))},
        }
        getNodes.push(backNode)
      }
      console.log('new',getNodes)
      return getNodes
    }


  

const changeTri=(items:any,item:any,sec:number, opt:number, slug:any, x:number, y:number)=>{
  setTriEdges([])
  setTitleEdges([])
  moveView(x,y)
  setActive(true)
  
  const getTri:any = []
  const getTriEdge:any=[]
  if(item.articles){
    items[sec].articles.map((item:any,i:any)=>{
      const singleNode = {
        id: `${i+4+categories.length+mobile}`,
        type: 'navBut',
        data: { label: <Link href={`/${slug}/${item.slug}`} key={`art-${i}`} onClick={()=>changeTitle(1,sec,i,opt,slug,-500,220)}><div className="navBut w-full h-full" ><div style={{animationDelay:`${100*i}ms`}} >{item.title}</div> </div></Link> },
        position: { x: ((nodeX + nodeGap*2)*opt)*2, y: (categories[sec].articles.length*nodeGap)/2-(nodeGap*(i+.5)) },
      }
      const singleEdge = {
        id: `${sec+4}-${i+4+categories.length+mobile}`,
        type: 'smoothstep',
        animated:true,
        source: `${sec+4}`,
        target: `${i+4+categories.length+mobile}`,
      }
      getTri.push(singleNode)
      getTriEdge.push(singleEdge)
    })
    if(mobile || (items[sec].articles.length == 0)){
     
    
        const backNode = {
          id: `${items.length+4+categories.length}`,
          type: 'navBut',
          data: { label: <Link href={`/${slug}`} key={`tri-back`} onClick={()=>moveView(-140,60)}><div className="navBut backBut w-full h-full" ><div style={{animationDelay:`${100*items.length}ms`}}>{`${items[sec].articles.length?"":"0 ENTRIES "}`}→</div> </div></Link> },
          position: {  x: ((nodeX + nodeGap*2)*opt)*2, y: (categories[sec].articles.length*nodeGap)/2-(nodeGap*(-1+.5))},
        }
        getTri.push(backNode)

        const backEdge = {
          id: `${sec+4}-${items.length+4+categories.length}`,
          type: 'smoothstep',
          animated:true,
          source: `${sec+4}`,
          target: `${items.length+4+categories.length}`,
        }
        getTriEdge.push(backEdge)

      
    }

  setTitleEdges([])
  setTitleNodes([])
  setTriNodes(getTri)
  setTriEdges(getTriEdge)
  }
  
  

  
}

const changeTitle=(sec:number,cat:number, art:number,opt:number,slug:string, x:number, y:number)=>{
  console.log(titleEdges)
  moveView(x,y)
  setActive(false)
  const getTri:any = []
  const getTriEdge:any=[]
  const item = categories[cat].articles[art]
  const titleNode={
    id: `${art+4+categories.length+mobile}`,
    type: 'navBack',
    data: {label:<Link href={`/${slug}`}  onClick={()=>changeActive(cat,-320,100,true)}><div className="navBut w-full h-full" ><div >{`${categories[cat].title} →`}</div> </div></Link>},
    position: { x: ((nodeX + nodeGap*4)*opt)*2, y: 60},
  }

  const titleEdge = {
    id: `${cat+4}-${art+4+categories.length+mobile}-title`,
    type: 'smoothstep',
    animated:true,
    source: `${cat+4}`,
    target: `${art+4+categories.length+mobile}`,
  }

  getTri.push(titleNode)
  getTriEdge.push(titleEdge)
  setTitleEdges(getTriEdge)
  setTitleNodes(getTri)
}
// single
const changeTitleSingle=(items:any,sec:number,cat:number, art:number,opt:number,slug:string, x:number, y:number)=>{
  moveView(x,y)
  setActive(false)
  setTitleEdges([])
  setTitleNodes([])
  const getTri:any = []
  const getTriEdge:any=[]
  const titleNode={
    id: `${4+art}`,
    type: 'navBack',
    data: {label:<Link href={`/${slug}`}  onClick={()=>changeSec(cat)}><div className="navBut w-full h-full" ><div >{`${slug} →`}</div> </div></Link>},
    position: { x:((nodeX + nodeGap*2)*opt)*2, y:  80},
  }

  const titleEdge = {
    id: `${4+art}`,
    type: 'smoothstep',
    animated:true,
    source: `${cat}`,
    target: `${4+art}`,
  }
  getTri.push(titleNode)
  getTriEdge.push(titleEdge)
  setTitleEdges(getTriEdge)
  setTitleNodes(getTri)
}

useEffect(()=>{
 
  if(titleEdges.length){
    setNodes([...initialNodes,...resources,...triNodes,...titleNodes])
    setEdges([...secEdges,...triEdges,titleEdges[0]])}
    else{
      setNodes([...initialNodes,...resources,...triNodes])
      setEdges([...secEdges,...triEdges])
      console.log('no title')
    }

  
},[resources, secEdges, triEdges, triNodes, titleNodes, titleEdges])
     

    return(

      <div className={`fixed z-[50] w-[100vw] h-[100dvh] ${active?"":'pointer-events-none'}`}>
        {mobile!==null?(
            <ReactFlow nodeTypes={nodeTypes}  nodes={nodes} edges={edges} fitView zoomOnScroll={false} minZoom={2} maxZoom={2}>
            {/* <MiniMap maskColor={"rgb(135, 191, 239, 0.0)"} nodeColor={'rgb(135, 191, 239, 0)'} nodeStrokeColor={"rgb(135, 191, 239, 1.0)"} nodeStrokeWidth={3} nodeClassName={"miniMap"} zoomable pannable /> */}
          </ReactFlow>
        ):('')}
      
        </div>


      
    );
}

 
export default function NavBar({categories, projects,info}:{categories:any,projects:any,info:any}){
  const {winX, winY, mobile} = useResize()
  const page = usePathname()
  const params = useParams()


  return(
  <div className="fixed z-[50] w-[100vw] h-[100dvh]">
    {mobile!==null && winY && winX?(
        <ReactFlowProvider>
        <Flow categories={categories} page={page} params={params} projects={projects} info={info} winX={winX} winY={winY} mobile={mobile}/>
    </ReactFlowProvider>
    ):('')}
</div>
  )
}