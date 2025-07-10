'use client'

import { animate, useMotionValue, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import Image from "next/image";
import { useEffect} from "react";
import { Reveal } from "./util/reveal";


export default function Scroller({text, time}:any) {
    const [ref, {width}] = useMeasure();
const xTranslation = useMotionValue(0)
useEffect(()=>{
    const finalPos = -width / 2 ;
  
  
    const controls = animate(xTranslation, [0, finalPos],{
      ease:'linear', duration:time, repeat:Infinity, repeatType:'loop', repeatDelay: 0
    })
  
    return controls.stop;
  }, [xTranslation, width])
  
  return (
   
    
      
        <div className="w-full relative h-[180px] md:h-[350px] overflow-x-hidden">
          <motion.div  className="absolute flex left-0 top-0 items-center " ref={ref} style={{x:xTranslation}}>
              
             <div className=" w-auto text-center uppercase px-[--med] whitespace-nowrap "><h1 className="title">{text}</h1></div>
               <div className=" w-auto text-center uppercase px-[--med] whitespace-nowrap"><h1 className="title">{text}</h1></div>
                 <div className=" w-auto text-center uppercase px-[--med] whitespace-nowrap"><h1 className="title">{text}</h1></div>
                   <div className=" w-auto text-center uppercase px-[--med] whitespace-nowrap"><h1 className="title">{text}</h1></div>
                     <div className=" w-auto text-center uppercase px-[--med] whitespace-nowrap"><h1 className="title">{text}</h1></div>
                       
             
            
                   
               
             
          
           </motion.div>
      
        </div>
  


);
}
