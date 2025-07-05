"use client"

import Link from "next/link"
import React,{useState, useEffect, useCallback} from 'react';
import { ReactFlow, MiniMap, useNodesState, useEdgesState,addEdge,useReactFlow,ReactFlowProvider, useViewport } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useResize from "./util/useResize";
import NavBut from "./nodes/NavBut"
import NavButAlt from "./nodes/NavButAlt";
import NavBack from "./nodes/NavBack";
import NavBackAlt from "./nodes/NavBackAlt";
import NavTitle from "./nodes/NavTitle";
import { useParams, usePathname } from "next/navigation";
import { filterIndex } from "./util/sanity";


const nodeTypes = { navBut: NavBut, navTitle: NavTitle, navBack:NavBack, navButAlt:NavButAlt, navBackAlt:NavBackAlt};
function Flow({donate,page, params, categories, projects,info,mobile,winX,winY}:{donate:any,params:any,page:any,categories:any,projects:any,info:any,mobile:any,winX:any,winY:any}){
 
   const initialNodes = [
      {
        id: '1',
        data: { label: <Link href={'/resources'} onClick={()=>changeSec(1)}><div className="navBut w-full h-full" style={{animationDelay:"0"}}><div>Resources</div></div></Link> },
        type: 'navBut',
        position: { x: 0, y: 80 },
      },
     
      {
        id: '2',
        type: 'navButAlt',
        // you can also pass a React component as a label
        data: { label: <Link href={'/projects'} onClick={()=>changeSec(2)}><div className="navBut w-full h-full" style={{animationDelay:"200ms"}}><div>Projects</div></div></Link> },
        position: { x: 0, y: 40 },
      },
      {
        id: '3',
        type: 'navBut',
        data:  { label: <Link href={'/about'} onClick={()=>changeSec(3)}><div className="navBut w-full h-full" style={{animationDelay:"300ms"}}><div>About</div></div></Link> },
        position: { x: 0, y: 0 },
      },
      {
        id: '4',
        type: 'navButAlt',
        // you can also pass a React component as a label
        data: { label: <Link href={'/donate'} onClick={()=>changeSec(4)}><div className="navBut w-full h-full" style={{animationDelay:"200ms"}}><div>Donate</div></div></Link> },
        position: { x: 0, y: 120 },
      },
      
    ];


    const initialEdges:any = [
   {},{}
    ];

    
  
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
   const root = 5;
   const zoom = 2;


   useEffect(()=>{
    
    if(page.includes('resources')){
      changeSec(1)
      // timer = window.setInterval(()=>moveView(-140,60), 500)
      // if(params.catSlug){
      //   const index = filterIndex(categories,"slug",params.catSlug)
      //   changeTri(categories,categories[index!],index!,-1,`resources/${params.catSlug}`,-320,60)
      //   timer = window.setInterval(()=>moveView(-320,60), 1000)
      //   if(params.slug){
      //     const art = filterIndex(categories[index!].articles,"slug",params.slug)
      //     changeTitle(1,sec,art!,-1,`resources/`,-500,(winY/2)/zoom,categories[index!])
      //    timer = window.setInterval(()=>moveView(-500,260), 1000)
      //   }
      // }

    }else if(page.includes('projects')){
      changeSec(2)
      timer = window.setInterval(()=>moveView(260,60), 500)
      if(params.slug){
        const pro = filterIndex(projects,"slug",params.slug)
        changeTitleSingle(projects,1,sec,pro!,1,'projects',600,200)
        timer = window.setInterval(()=>moveView(600,(winY/2)/zoom), 500)
      }
    }else if(page.includes('about')){
      changeSec(3)
      timer = window.setInterval(()=>moveView(-140,60), 500)
      const curr =  page.split('/')[2]
      if(curr){
        const pro = filterIndex(info,"slug",curr)
        changeTitleSingle(info,1,sec,pro!,-1,'about',-480,200)
        timer = window.setInterval(()=>moveView(-480,(winY/2)/zoom), 500)
      }
    }
  
  },[])


    const moveView=(x:number,y:number)=>{
  
      clearInterval(timer)
      setCenter(x, y, { zoom:zoom, duration: 1000 });
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
      setResources(newSingle(projects,nodeX,nodeGap,sec,"projects",1))
      setSecEdges(newEdges(2,projects))
      moveView(260,60)
     
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
      setResources(newSingle(info,nodeX,nodeGap,sec,"about",-1))
      setSecEdges(newEdges(3,info))
     
    }
    else if(sec==4){
      setEdges([])
      setResources([])
      setSecEdges([])
      setTriNodes([])
      setTriEdges([])
      setTitleEdges([])
      setTitleNodes([])
    changeTitleDonate(600,(winY/2)/zoom)
     
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
          id: `${i+root}`,
          type: 'navBut',
          data: { label: <Link href={`/${slug}/${item.slug}`} style={{color:item.color}} key={`cat-newNodes-${i}`} onClick={()=>changeTri(items,item,i,opt,`${slug}/${item.slug}`,-540,-145)}><div className="navBut w-full h-full" style={{backgroundColor:`rgb(20,20,20,.8)`}} ><div style={{animationDelay:`${100*i}ms`}}>{item.title}</div> </div></Link> },
          position: { x: ((nodeX + (nodeGap*2))*opt), y: (items.length*nodeGap)/2-(nodeGap*(i+.5)) },
        }
        getNodes.push(singleNode)
      })
      if(mobile){
        const backNode = {
          id: `${root+(items.length)}`,
          type: 'navBut',
          data: { label: <Link href={`/${slug}`} key={`cat-new-back`} onClick={()=>moveView(60,60)}><div className="navBut backBut w-full h-full" ><div style={{animationDelay:`${100*items.length}ms`}}>→</div> </div></Link> },
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
          id: `${source}-${(items.length)+root}`,
          type: 'smoothstep',
          animated:true,
          source: `${source}`,
          target: `${(items.length)+root}`,
        }
        getEdges.push(backEdge)
      }
     
      items.map((item:any,i:any)=>{
        const singleEdge = {
          id: `${source}-${i+root}`,
          type: 'smoothstep',
          animated:true,
          source: `${source}`,
          style:{stroke:item.color},
          target: `${i+root}`,
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
          id: `${i+root}`,
          type: `navBut${opt>0?'Alt':''}`,
          data: { label: <Link href={`/${slug}/${item.slug}`} key={`cat-newSingle-${i}`} onClick={()=>changeTitleSingle(items,1,sec,i,opt,slug,opt>0?600:-480,(winY/2)/zoom)}><div className="navBut w-full h-full" ><div style={{animationDelay:`${100*i}ms`}}>{item.title}</div> </div></Link> },
          position: { x: ((nodeX + (nodeGap*2))*opt), y: (items.length*nodeGap)/2-(nodeGap*(i+.5)) },
        }
        getNodes.push(singleNode)
      })
      if(mobile){
        const backNode = {
          id: `${items.length+root}`,
          type: `navBut${opt>0?'Alt':''}`,
          data: { label: <Link href={`/${slug}`} key={`single-back`} onClick={()=>moveView(60,60)}><div className="navBut backBut w-full h-full" ><div style={{animationDelay:`${100*items.length}ms`}}>{opt>0?'←':'→'}</div> </div></Link> },
          position: {  x: ((nodeX + (nodeGap*2))*opt), y: (items.length*nodeGap)/2-(nodeGap*(-1+.5))},
        }
        getNodes.push(backNode)
      }
      return getNodes
    }


  

