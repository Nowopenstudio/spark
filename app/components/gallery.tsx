"use client"


import React, { useEffect, useRef, useState } from 'react';

import { PortableText } from 'next-sanity';
import { useScroll, useTransform,motion } from 'motion/react';
import useResize from './util/useResize';
import Image from 'next/image';


export default function Gallery({data}:any){
    const ref = useRef(null)
    const {winY,mobile} = useResize()
    const {scrollYProgress} = useScroll(
        {target:ref}
        
    );



    const x = useTransform(scrollYProgress, [0, 1],['0%',`-${data.length*(mobile?102:77)-100}%`])
  

    return(
      <div className="col-span-full" style={{height:mobile?"auto":`${data.length*100}vw`}}>
         <div  ref={ref} className={`w-[100vw] h-full`}>
                     <div  className="md:sticky top-[--lrg] w-[100vw] overflow-x-hidden" >
                         
                           {mobile?(
                              <div className="w-full">
                                  {data.map((image:any,m:number)=>{
                                           return( <div key={`gallery-${m}`} className="w-full  mb-[--sm] p-[--sm] relative gridBox ">
                                           <div className="w-full h-full">{image.image?( <Image alt="image" height={0}  width={0} sizes="100vw"  src={image.image}  className="w-full h-auto"/>):''}</div>
                                         </div>
             
                                           )
                                         })}
                              </div>
                           ):(
                              <motion.div className="w-full flex " style={{x}}>
                                  {data.map((image:any,m:number)=>{
                                           return( <div key={`gallery-${m}`} className="w-full md:w-3/4  mb-[--sm] p-[--sm] relative gridBox flex-shrink-0">
                                           <div className="w-full h-full">{image.image?( <Image alt="image" height={0}  width={0} sizes="100vw"  src={image.image}  className={`w-full ${m==0?"object-contain h-auto":"object-cover h-full"}`}/>):''}</div>
                                         </div>
             
                                           )
                                         })}
                              </motion.div>
                           )}   
                        
                     </div>
                 </div>
        
      </div>
        
    
    );
}