const changeTri=(items:any,parent:any,sec:number, opt:number, slug:any, x:number, y:number)=>{
  setTriEdges([])
  setTitleEdges([])
  moveView(x,y)
  setActive(false)
  
  const getTri:any = []
  const getTriEdge:any=[]
  
  
     
    
        const backNode = {
          id: `${root+categories.length}`,
          type: 'navBut',
          data: { label: <Link href={`/${slug}`} key={`art-tri-back`} style={{color:parent.color}} onClick={()=>moveView(-140,60)} ><div className="navBut backBut w-full h-full" ><div style={{animationDelay:`${100*items.length}ms`}}>{`${items[sec].articles.length?`${categories[sec].title} `:"0 ENTRIES "}`}→</div> </div></Link> },
          position: {  x: ((nodeX + nodeGap*2)*opt)*3, y: -winY/4*1.5},
        }
        getTri.push(backNode)

        const backEdge = {
          id: `${sec+root}-${root+categories.length}`,
          type: 'smoothstep',
          animated:true,
          source: `${sec+root}`,
          style:{stroke:parent.color},
          target: `${root+categories.length}`,
        }
        getTriEdge.push(backEdge)

      
    

  setTitleEdges([])
  setTitleNodes([])
  setTriNodes(getTri)
  setTriEdges(getTriEdge)
  }
  
  

  


const changeTitle=(sec:number,cat:number, art:number,opt:number,slug:string, x:number, y:number,parent:any)=>{
  setActive(false)
  const getTri:any = []
  const getTriEdge:any=[]
  const item = categories[cat].articles[art]
  const titleNode={
    id: `${art+root+categories.length+mobile}`,
    type: 'navBack',
    data: {label:<Link href={`/${slug}`}  style={{color:parent.color}} onClick={()=>changeActive(cat,-320,60,true)}><div className="navBut w-full h-full" ><div >{`${categories[cat].title} →`}</div> </div></Link>},
    position: { x: ((nodeX + nodeGap*root)*opt)*2, y: 0},
  }

  const titleEdge = {
    id: `${cat+root}-${art+root+categories.length+mobile}-title`,
    type: 'smoothstep',
    animated:true,
    style:{stroke:parent.color},
    source: `${cat+root}`,
    target: `${art+root+categories.length+mobile}`,
  }

  getTri.push(titleNode)
  getTriEdge.push(titleEdge)
  setTitleEdges(getTriEdge)
  setTitleNodes(getTri)
  moveView(x,y)
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
    id: `${root+art}`,
    type: `navBack${opt>0?'Alt':''}`,
    data: {label:<Link href={`/${slug}`}  onClick={()=>changeSec(cat)}><div className="navBut w-full h-full" ><div >{opt>0?`← ${slug}`:`${slug} →`}</div> </div></Link>},
    position: { x:((nodeX + nodeGap*2)*opt)*2.7, y:  0},
  }

  const titleEdge = {
    id: `${root+art}`,
    type: 'smoothstep',
    animated:true,
    source: `${cat}`,
    target: `${root+art}`,
  }
  getTri.push(titleNode)
  getTriEdge.push(titleEdge)
  setTitleEdges(getTriEdge)
  setTitleNodes(getTri)
}


// single
const changeTitleDonate=(x:number, y:number)=>{
  moveView(x,y)
  setActive(false)
  setTitleEdges([])
  setTitleNodes([])
  const getTri:any = []
  const getTriEdge:any=[]
  const titleNode={
    id: `${root}`,
    type: `navBackAlt`,
    data: {label:<Link href={`/`}  onClick={()=>changeSec(0)}><div className="navBut w-full h-full" ><div >← Back</div> </div></Link>},
    position: { x:((nodeX + nodeGap*2))*2.7, y:  0},
  }

  const titleEdge = {
    id: `${root-1}-${root}`,
    type: 'smoothstep',
    animated:true,
    source: `${root-1}`,
    target: `${root}`,
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

      <div className={`fixed z-[50] w-[100vw] h-[100dvh] ${active?"pointer-evens-fill":'pointer-events-none'}`}>
        {mobile!==null?(
            <ReactFlow nodeTypes={nodeTypes}  nodes={nodes} edges={edges} fitView zoomOnScroll={false} minZoom={zoom} maxZoom={zoom}>
            <MiniMap maskColor={"rgb(135, 191, 239, 0.0)"} nodeColor={'rgb(0, 0, 0, .2)'} nodeStrokeColor={"rgb(0, 0, 0, 0)"} nodeStrokeWidth={3} nodeClassName={"miniMap"} zoomable pannable />
          </ReactFlow>
        ):('')}
      
        </div>


      
    );
}

 
export default function NavBar({categories, projects,info,donate}:{donate:any,categories:any,projects:any,info:any}){
  const {winX, winY, mobile} = useResize()
  const page = usePathname()
  const params = useParams()


  return(
 <React.Fragment>
    {mobile!==null && winY && winX?(
        <ReactFlowProvider>
        <Flow categories={categories} donate={donate} page={page} params={params} projects={projects} info={info} winX={winX} winY={winY} mobile={mobile}/>
        </ReactFlowProvider>
    ):('')}
</React.Fragment>
  )
}